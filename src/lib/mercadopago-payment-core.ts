import type { MercadoPagoBrickPayment } from "./checkout-input";

export type MercadoPagoBrickPaymentRequest = {
  transaction_amount: number;
  payment_method_id: string;
  payer: { email: string; first_name: string; last_name: string };
  external_reference: string;
  description: string;
  token?: string;
  installments?: number;
  issuer_id?: number;
};

export function buildMercadoPagoBrickPaymentRequest(input: {
  payment: MercadoPagoBrickPayment;
  orderTotalCentavos: number;
  orderFolio: string;
  orderDescription: string;
  payerEmail: string;
  payerFirstName: string;
  payerLastName: string;
}): MercadoPagoBrickPaymentRequest {
  const {
    payment,
    orderTotalCentavos,
    orderFolio,
    orderDescription,
    payerEmail,
    payerFirstName,
    payerLastName,
  } = input;
  const { formData } = payment;
  const isCardPayment = ["creditCard", "debitCard", "prepaidCard"].includes(payment.paymentType);
  const isSupportedPaymentMethod = ["creditCard", "debitCard", "prepaidCard", "ticket"].includes(
    payment.paymentType,
  );

  if (!isSupportedPaymentMethod) throw new Error("This payment method requires the Orders API.");

  if (isCardPayment && !formData.token) {
    throw new Error("Card payment token is required.");
  }

  const issuerId = formData.issuer_id === undefined ? undefined : Number(formData.issuer_id);
  if (issuerId !== undefined && !Number.isSafeInteger(issuerId)) {
    throw new Error("Issuer ID is invalid.");
  }

  return {
    transaction_amount: orderTotalCentavos / 100,
    payment_method_id: formData.payment_method_id,
    payer: { email: payerEmail, first_name: payerFirstName, last_name: payerLastName },
    external_reference: orderFolio,
    description: orderDescription,
    ...(formData.token ? { token: formData.token } : {}),
    ...(formData.installments ? { installments: formData.installments } : {}),
    ...(issuerId !== undefined ? { issuer_id: issuerId } : {}),
  };
}
