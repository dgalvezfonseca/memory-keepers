# Pre-production audit

Fecha: 2026-09-02. Alcance: código local, build de producción local y MariaDB local autorizada.
Excluido: servidor remoto, Virtualmin, Apache remoto, firewall, DB productiva y credenciales/cobros
reales.

## Veredicto

**NOT READY FOR SERVER STAGING**

Motivo: 0 P0, pero permanecen P1 manuales: rotación de credenciales TEST, usuario DB mínimo en el
servidor, controles operativos del host aún no ejecutados y documentación legal antes de publicar.
No se afirma que el sistema sea imposible de vulnerar.

## Matriz requerida

| Área             | Resultado          | Evidencia / condición                                                                                              |
| ---------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------ |
| Architecture     | PASS               | Stack real preservado; build cambiado de Cloudflare a Nitro `node-server`.                                         |
| TypeScript       | PASS               | `bun run typecheck`, exit 0.                                                                                       |
| Lint             | PASS               | Exit 0; 7 warnings Fast Refresh preexistentes/no productivos.                                                      |
| Tests            | PASS               | 18 pass, 0 fail.                                                                                                   |
| Build            | PASS               | Vite/Nitro production build, preset `node-server`.                                                                 |
| Input Validation | PASS               | Zod strict servidor para checkout/contacto; pruebas de total/precio/cantidades manipuladas.                        |
| Database         | FAIL               | Integridad local correcta, pero el usuario local tiene privilegios completos; staging requiere runtime DML mínimo. |
| Payments         | PASS (TEST)        | Preferencia server-side, precios DB, centavos, UUID e idempotency key; producción deliberadamente deshabilitada.   |
| Webhooks         | PASS (TEST/local)  | Firma, 300 s, 64 KiB, lookup autoritativo, validaciones, transacción e idempotencia.                               |
| Secrets          | FAIL               | Sin leaks en Git/bundle, pero deben rotarse credenciales TEST halladas en el example anterior.                     |
| Rate Limiting    | PASS (1 instancia) | Checkout 10/5 min/IP; contacto 5/10 min/IP + honeypot; memoria por proceso.                                        |
| Security Headers | PASS (local)       | CSP, HSTS, nosniff, referrer, permissions, frame deny; retest obligatorio detrás de Apache.                        |
| Dependencies     | FAIL               | 5 hallazgos corregidos; queda 1 moderado de esbuild en tooling de Drizzle.                                         |
| Server Readiness | FAIL               | Checklist creado; servidor remoto no inspeccionado ni modificado.                                                  |

## Hallazgos por severidad

### P0 Critical: 0

Ninguno confirmado.

### P1 High: 4

1. Rotar Access Token TEST y secreto webhook que aparecieron en `.env.example` no trackeado antes
   de ser saneado.
2. Crear en staging/producción usuario DB runtime mínimo separado del usuario de migraciones.
3. Ejecutar y evidenciar Apache/TLS/firewall/systemd/backups/rollback en el servidor real.
4. Publicar textos legales revisados antes de producción; hoy continúan como información pendiente.

### P2 Medium: 8

1. Vulnerabilidad moderada de esbuild 0.18.20, transitiva de tooling; no exponer Vite dev.
2. CSP usa `'unsafe-inline'` por hidratación/estilos actuales; evaluar nonce sin romper TanStack.
3. Rate limiter no es compartido entre múltiples procesos.
4. QA visual automatizado no ejecutado por fallo de la herramienta de navegador.
5. Sitemap, canonical y redirecciones WordPress no verificados.
6. Imágenes históricas grandes y bundle principal requieren medición Lighthouse en staging.
7. Restricción de dominio/cuota Web3Forms pendiente de verificar en proveedor.
8. Contracargos y reembolsos parciales requieren procedimiento antes de cobros reales.

### P3 Low: 3

1. Siete warnings Fast Refresh.
2. `dangerouslySetInnerHTML` en chart interno sin entrada de usuario; mantener esa frontera.
3. Dependencia de Google Fonts externa; evaluar self-hosting sólo como mejora futura, no en esta fase.

## Hardening aplicado

- Saneado de `.env.example`; credenciales reales permanecen sólo en `.env` ignorado.
- Formulario Web3Forms movido a server-only, Zod strict, límites, honeypot, timeout y rate limit.
- Checkout y orden con objetos strict, teléfono validado y rechazo explícito de precio/total extra.
- Carrito persistido validado y acotado; cantidades y número de elementos limitados.
- Controles activos del carrito y configurador ajustados a objetivos táctiles mínimos de 44 px; el
  contador visual respeta el límite de cantidad validado por el servidor.
- Webhook limitado a 64 KiB; métodos inválidos 405; respuestas no cacheables.
- Rate limiting server-side para checkout y contacto.
- Pool DB con timeouts/cola/idle y bloqueo de usuario `root` en producción.
- Health endpoint sin detalles internos y consulta DB cacheada.
- CSP y headers de seguridad desde el entry server.
- Validación estricta del hostname de redirección Mercado Pago.
- Matomo ya no recibe query strings/fragments, incluidos IDs de retorno de pago.
- Checkout y retornos marcados `noindex,nofollow`; robots bloquea APIs/callbacks.
- Build local cambiado a `node-server`; eliminada allowlist temporal de túnel.
- Dependencias transitivas corregidas: brace-expansion, js-yaml y nanoid.
- README reemplazado para reflejar TanStack/MySQL/Mercado Pago reales.

## Pruebas realizadas

### Suite

```text
bun run build       PASS
bun run typecheck   PASS
bun run lint        PASS (0 errores, 7 warnings)
bun test            PASS (18/18)
bun run db:check    PASS
bun audit           FAIL (1 moderada en tooling)
```

Casos unitarios: precio/total inyectado, cantidades 0/negativas/decimales/NaN/Infinity/excesivas,
contacto acotado, firma inválida/ausente, JSON inválido, webhook >64 KiB, API MP caída, importe,
moneda, entorno, collector, folio, mapeo y transiciones de estado.

### Base local, sólo lectura

- MariaDB local `mikuva`, usuario `mikuva_app@localhost`, 11 tablas.
- 20 pedidos y 18 pagos.
- 0 totales de orden/partida inconsistentes.
- 0 partidas huérfanas.
- 0 duplicados pedido/proveedor.
- No se consultó ni tocó producción.

### Black-box local del build

- 200: Home, tienda, producto, carrito, checkout, contacto, health.
- 404: ruta inexistente, `.env`, `.git/config`, `package.json`, `/assets` directory.
- 401: webhook sin firma.
- 405: OPTIONS webhook y POST health.
- CSP/HSTS/no-store presentes; sin CORS wildcard.
- 0 coincidencias de secretos locales en `.output/public`.
- Query `status=approved`/`payment_id` en success sólo renderiza información; no existe handler de
  escritura en esas rutas.

### No ejecutado / pendiente

- Strix no está instalado/disponible localmente; no se añadió como dependencia runtime.
- Navegador automatizado no inició por un error de la herramienta. No se adjudica PASS a 320/375/
  390/430, teclado, focus, consent UI ni reduced motion.
- No se realizó pago externo nuevo ni prueba end-to-end con comprador TEST en esta auditoría.
- No se probaron Apache real, HTTPS/TLS, firewall, systemd, backup ni restore.

## Criterio de salida

Cuando P1-01 a P1-04 estén cerrados y el checklist tenga evidencia, repetir la suite y entonces
evaluar **READY FOR SERVER STAGING**. Tras desplegar staging: smoke test, pentest black-box autorizado,
Mercado Pago TEST end-to-end, headers y TLS. Sólo después evaluar producción y configurar sus
credenciales manualmente.
