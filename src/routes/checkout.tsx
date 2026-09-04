import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Lock } from "lucide-react";
import { Payment, initMercadoPago } from "@mercadopago/sdk-react";
import { useEffect, useRef, useState, type ComponentProps, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/hooks/use-cart";
import {
  beginMercadoPagoCheckout,
  prepareMercadoPagoBricksCheckout,
  submitMercadoPagoBrickPayment,
} from "@/lib/checkout";
import { formatPrice } from "@/lib/format";
import { routeMeta } from "@/lib/seo";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      ...routeMeta(
        "Checkout",
        "Confirma tus datos y continúa al entorno de prueba de Mercado Pago.",
      ),
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: CheckoutPage,
});

const FIELDS = [
  { id: "nombre", label: "Nombre", autoComplete: "given-name" },
  { id: "apellidos", label: "Apellidos", autoComplete: "family-name" },
  { id: "email", label: "Email", type: "email", autoComplete: "email" },
  { id: "telefono", label: "Teléfono", type: "tel", autoComplete: "tel" },
];

function Field({
  field,
}: {
  field: { id: string; label: string; type?: string; autoComplete: string };
}) {
  return (
    <div>
      <Label htmlFor={field.id}>{field.label}</Label>
      <Input
        id={field.id}
        name={field.id}
        type={field.type ?? "text"}
        autoComplete={field.autoComplete}
        maxLength={field.id === "email" ? 254 : field.id === "apellidos" ? 140 : 100}
        minLength={field.id === "telefono" ? 8 : 1}
        pattern={field.id === "telefono" ? "[0-9+() .-]+" : undefined}
        required
        className="mt-2 bg-card"
      />
    </div>
  );
}

function getRequiredString(formData: FormData, name: string): string {
  const value = formData.get(name);
  return typeof value === "string" ? value : "";
}

type PaymentBrickSubmitData = Parameters<ComponentProps<typeof Payment>["onSubmit"]>[0];

function CheckoutPage() {
  const { items, subtotal } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [preparedCheckout, setPreparedCheckout] = useState<{
    folio: string;
    amount: number;
    publicKey: string;
  } | null>(null);
  const [isBrickInitialized, setIsBrickInitialized] = useState(false);
  const [brickUnavailable, setBrickUnavailable] = useState(false);
  const checkoutRequestId = useRef<string | null>(null);
  const submissionLock = useRef(false);
  const checkoutFormRef = useRef<HTMLFormElement | null>(null);
  const hasLegacyItems = items.some((item) => !item.config.variantCode);

  useEffect(() => {
    if (!preparedCheckout?.publicKey) {
      setIsBrickInitialized(false);
      return;
    }

    try {
      initMercadoPago(preparedCheckout.publicKey, { locale: "es-MX" });
      setIsBrickInitialized(true);
    } catch {
      setIsBrickInitialized(false);
      setBrickUnavailable(true);
      setErrorMessage(
        "No pudimos inicializar el formulario de pago. Puedes usar Mercado Pago como alternativa.",
      );
    }
  }, [preparedCheckout?.publicKey]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submissionLock.current || !items.length) return;

    if (hasLegacyItems) {
      setErrorMessage(
        "Tu carrito contiene una configuración anterior. Elimina esos servicios y agrégalos nuevamente para continuar.",
      );
      return;
    }

    submissionLock.current = true;
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      checkoutRequestId.current ??= window.crypto.randomUUID();
      const formData = new FormData(event.currentTarget);
      const result = await prepareMercadoPagoBricksCheckout({
        data: {
          checkoutRequestId: checkoutRequestId.current,
          customer: {
            firstName: getRequiredString(formData, "nombre"),
            lastName: getRequiredString(formData, "apellidos"),
            email: getRequiredString(formData, "email"),
            phone: getRequiredString(formData, "telefono"),
          },
          items: items.map((item) => ({
            productSlug: item.productSlug,
            variantCode: item.config.variantCode ?? null,
            quantity: item.quantity,
          })),
        },
      });
      setPreparedCheckout(result);
      setIsBrickInitialized(false);
      setBrickUnavailable(false);
      setIsSubmitting(false);
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "No pudimos iniciar el pago. Inténtalo nuevamente.",
      );
      submissionLock.current = false;
      setIsSubmitting(false);
    }
  }

  async function handleBrickSubmit(data: PaymentBrickSubmitData) {
    if (!preparedCheckout || submissionLock.current) return;
    submissionLock.current = true;
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const brickFormData = data.formData as {
        payment_method_id: string;
        token?: string;
        installments?: number;
        issuer_id?: string | number;
      };
      const result = await submitMercadoPagoBrickPayment({
        data: {
          folio: preparedCheckout.folio,
          paymentType: data.paymentType,
          selectedPaymentMethod: data.selectedPaymentMethod,
          formData: {
            payment_method_id: brickFormData.payment_method_id,
            ...(brickFormData.token ? { token: brickFormData.token } : {}),
            ...(brickFormData.installments ? { installments: brickFormData.installments } : {}),
            ...(brickFormData.issuer_id !== undefined
              ? { issuer_id: brickFormData.issuer_id }
              : {}),
          },
        },
      });
      window.location.assign(`/pago/pendiente?folio=${encodeURIComponent(preparedCheckout.folio)}`);
      return result;
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "No pudimos procesar el pago. Inténtalo nuevamente.",
      );
      submissionLock.current = false;
      setIsSubmitting(false);
    }
    return undefined;
  }

  async function handleCheckoutProFallback() {
    const form = checkoutFormRef.current;
    if (!form || !form.reportValidity() || submissionLock.current || !items.length) return;

    submissionLock.current = true;
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const formData = new FormData(form);
      const result = await beginMercadoPagoCheckout({
        data: {
          checkoutRequestId: checkoutRequestId.current ?? window.crypto.randomUUID(),
          customer: {
            firstName: getRequiredString(formData, "nombre"),
            lastName: getRequiredString(formData, "apellidos"),
            email: getRequiredString(formData, "email"),
            phone: getRequiredString(formData, "telefono"),
          },
          items: items.map((item) => ({
            productSlug: item.productSlug,
            variantCode: item.config.variantCode ?? null,
            quantity: item.quantity,
          })),
        },
      });
      window.location.assign(result.initPoint);
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "No pudimos iniciar Mercado Pago. Inténtalo nuevamente.",
      );
      submissionLock.current = false;
      setIsSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8 lg:py-20">
      <Link
        to="/carrito"
        className="inline-flex min-h-11 items-center gap-2 text-sm text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden /> Volver al carrito
      </Link>
      <p className="eyebrow mt-6">Pago seguro · entorno de prueba</p>
      <h1 className="display mt-3 text-4xl sm:text-5xl">Finaliza tu solicitud</h1>
      <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_380px] lg:items-start">
        <form
          ref={checkoutFormRef}
          onSubmit={handleSubmit}
          onChange={() => {
            checkoutRequestId.current = null;
          }}
          className="space-y-10"
        >
          <fieldset disabled={isSubmitting}>
            <legend className="font-serif text-2xl">Datos de contacto</legend>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Los usaremos para identificar tu solicitud y coordinar la recepción del material. No
              capturamos datos de tarjeta en Mikuva.
            </p>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              {FIELDS.map((field) => (
                <Field key={field.id} field={field} />
              ))}
            </div>
          </fieldset>

          {errorMessage && (
            <p
              role="alert"
              className="border-l-2 border-destructive py-2 pl-4 text-sm leading-relaxed text-destructive"
            >
              {errorMessage}
            </p>
          )}

          {hasLegacyItems && !errorMessage && (
            <p
              role="status"
              className="border-l-2 border-primary py-2 pl-4 text-sm leading-relaxed"
            >
              Este carrito fue creado antes de habilitar pagos. Elimina sus servicios y agrégalos
              nuevamente para asociarlos con variantes verificables de MySQL.
            </p>
          )}

          {!preparedCheckout ? (
            <div>
              <Button
                type="submit"
                size="lg"
                className="min-h-11 w-full rounded-full"
                disabled={isSubmitting || !items.length || hasLegacyItems}
              >
                <Lock aria-hidden />
                {isSubmitting ? "Preparando pago…" : "Continuar al pago"}
              </Button>
              <p className="mt-3 text-center text-xs leading-relaxed text-muted-foreground">
                Tus datos de tarjeta se capturan directamente en Mercado Pago. Mikuva no almacena
                números de tarjeta ni códigos de seguridad.
              </p>
              <Button
                type="button"
                variant="outline"
                className="mt-3 min-h-11 w-full rounded-full"
                disabled={isSubmitting || !items.length || hasLegacyItems}
                onClick={handleCheckoutProFallback}
              >
                Pagar con Mercado Pago
              </Button>
            </div>
          ) : (
            <div className="border-t border-border pt-8">
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <p className="eyebrow">Pago</p>
                  <h2 className="mt-2 font-serif text-2xl">Elige cómo pagar</h2>
                </div>
                <span className="text-sm font-semibold">
                  {formatPrice(preparedCheckout.amount * 100)}
                </span>
              </div>
              {isBrickInitialized ? (
                <Payment
                  initialization={{ amount: preparedCheckout.amount }}
                  customization={{
                    paymentMethods: {
                      creditCard: "all",
                      types: {
                        included: [
                          "creditCard",
                          "debitCard",
                          "prepaidCard",
                          "ticket",
                          "wallet_purchase",
                        ],
                      },
                    },
                  }}
                  locale="es-MX"
                  onSubmit={handleBrickSubmit}
                  onError={() => {
                    setBrickUnavailable(true);
                    setErrorMessage(
                      "No pudimos cargar el formulario de pago. Puedes usar Mercado Pago como alternativa.",
                    );
                  }}
                />
              ) : (
                <p role="status" className="text-sm text-muted-foreground">
                  Cargando opciones de pago…
                </p>
              )}
              {brickUnavailable && (
                <Button
                  type="button"
                  variant="outline"
                  className="mt-4 min-h-11 w-full rounded-full"
                  disabled={isSubmitting}
                  onClick={handleCheckoutProFallback}
                >
                  Pagar con Mercado Pago
                </Button>
              )}
            </div>
          )}
        </form>

        <aside className="rounded-xl border border-border bg-card p-6 lg:sticky lg:top-28">
          <h2 className="font-serif text-2xl">Resumen del pedido</h2>
          {items.length ? (
            <div className="mt-5 space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between gap-4 border-b border-border pb-4 text-sm"
                >
                  <div>
                    <p className="font-medium">
                      {item.name} × {item.quantity}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">{item.config.summary}</p>
                  </div>
                  <strong>{formatPrice(item.unitPrice * item.quantity)}</strong>
                </div>
              ))}
              <div className="flex justify-between pt-2 text-lg">
                <span>Total estimado</span>
                <strong>{formatPrice(subtotal)}</strong>
              </div>
              <p className="text-xs leading-relaxed text-muted-foreground">
                El servidor verificará productos, variantes y precios vigentes en MySQL antes de
                crear el pago.
              </p>
            </div>
          ) : (
            <p className="mt-5 text-sm text-muted-foreground">
              Tu carrito está vacío.{" "}
              <Link to="/tienda" className="text-primary underline">
                Explorar servicios
              </Link>
            </p>
          )}
        </aside>
      </div>
    </div>
  );
}
