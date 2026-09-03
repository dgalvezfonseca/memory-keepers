# Server deploy checklist

Este documento es un runbook manual. No se ejecutó SSH ni se modificó Virtualmin, Apache, firewall
o la base remota durante la auditoría.

## 1. Gate de código y release

- [ ] Confirmar 0 P0 y 0 P1 abiertos en `PRE_PRODUCTION_AUDIT.md`.
- [ ] Rotar Access Token TEST y secreto webhook señalados en `THREAT_MODEL.md`.
- [ ] Etiquetar un commit known-good y registrar su hash.
- [ ] En Linux: `bun install --frozen-lockfile`.
- [ ] Ejecutar `bun run typecheck`, `bun run lint`, `bun test`, `bun run db:check` y `bun run build`.
- [ ] Confirmar `.output/nitro.json` con preset `node-server`.
- [ ] No copiar `node_modules` ni build generados en Windows al servidor Linux.
- [ ] Mantener releases inmutables, por ejemplo `releases/<timestamp>-<commit>` y symlink `current`.

## 2. Usuario, rutas y permisos Virtualmin

- [ ] Ejecutar la app con el usuario no-root del dominio o un usuario dedicado sin shell privilegiado.
- [ ] Mantener código/app fuera de `public_html` cuando Apache sólo hará reverse proxy.
- [ ] Guardar env en una ruta como `/home/<usuario>/config/mikuva.env`, fuera del DocumentRoot.
- [ ] Propietario del env: usuario del servicio; modo `0600`.
- [ ] Directorios `0750` y archivos `0640` o más restrictivos según necesidad.
- [ ] Nunca aplicar `chmod 777`.
- [ ] Confirmar que backups, logs, fuentes, `.git` y env no estén en rutas servidas.

## 3. Environment de staging TEST

- [ ] `NODE_ENV=production`.
- [ ] `HOST=127.0.0.1` y puerto interno no público, por ejemplo `PORT=3000`.
- [ ] `TRUST_PROXY=true` sólo después de verificar que Apache es la única entrada al puerto.
- [ ] `APP_URL=https://<staging-host>` sin path, credenciales ni HTTP.
- [ ] `DATABASE_URL` local con usuario runtime no-root.
- [ ] `WEB3FORMS_ACCESS_KEY` configurada y dominio staging autorizado en Web3Forms.
- [ ] `MERCADOPAGO_ENV=test`.
- [ ] Access Token, collector y secreto webhook TEST recién rotados y pertenecientes a la misma app.
- [ ] `MERCADOPAGO_WEBHOOK_URL=https://<staging-host>/api/webhooks/mercadopago`.
- [ ] No incluir variables `VITE_*` con secretos.

## 4. MariaDB/MySQL

- [ ] Bind en loopback/socket; puerto 3306 cerrado desde Internet.
- [ ] Crear DB con charset/collation Unicode apropiado y zona horaria documentada.
- [ ] Usuario runtime limitado a `SELECT, INSERT, UPDATE, DELETE` sobre Mikuva.
- [ ] Usuario de migraciones separado; sin `CREATE USER`, `GRANT`, `SUPER` ni `FILE`.
- [ ] Verificar `SHOW GRANTS` sin copiar hashes/credenciales a tickets o logs.
- [ ] Backup consistente inmediatamente antes de migrar.
- [ ] Ejecutar `bun run db:check`.
- [ ] Revisar SQL de migraciones versionadas.
- [ ] Ejecutar `bun run db:migrate` manualmente en ventana de despliegue.
- [ ] Nunca ejecutar migraciones desde el arranque normal.
- [ ] Verificar constraints, conteos, totales, huérfanos y duplicados después de migrar.

## 5. systemd

- [ ] Crear unidad del sistema con `User`/`Group` no-root y `WorkingDirectory=<release>/current`.
- [ ] Usar `EnvironmentFile=/home/<usuario>/config/mikuva.env`.
- [ ] `ExecStart=/usr/bin/node .output/server/index.mjs` (ruta real verificada).
- [ ] Configurar `Restart=on-failure`, `RestartSec=5`, `TimeoutStartSec=30`, `TimeoutStopSec=30`.
- [ ] Aplicar `NoNewPrivileges=true`, `PrivateTmp=true` y `UMask=0077` si son compatibles.
- [ ] Establecer límites de memoria/archivos tras medir el build, no al azar.
- [ ] Logs a stdout/stderr capturados por journald; sin tokens, cookies ni payloads completos.
- [ ] `systemctl daemon-reload`, start/restart y enable únicamente durante el despliegue manual.
- [ ] Confirmar reinicio automático simulando una caída controlada en staging.

## 6. Apache reverse proxy

- [ ] Habilitar únicamente módulos necesarios: proxy, proxy_http, headers, ssl, rewrite.
- [ ] VirtualHost HTTPS con `ProxyPreserveHost On`.
- [ ] Proxy `/` hacia `http://127.0.0.1:3000/`; no exponer el puerto interno.
- [ ] Sobrescribir/normalizar `X-Forwarded-For` y fijar `X-Forwarded-Proto https`.
- [ ] Configurar `ProxyTimeout` razonable (por ejemplo 30 s) y límites de request.
- [ ] Limitar webhook a 64 KiB y formularios/server functions a un tamaño pequeño razonable.
- [ ] `Options -Indexes` en todos los directorios servidos.
- [ ] Denegar dotfiles, `.git`, env, backups, logs, SQL, claves privadas y source maps no requeridos.
- [ ] No agregar CORS `*`.
- [ ] Mantener headers de app; Apache puede reforzarlos después de probar Chatwoot/Maps/Matomo.
- [ ] Validar sintaxis con `apachectl configtest` antes de recargar.

Ejemplo conceptual de proxy; adaptar al vhost generado por Virtualmin, no pegar sin revisar:

```apache
ProxyPreserveHost On
RequestHeader set X-Forwarded-Proto "https"
ProxyPass        / http://127.0.0.1:3000/ connectiontimeout=5 timeout=30
ProxyPassReverse / http://127.0.0.1:3000/

<Location "/api/webhooks/mercadopago">
  LimitRequestBody 65536
</Location>

<Directory "/home/USUARIO/public_html">
  Options -Indexes
</Directory>

<FilesMatch "(^\.env|^\.git|\.(sql|bak|log|pem|key|p12|pfx)(\.gz)?)$">
  Require all denied
</FilesMatch>
```

## 7. TLS, red y paneles

- [ ] Certificado válido para staging/dominio y renovación automática comprobada.
- [ ] Redirección HTTP → HTTPS antes del checkout.
- [ ] TLS moderno; ejecutar prueba externa de TLS después del despliegue.
- [ ] Firewall público sólo 80/443; SSH restringido por IP/VPN si es viable.
- [ ] Puerto de app y 3306 inaccesibles desde otra máquina.
- [ ] SSH por llaves, password login deshabilitado si es viable, root login deshabilitado.
- [ ] Virtualmin/phpMyAdmin/Adminer protegidos con MFA, allowlist/VPN y rate limiting o deshabilitados.
- [ ] Fail2ban para SSH/Virtualmin/Apache según logs reales.
- [ ] Sistema operativo, Apache, MariaDB y runtime con soporte vigente; actualizar en ventana separada.

## 8. Headers y archivos sensibles

- [ ] `Content-Security-Policy` presente y sin `script-src *`.
- [ ] `X-Content-Type-Options: nosniff`.
- [ ] `Referrer-Policy: strict-origin-when-cross-origin`.
- [ ] `Permissions-Policy` restringida.
- [ ] `frame-ancestors 'none'` y/o `X-Frame-Options: DENY`.
- [ ] HSTS sólo tras HTTPS válido; confirmar `Strict-Transport-Security`.
- [ ] Probar `/.env`, `/.git/config`, `/package.json`, `/backups/`, `/logs/`: 403/404.
- [ ] Confirmar sin directory listing en `/assets/` y cualquier alias de Apache.
- [ ] Confirmar que errores 500 no muestran stack, SQL, path o env.

## 9. Mercado Pago TEST en staging

- [ ] Aplicación TEST correcta y credenciales del mismo vendedor/collector.
- [ ] Webhook TEST configurado a HTTPS staging y evento `payment`.
- [ ] Crear pedido desde un carrito real; verificar precios desde DB.
- [ ] Crear preferencia una sola vez ante doble clic/retry.
- [ ] Completar pago con comprador TEST.
- [ ] Verificar que success URL no cambia estado por sí sola.
- [ ] Confirmar webhook 200, evento y pago/pedido sincronizados.
- [ ] Reenviar el mismo webhook: sin orden/evento duplicado.
- [ ] Probar amount, currency, collector, live mode, folio y firma incorrectos: nunca aprobar.
- [ ] Simular timeout de MP y DB: mensaje genérico, 503 recuperable donde corresponda.
- [ ] No cambiar todavía a credenciales PRODUCTION.

## 10. Formularios, cookies y UX

- [ ] Contacto válido llega una vez; inválido/bot/flood es rechazado o limitado.
- [ ] Dominio y cuota configurados en Web3Forms.
- [ ] Primera visita: consentimiento; rechazo no carga Chatwoot/Maps/Matomo.
- [ ] Aceptación selectiva y revocación funcionan en recarga.
- [ ] Probar 320, 375, 390, 430, 768, 1024, 1440 y 1920 px sin overflow.
- [ ] Flujo completo sólo con teclado; foco visible; lector de pantalla básico.
- [ ] Reduced motion.
- [ ] Home, catálogo, producto, carrito, checkout, contacto, 404 y retornos.
- [ ] Back, refresh, carrito corrupto, carrito vacío y doble clic.

## 11. Logs, monitoreo y backups

- [ ] Rotación para Apache y journald; límites que eviten llenar disco.
- [ ] Alertas de disco, RAM, CPU, reinicios, DB, HTTP 5xx y fallos webhook.
- [ ] Logs webhook mínimos: timestamp, payment ID, folio, acción, resultado; nunca token/firma.
- [ ] Backup DB diario, retención sugerida 7 diarios/4 semanales/12 mensuales según capacidad.
- [ ] Copia cifrada off-server; no sólo en el mismo disco.
- [ ] Backup de env/config Apache/systemd y uploads si se agregan en el futuro.
- [ ] Restauración completa ensayada en staging y tiempo documentado.

## 12. Rollback

- [ ] Conservar al menos release actual y anterior inmutables.
- [ ] Rollback de código cambiando el symlink `current` y reiniciando systemd.
- [ ] No revertir una migración destructivamente. Diseñar migraciones backward-compatible.
- [ ] Si una migración impide rollback, restaurar backup siguiendo procedimiento ensayado.
- [ ] Registrar responsable, comandos exactos, criterio de abortar y tiempo máximo.

## 13. Gate final

- [ ] `/api/health` 200 sin detalles internos.
- [ ] Smoke test y pentest black-box sólo contra staging propio autorizado.
- [ ] Headers/TLS test externo.
- [ ] Mercado Pago TEST end-to-end.
- [ ] 0 P0 y 0 P1.
- [ ] Backup y rollback probados.
- [ ] Sólo entonces: **READY FOR SERVER STAGING**.
- [ ] Después de repetir todo en staging y configurar manualmente producción: evaluar **READY FOR PRODUCTION**.
