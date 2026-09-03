# Environment audit

No se incluyen valores reales. No hay variables `VITE_*` ni `import.meta.env` en el código actual.
El wrapper de build sólo inyectaría variables con prefijo `VITE_`; por tanto, no usar ese prefijo
para secretos.

| Variable                     | Clase                           | Consumidor                          | Requerida        | Observación                                                                         |
| ---------------------------- | ------------------------------- | ----------------------------------- | ---------------- | ----------------------------------------------------------------------------------- |
| `DATABASE_URL`               | SECRET / SERVER ONLY / PROD+DEV | Drizzle, runtime, migraciones, seed | Sí para DB       | Nunca cliente; usuario no-root.                                                     |
| `WEB3FORMS_ACCESS_KEY`       | SERVER ONLY / PROD+DEV          | contacto                            | Para contacto    | Web3Forms la describe como key pública, pero Mikuva ya no la incluye en JS cliente. |
| `MERCADOPAGO_ACCESS_TOKEN`   | SECRET / SERVER ONLY / PROD+DEV | SDK MP                              | Sí para pago     | Rotar credencial TEST hallada en el example anterior. Nunca usar `VITE_`.           |
| `MERCADOPAGO_PUBLIC_KEY`     | PUBLIC CANDIDATE / UNUSED       | ninguno                             | No               | No se expone ni usa en Checkout Pro actual.                                         |
| `MERCADOPAGO_ENV`            | SERVER ONLY / CONFIG            | MP y webhook                        | Sí               | El código auditado acepta únicamente `test`.                                        |
| `MERCADOPAGO_WEBHOOK_SECRET` | SECRET / SERVER ONLY            | firma webhook                       | Sí para webhook  | Rotar secreto TEST hallado en el example anterior.                                  |
| `MERCADOPAGO_WEBHOOK_URL`    | SERVER CONFIG / UNUSED          | documentación                       | No en runtime    | URL pública que se configura manualmente en MP.                                     |
| `MERCADOPAGO_COLLECTOR_ID`   | SERVER ONLY / INTEGRITY         | webhook                             | Sí               | No es secreto; debe corresponder al vendedor del token.                             |
| `APP_URL`                    | SERVER CONFIG / PROD+DEV        | back URLs MP                        | Sí para pago     | En producción debe ser el origen HTTPS canónico.                                    |
| `TRUST_PROXY`                | SERVER CONFIG / PROD+DEV        | rate limiting                       | Sí, explícita    | `true` sólo detrás del Apache confiable y puerto loopback.                          |
| `HOST`                       | SERVER CONFIG / PRODUCTION      | Nitro                               | Sí en servidor   | Usar `127.0.0.1`.                                                                   |
| `PORT`                       | SERVER CONFIG / PRODUCTION      | Nitro                               | Sí en servidor   | Puerto interno no expuesto.                                                         |
| `NODE_ENV`                   | SERVER/BUILD CONFIG             | headers, DB guard                   | Sí en producción | Usar `production`; activa CSP/HSTS y rechazo de DB root.                            |

## Configuración pública compilada

- Token público de sitio de Chatwoot en `src/lib/chatwoot.ts`.
- URL de Chatwoot, sitio/URL de Matomo y URL embed de Maps.
- Datos empresariales públicos de `src/constants/site.ts`.
- No son credenciales de servidor.

## Verificación de secretos

- `.env` está ignorado; `git ls-files` no mostró ningún archivo de entorno real.
- La búsqueda por los valores sensibles locales produjo 0 coincidencias en fuentes fuera de `.env`,
  0 en `.output/public` y 0 commits del historial disponible.
- Al iniciar la auditoría, `.env.example` nuevo/no trackeado contenía valores con formato real de
  Access Token TEST y secreto de webhook. Se sustituyeron por campos vacíos.
- **ROTATION REQUIRED BEFORE STAGING:** Access Token TEST y secreto de webhook encontrados en ese
  archivo deben rotarse manualmente por precaución. No se configuraron credenciales productivas.

## Reglas operativas

1. Guardar el archivo real fuera de cualquier DocumentRoot estático y con modo `0600`.
2. Cargarlo mediante `EnvironmentFile` de systemd; no pegar secretos en unidades versionadas.
3. Mantener un archivo distinto para local, staging TEST y producción.
4. No imprimir env, tokens, Authorization, cookies ni payloads completos en logs.
5. Probar `/.env` y `/.git/config` tras configurar Apache: deben responder 403/404.
