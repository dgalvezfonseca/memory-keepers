import assert from "node:assert/strict";
import { describe, test } from "node:test";

import { createOrderInputSchema } from "@/db/order-input";

import { checkoutIntentSchema } from "./checkout-input";
import { contactFormSchema } from "./contact-input";

const customer = {
  firstName: "Ana",
  lastName: "López",
  email: "ana@example.com",
  phone: "+52 55 1234 5678",
};

describe("untrusted input validation", () => {
  test("checkout rejects manipulated prices, totals and quantities", () => {
    const base = {
      checkoutRequestId: "7dcf84b8-99f0-4a43-bf47-b1fc44b91b1c",
      customer,
      items: [{ productSlug: "fotografias", variantCode: "foto:100", quantity: 1 }],
    };

    assert.equal(checkoutIntentSchema.safeParse(base).success, true);
    assert.equal(
      checkoutIntentSchema.safeParse({ ...base, total: 1, items: [{ ...base.items[0], price: 1 }] })
        .success,
      false,
    );

    for (const quantity of [0, -1, 1.5, Number.NaN, Number.POSITIVE_INFINITY, 10_001]) {
      assert.equal(
        checkoutIntentSchema.safeParse({ ...base, items: [{ ...base.items[0], quantity }] })
          .success,
        false,
      );
    }
  });

  test("internal order input rejects client-style price fields", () => {
    assert.equal(
      createOrderInputSchema.safeParse({
        customer,
        items: [{ productId: 1, variantId: 2, quantity: 1, unitPrice: 1 }],
      }).success,
      false,
    );
  });

  test("contact input is bounded and rejects unknown fields", () => {
    const valid = {
      name: "Ana López",
      email: "ana@example.com",
      phone: "+52 55 1234 5678",
      material: "Fotografías",
      message: "Quiero digitalizar un álbum familiar.",
      botcheck: false,
    };
    assert.equal(contactFormSchema.safeParse(valid).success, true);
    assert.equal(contactFormSchema.safeParse({ ...valid, admin: true }).success, false);
    assert.equal(
      contactFormSchema.safeParse({ ...valid, message: "x".repeat(2_001) }).success,
      false,
    );
    assert.equal(contactFormSchema.safeParse({ ...valid, phone: "<script>" }).success, false);
  });
});
