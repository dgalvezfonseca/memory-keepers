# Threat model

## Activos

- Pedidos, folios, importes, historial y estados de pago.
- Nombre, email y teléfono de clientes/contactos.
- Access Token y secreto de webhook de Mercado Pago; credenciales de DB.
- Disponibilidad de checkout, webhook, formulario y base.
- Integridad del catálogo y precios.

## Fronteras de confianza

Navegador no confiable → TanStack Start → MariaDB / Mercado Pago / Web3Forms. Mercado Pago no se
considera confiable por el mero payload entrante: la firma y una consulta API autoritativa son
obligatorias. Apache será la única entrada pública al proceso interno.

## P0 Critical

Ninguno confirmado.

## P1 High — bloqueos antes de staging/producción

### P1-01 Rotación de credenciales TEST

- Evidencia: `.env.example` no trackeado contenía al inicio valores con formato real de Access Token
  TEST y secreto de webhook.
- Estado: archivo saneado; 0 coincidencias en bundle e historial disponible.
- Acción pendiente: rotar ambos valores en Mercado Pago, actualizar sólo el env de staging y volver
  a probar checkout + firma.

### P1-02 Privilegios y aislamiento de base en servidor

- Evidencia local: `mikuva_app` no es root, pero posee privilegios completos sobre la base local.
- Riesgo: impacto mayor si la app es comprometida.
- Acción pendiente: en staging/producción crear usuario runtime DML mínimo y usuario separado para
  migraciones; verificar que 3306 no sea público.

### P1-03 Controles operativos todavía no ejecutados

- No existe aún evidencia del Apache/TLS/firewall/systemd/backups/rollback del servidor real porque
  el alcance prohibió tocarlo.
- Acción: completar y evidenciar `SERVER_DEPLOY_CHECKLIST.md` antes de declarar staging listo.

### P1-04 Requisitos legales antes de producción

- Se capturan datos personales y existen cookies/servicios opcionales, pero no hay rutas finales de
  privacidad, cookies, términos, envíos o devoluciones.
- Acción: revisión jurídica y publicación manual. No inventar contenido.

## P2 Medium

- `bun audit` conserva una vulnerabilidad moderada de `esbuild@0.18.20`, transitiva de tooling de
  Drizzle y bloqueada por su rango. Exposición: servidor de desarrollo; nunca publicarlo.
- CSP requiere `'unsafe-inline'` para hidratación/estilos actuales. No usa `*`, bloquea objetos y
  framing; evaluar nonce cuando TanStack/Nitro lo soporte en este stack.
- Rate limiting en memoria no coordina múltiples procesos/hosts.
- No se pudo ejecutar navegador automatizado por fallo de inicialización de la herramienta; móvil,
  teclado, consentimiento y checkout visual requieren prueba manual antes de staging.
- No hay sitemap/canonical ni redirecciones SEO verificadas desde WordPress.
- Imágenes PNG históricas de 0.7-1.9 MB y chunk cliente principal ~445 kB sin gzip pueden afectar
  LCP en redes móviles.
- Web3Forms debe restringir el dominio y revisarse su cuota/antispam desde el panel del proveedor.
- El modelo conserva `charged_back`/mediación sin rebajar estados; contracargos y reembolsos
  parciales requieren política operativa antes de cobros reales.

## P3 Low

- Siete warnings de Fast Refresh en componentes/hooks; no afectan el build productivo.
- Componente shadcn de charts usa `dangerouslySetInnerHTML` con configuración interna y actualmente
  no recibe texto de usuario. Mantenerlo fuera de entradas no confiables.
- `/assets/` redirige a `/assets` y termina sin directory listing; Apache debe mantener `Options
-Indexes`.

## Controles confirmados

- Precios/autorización del catálogo server-side; dinero entero; queries ORM parametrizadas.
- Transacción de orden y snapshots históricos; folio único concurrente.
- Checkout con UUID, botón bloqueado y clave idempotente de proveedor.
- Webhook firmado, acotado, autoritativo, idempotente y con estados conservadores.
- No existe API pública de pedidos, auth/admin, upload, SSRF por URL de usuario ni SQL concatenado.
- Headers de seguridad, errores genéricos, noindex de checkout/retornos y query strings excluidos de
  Matomo.

## Retest requerido

Después de cada corrección P1: tests locales, build Linux, staging black-box, pago TEST completo,
webhook duplicado, headers/TLS, DB caída, Mercado Pago caído, doble clic y móvil/teclado.
