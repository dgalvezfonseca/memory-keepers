import assert from "node:assert/strict";
import { describe, test } from "node:test";

import { mercadoPagoBrickPaymentSchema } from "./checkout-input";
import { buildMercadoPagoBrickPaymentRequest } from "./mercadopago-payment-core";

const basePayment = {
  folio: "MK-2026-00001",
  paymentType: "creditCard",
  selectedPaymentMethod: "visa",
  formData: {
    token: "card-token",
    payment_method_id: "visa",
    installments: 1,
  },
};

describe("Mercado Pago Payment Brick request", () => {
  test("uses the server order total instead of the Brick amount", () => {
    const payment = mercadoPagoBrickPaymentSchema.parse(basePayment);
    const request = buildMercadoPagoBrickPaymentRequest({
      payment,
      orderTotalCentavos: 250000,
      orderFolio: "MK-2026-00001",
      orderDescription: "Digitalización de fotografías",
      payerEmail: "buyer@example.test",
      payerFirstName: "Buyer",
      payerLastName: "Example",
    });

    assert.equal(request.transaction_amount, 2500);
    assert.equal(request.payer.email, "buyer@example.test");
    assert.equal(request.external_reference, "MK-2026-00001");
  });

  test("requires a token for card payments", () => {
    const payment = mercadoPagoBrickPaymentSchema.parse({
      ...basePayment,
      formData: { payment_method_id: "visa", installments: 1 },
    });

    assert.throws(() =>
      buildMercadoPagoBrickPaymentRequest({
        payment,
        orderTotalCentavos: 250000,
        orderFolio: "MK-2026-00001",
        orderDescription: "Digitalización de fotografías",
        payerEmail: "buyer@example.test",
        payerFirstName: "Buyer",
        payerLastName: "Example",
      }),
    );
  });

  test("supports non-card payment data without storing card fields", () => {
    const payment = mercadoPagoBrickPaymentSchema.parse({
      ...basePayment,
      paymentType: "ticket",
      selectedPaymentMethod: "oxxo",
      formData: { payment_method_id: "oxxo" },
    });
    const request = buildMercadoPagoBrickPaymentRequest({
      payment,
      orderTotalCentavos: 250000,
      orderFolio: "MK-2026-00001",
      orderDescription: "Digitalización de fotografías",
      payerEmail: "buyer@example.test",
      payerFirstName: "Buyer",
      payerLastName: "Example",
    });

    assert.equal(request.payment_method_id, "oxxo");
    assert.equal("token" in request, false);
  });

  test("rejects fields outside the Payment Brick allowlist", () => {
    assert.throws(() =>
      mercadoPagoBrickPaymentSchema.parse({
        ...basePayment,
        formData: { ...basePayment.formData, transaction_amount: 0.01 },
      }),
    );
    assert.throws(() =>
      mercadoPagoBrickPaymentSchema.parse({
        ...basePayment,
        formData: { ...basePayment.formData, external_reference: "attacker-reference" },
      }),
    );
  });

  test("accepts the valid card fields required by the backend", () => {
    const payment = mercadoPagoBrickPaymentSchema.parse(basePayment);
    assert.equal(payment.formData.token, "card-token");
    assert.equal(payment.formData.payment_method_id, "visa");
    assert.equal(payment.formData.installments, 1);
  });

  test("rejects a malformed issuer id", () => {
    const payment = mercadoPagoBrickPaymentSchema.parse({
      ...basePayment,
      formData: { ...basePayment.formData, issuer_id: "not-a-number" },
    });

    assert.throws(() =>
      buildMercadoPagoBrickPaymentRequest({
        payment,
        orderTotalCentavos: 250000,
        orderFolio: "MK-2026-00001",
        orderDescription: "Digitalización de fotografías",
        payerEmail: "buyer@example.test",
        payerFirstName: "Buyer",
        payerLastName: "Example",
      }),
    );
  });

  test("does not route SPEI through the Payments API", () => {
    const payment = mercadoPagoBrickPaymentSchema.parse({
      ...basePayment,
      paymentType: "bankTransfer",
      selectedPaymentMethod: "clabe",
      formData: { payment_method_id: "clabe" },
    });

    assert.throws(
      () =>
        buildMercadoPagoBrickPaymentRequest({
          payment,
          orderTotalCentavos: 250000,
          orderFolio: "MK-2026-00001",
          orderDescription: "Digitalización de fotografías",
          payerEmail: "buyer@example.test",
          payerFirstName: "Buyer",
          payerLastName: "Example",
        }),
      /Orders API/,
    );
  });
});
