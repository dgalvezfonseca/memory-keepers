import "@tanstack/react-start/server-only";

import process from "node:process";

import { and, eq, isNotNull } from "drizzle-orm";
import { MercadoPagoConfig, Payment, Preference } from "mercadopago";

import { getDatabase } from "@/db/index.server";
import { getOrderByFolio, getOrderById } from "@/db/orders.server";
import { orders, payments } from "@/db/schema";
import { mercadoPagoBrickPaymentSchema, type MercadoPagoBrickPayment } from "@/lib/checkout-input";
import { buildMercadoPagoBrickPaymentRequest } from "@/lib/mercadopago-payment-core";
import { mapMercadoPagoStatus } from "@/lib/mercadopago-webhook-core";

let cachedToken: string | undefined;
let cachedClient: MercadoPagoConfig | undefined;
let cachedPreferenceClient: Preference | undefined;
let cachedPaymentClient: Payment | undefined;

function getMercadoPagoClient(): MercadoPagoConfig {
  const environment = process.env["MERCADOPAGO_ENV"];
  const accessToken = process.env["MERCADOPAGO_ACCESS_TOKEN"]?.trim();

  if (environment !== "test") {
    throw new Error("MERCADOPAGO_ENV must be set to test during MP-3.");
  }
  if (!accessToken) throw new Error("MERCADOPAGO_ACCESS_TOKEN is required.");

  if (!cachedClient || cachedToken !== accessToken) {
    cachedClient = new MercadoPagoConfig({ accessToken, options: { timeout: 8_000 } });
    cachedPreferenceClient = undefined;
    cachedPaymentClient = undefined;
    cachedToken = accessToken;
  }

  return cachedClient;
}

function getPreferenceClient(): Preference {
  cachedPreferenceClient ??= new Preference(getMercadoPagoClient());
  return cachedPreferenceClient;
}

function getPaymentClient(): Payment {
  cachedPaymentClient ??= new Payment(getMercadoPagoClient());
  return cachedPaymentClient;
}

export function getMercadoPagoPublicKey(): string {
  const publicKey = process.env["MERCADOPAGO_PUBLIC_KEY"]?.trim();
  if (!publicKey) throw new Error("MERCADOPAGO_PUBLIC_KEY is required.");
  return publicKey;
}

export async function getMercadoPagoPayment(paymentId: string) {
  if (!/^\d+$/.test(paymentId)) throw new Error("Mercado Pago payment ID is invalid.");
  return getPaymentClient().get({ id: paymentId });
}

export async function createMercadoPagoBrickPayment(input: MercadoPagoBrickPayment) {
  const parsed = mercadoPagoBrickPaymentSchema.parse(input);
  const order = await getOrderByFolio(parsed.folio);
  if (!order) throw new Error("Order was not found.");
  if (order.currency !== "MXN") throw new Error("Payment Brick only supports MXN orders.");

  const existingPayment = order.payments.find(
    (payment) => payment.provider === "mercadopago" && payment.providerPaymentId,
  );
  if (existingPayment?.providerPaymentId) {
    return {
      paymentId: existingPayment.providerPaymentId,
      status: existingPayment.status,
      statusDetail: "already_created",
    };
  }

  const paymentBody: Parameters<Payment["create"]>[0]["body"] = buildMercadoPagoBrickPaymentRequest(
    {
      payment: parsed,
      orderTotalCentavos: order.total,
      orderFolio: order.folio,
      orderDescription: order.items.map((item) => item.productNameSnapshot).join(", "),
      payerEmail: order.customer.email,
      payerFirstName: order.customer.firstName,
      payerLastName: order.customer.lastName,
    },
  );

  const payment = await getPaymentClient().create({
    body: paymentBody,
    requestOptions: { idempotencyKey: `mikuva-payment-${order.folio}` },
  });
  if (!payment.id) throw new Error("Mercado Pago did not return a payment ID.");

  const db = getDatabase();
  const localStatus = mapMercadoPagoStatus(payment.status ?? "") ?? "pending";
  await db
    .insert(payments)
    .values({
      orderId: order.id,
      provider: "mercadopago",
      providerPreferenceId: null,
      providerPaymentId: String(payment.id),
      status: localStatus,
      amount: order.total,
      currency: order.currency,
      externalReference: order.folio,
    })
    .onDuplicateKeyUpdate({
      set: { providerPaymentId: String(payment.id), status: localStatus, updatedAt: new Date() },
    });

  await db.update(orders).set({ paymentStatus: localStatus }).where(eq(orders.id, order.id));

  return {
    paymentId: String(payment.id),
    status: payment.status ?? "pending",
    statusDetail: payment.status_detail ?? null,
  };
}

function getAppOrigin(): string {
  const rawAppUrl = process.env["APP_URL"]?.trim();
  if (!rawAppUrl) throw new Error("APP_URL is required.");

  const appUrl = new URL(rawAppUrl);
  if (!(["http:", "https:"] as const).includes(appUrl.protocol as "http:" | "https:")) {
    throw new Error("APP_URL must use http or https.");
  }
  if (appUrl.username || appUrl.password) throw new Error("APP_URL cannot contain credentials.");

  return appUrl.origin;
}

function supportsAutomaticReturn(appOrigin: string): boolean {
  const url = new URL(appOrigin);
  const hostname = url.hostname.toLowerCase();
  return (
    url.protocol === "https:" &&
    hostname !== "localhost" &&
    hostname !== "127.0.0.1" &&
    hostname !== "::1"
  );
}

function getCheckoutUrl(response: { sandbox_init_point?: string; init_point?: string }): string {
  const value = response.sandbox_init_point ?? response.init_point;
  if (!value) throw new Error("Mercado Pago did not return a Checkout Pro URL.");

  const url = new URL(value);
  const hostname = url.hostname.toLowerCase();
  const isMercadoPagoHost =
    hostname === "mercadopago.com" ||
    hostname.endsWith(".mercadopago.com") ||
    hostname === "mercadopago.com.mx" ||
    hostname.endsWith(".mercadopago.com.mx");
  if (url.protocol !== "https:" || !isMercadoPagoHost || url.username || url.password) {
    throw new Error("Mercado Pago returned an unexpected Checkout Pro URL.");
  }
  return url.toString();
}

function getErrorName(error: unknown): string {
  return error instanceof Error ? error.name : "UnknownError";
}

export async function createCheckoutPreference(orderId: number) {
  const order = await getOrderById(orderId);
  if (!order) throw new Error("Order was not found.");
  if (order.currency !== "MXN") throw new Error("Checkout Pro MP-2 only supports MXN orders.");

  const preferenceClient = getPreferenceClient();
  const db = getDatabase();
  const [existingPayment] = await db
    .select({ providerPreferenceId: payments.providerPreferenceId })
    .from(payments)
    .where(
      and(
        eq(payments.orderId, order.id),
        eq(payments.provider, "mercadopago"),
        isNotNull(payments.providerPreferenceId),
      ),
    )
    .limit(1);

  if (existingPayment?.providerPreferenceId) {
    try {
      const existingPreference = await preferenceClient.get({
        preferenceId: existingPayment.providerPreferenceId,
      });
      console.info("[mercadopago] preference reused", {
        folio: order.folio,
        preferenceId: existingPayment.providerPreferenceId,
      });
      return {
        preferenceId: existingPayment.providerPreferenceId,
        initPoint: getCheckoutUrl(existingPreference),
      };
    } catch (error) {
      console.error("[mercadopago] preference lookup failed", {
        folio: order.folio,
        error: getErrorName(error),
      });
      throw new Error("The existing Mercado Pago preference could not be loaded.");
    }
  }

  const itemTotal = order.items.reduce((sum, item) => sum + item.subtotal, 0);
  if (itemTotal !== order.subtotal || order.total !== order.subtotal) {
    throw new Error("The order total cannot be represented by its item snapshots.");
  }

  const appOrigin = getAppOrigin();
  const idempotencyKey = `mikuva-preference-${order.folio}`;

  try {
    const preference = await preferenceClient.create({
      body: {
        items: order.items.map((item) => ({
          id: String(item.id),
          title: [item.productNameSnapshot, item.variantNameSnapshot].filter(Boolean).join(" — "),
          currency_id: "MXN",
          quantity: item.quantity,
          unit_price: item.unitPrice / 100,
        })),
        external_reference: order.folio,
        back_urls: {
          success: `${appOrigin}/pago/exitoso`,
          pending: `${appOrigin}/pago/pendiente`,
          failure: `${appOrigin}/pago/error`,
        },
        ...(supportsAutomaticReturn(appOrigin) ? { auto_return: "approved" } : {}),
      },
      requestOptions: { idempotencyKey },
    });

    if (!preference.id) throw new Error("Mercado Pago did not return a preference ID.");
    const initPoint = getCheckoutUrl(preference);

    await db
      .insert(payments)
      .values({
        orderId: order.id,
        provider: "mercadopago",
        providerPreferenceId: preference.id,
        providerPaymentId: null,
        status: "pending",
        amount: order.total,
        currency: "MXN",
        externalReference: order.folio,
      })
      .onDuplicateKeyUpdate({
        set: {
          orderId: order.id,
          amount: order.total,
          currency: "MXN",
          externalReference: order.folio,
        },
      });

    console.info("[mercadopago] preference created", {
      folio: order.folio,
      preferenceId: preference.id,
    });

    return { preferenceId: preference.id, initPoint };
  } catch (error) {
    console.error("[mercadopago] preference creation failed", {
      folio: order.folio,
      error: getErrorName(error),
    });
    throw error;
  }
}
