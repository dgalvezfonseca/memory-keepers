# Architecture audit

Fecha de corte: 2026-09-02. Alcance: repositorio y base MariaDB local autorizada; no se inspeccionó
ni modificó el servidor remoto.

## Frontend

- React 19 con TanStack Router/Start y rutas basadas en archivos.
- Vite 8, Tailwind CSS v4, shadcn/ui y Radix UI.
- Rutas públicas: inicio, servicios, tienda, producto, carrito, checkout, cómo funciona, FAQ,
  nosotros, contacto, seguimiento demostrativo y retornos de Mercado Pago.
- El catálogo visual está en `src/data/catalog.ts`; durante checkout los identificadores se resuelven
  contra el catálogo activo de MySQL y los precios del navegador se ignoran.
- El carrito se guarda en `localStorage` bajo `mikuva.cart.v1`. Contiene selección y precios de
  presentación, no credenciales ni datos personales. La carga local ahora valida forma, límites y
  cantidades antes de usarla.

## Backend

- TanStack Start server functions para iniciar checkout y enviar contacto.
- Entry server personalizado en `src/server.ts` para errores genéricos y headers de seguridad.
- Build Nitro `node-server`, pensado para escuchar en `127.0.0.1` detrás de Apache.
- No hay autenticación, cuentas, panel administrativo ni autorización de recursos en esta versión.

## Database

- Drizzle ORM sobre `mysql2` y MySQL/MariaDB.
- Pool singleton por proceso: 10 conexiones, cola limitada, timeout de conexión, keepalive e idle
  timeout. El proceso de producción rechaza un `DATABASE_URL` cuyo usuario sea `root`.
- Tablas: `categories`, `products`, `product_variants`, `customers`, `orders`, `order_items`,
  `payments`, `payment_events`, `order_status_history` y `order_folio_counters`.
- Importes almacenados como enteros en centavos. Claves foráneas de históricos usan `RESTRICT`.
- Folios concurrentes mediante contador anual dentro de transacción y unicidad en `orders.folio`.
- Auditoría local: 20 pedidos, 18 pagos, 0 totales inconsistentes, 0 partidas huérfanas y 0 pares
  pedido/proveedor duplicados. Esto no representa ni valida la futura base de producción.

## APIs y formularios

- `GET /api/health`: salud de aplicación y conectividad simple a DB, cacheada 5 segundos, sin datos
  internos.
- `POST /api/webhooks/mercadopago`: recepción firmada de pagos.
- Server function `beginMercadoPagoCheckout`: crea/reutiliza pedido y preferencia.
- Server function `submitContactForm`: valida, limita y reenvía a Web3Forms.
- Detalle por endpoint en `API_INVENTORY.md`.

## Payments

- Mercado Pago Checkout Pro mediante SDK oficial, sólo entorno TEST en el código auditado.
- Preferencia creada server-side desde snapshots y totales de MySQL.
- Idempotencia de checkout por UUID único, folio y clave de idempotencia de Mercado Pago.
- El webhook valida firma, ventana de cinco minutos, pago autoritativo, folio, centavos, MXN,
  `live_mode`, collector y preferencia local; la tabla `payment_events` evita reprocesar el evento.
- Las páginas de retorno son informativas y no escriben en DB.

## Servicios externos

- Mercado Pago: creación/consulta de preferencias y pagos.
- Web3Forms: formulario de contacto desde servidor.
- Chatwoot: token público del widget; carga condicional con consentimiento funcional.
- Google Maps: iframe condicional con consentimiento funcional.
- Matomo: sitio 3; carga y pageviews sólo con consentimiento analítico, sin query strings.
- Google Fonts: Fraunces y Manrope.
- Lovable: integración de editor/build; no es autenticación ni backend de producción.

## Cookies y privacidad

- CookieConsent v3 gestiona categorías necesaria, funcional y analítica.
- Chatwoot, Maps y Matomo no cargan antes del consentimiento correspondiente.
- Inventario confirmado en `docs/cookie-services.md`.
- El checkout guarda nombre, apellidos, email y teléfono; no recibe datos de tarjeta.

## No aplicable / inexistente

- Authentication: **NOT APPLICABLE**.
- Admin: **NOT APPLICABLE**.
- Email/SMTP: **NOT APPLICABLE**.
- Uploads y almacenamiento de archivos: **NOT APPLICABLE**.
- Docker: no existe configuración Docker.
- CMS, WordPress, Supabase, PostgreSQL, Stripe: no forman parte del repositorio real.

## Requisitos de servidor

- Linux soportado, Node.js >= 22.12 o Bun compatible, Apache con módulos proxy/headers/SSL,
  MySQL/MariaDB local, systemd, certificado TLS y firewall.
- Sólo Apache expone 80/443. Aplicación en `127.0.0.1:3000`; MariaDB no expone 3306 a Internet.
- Build reproducible desde `bun.lock` en Linux. Migraciones manuales, separadas del arranque.
