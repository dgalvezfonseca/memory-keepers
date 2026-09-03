# API inventory

Los paths de server functions se generan como `/_serverFn/<identificador opaco>` y pueden cambiar
entre builds. El identificador no es autenticación.

| Método | Path lógico | Acceso | Auth / origen | Rate limit | Validación | DB | Secreto / externo |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| POST | server fn `beginMercadoPagoCheckout` | Público | CSRF same-origin de TanStack | 10/5 min/IP/proceso | Zod strict; UUID; 1-100 items; cantidad 1-10000; slugs/códigos acotados; contacto | Lee catálogo; transacción pedido/items/historial; payment | Access Token; Mercado Pago |
| POST | server fn `submitContactForm` | Público | CSRF same-origin de TanStack | 5/10 min/IP/proceso + honeypot | Zod strict; longitudes, email, teléfono, enum material | No | Web3Forms key; Web3Forms con timeout 8 s |
| POST | `/api/webhooks/mercadopago` | Público servidor-a-servidor | Firma HMAC oficial, request ID, data ID y tolerancia 300 s | Firma antes de API/DB; límites Apache pendientes | Máx. 64 KiB; JSON/Zod; IDs acotados | Transacción payment/order/event; locks | Webhook secret y Access Token; Mercado Pago GET payment |
| ANY salvo POST | `/api/webhooks/mercadopago` | Público | N/A | N/A | N/A | No | Responde 405 y `Allow: POST` |
| GET | `/api/health` | Público monitor | Ninguna | Query cacheada 5 s; límite Apache pendiente | Sin entrada | `SELECT 1` | No expone versión, host ni credenciales |
| ANY salvo GET | `/api/health` | Público | N/A | N/A | N/A | No | Responde 405 y `Allow: GET` |

## Controles transversales

- Server functions: middleware CSRF instalado explícitamente en `src/start.ts`.
- APIs y server functions: `Cache-Control: no-store` desde el entry server.
- No se emite `Access-Control-Allow-Origin`; CORS no habilita lectura cross-origin.
- Errores 5xx se presentan con HTML genérico; detalles quedan en logs del proceso.
- No hay endpoints de login, admin, upload, email, búsqueda ni consulta pública de pedidos.
- `getOrderById` y `getOrderByFolio` son funciones server-only internas; no están expuestas por API.

## Casos de abuso comprobados

- Precio/total extra enviado al checkout: rechazado por esquema strict.
- Cantidad 0, negativa, decimal, NaN, Infinity o >10000: rechazada.
- Webhook sin firma o firma falsa: 401 antes de API/DB.
- Payload webhook >64 KiB: 413 antes de API/DB.
- `status=approved` o `payment_id` en `/pago/exitoso`: sólo render informativo, sin escritura.
- Métodos API incorrectos: 405.

## Límites conscientes

- El rate limiter es por memoria/proceso y adecuado al despliegue inicial de una instancia. Si se
  escala a varias instancias, moverlo a un almacén compartido sin retirar la validación de app.
- No aplicar rate limiting agresivo al webhook firmado que impida reintentos legítimos de Mercado
  Pago; complementar en Apache por tamaño/concurrencia y observar logs.
