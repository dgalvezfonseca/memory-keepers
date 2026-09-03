# Plan de integración futura con Envia.com

## Estado

Documento de preparación técnica. La API de Envia.com, la cotización automática y la generación de
guías **no están implementadas** en esta fase. Este plan no autoriza cambios de base de datos ni
despliegue.

## A. Objetivo

Permitir que el cliente proporcione su domicilio y, posteriormente, consultar opciones reales de
envío mediante Envia.com para coordinar la recepción y devolución del material físico.

Envia.com se tratará como una plataforma de cotización y gestión logística capaz de presentar
servicios de distintos transportistas. La integración no debe asumir exclusividad con una
paquetería, una tarifa fija ni un plazo garantizado.

## B. Flujo propuesto

```text
Checkout
→ datos personales
→ dirección completa
→ validación server-side
→ cotización en Envia.com
→ presentación de opciones
→ selección del cliente
→ revalidación y snapshot de la opción seleccionada
→ cálculo autoritativo del total
→ Mercado Pago
→ confirmación mediante webhook de Mercado Pago
→ generación o gestión de la guía
```

La opción seleccionada deberá guardar un snapshot suficiente para conservar el transportista,
servicio, costo, moneda, plazo estimado y datos técnicos de la cotización aunque el proveedor cambie
su catálogo posteriormente.

## C. Seguridad

- La credencial de Envia.com será **SERVER ONLY**.
- Nunca debe usar el prefijo `VITE_*`, incluirse en JavaScript del navegador ni almacenarse en Git.
- `.env.example` podrá documentar en el futuro el nombre de la variable, pero nunca un valor real.
- Todas las llamadas a Envia.com se harán desde funciones server-side de TanStack Start.
- Las respuestas del proveedor deben validarse en runtime, establecer timeouts y manejar errores sin
  mostrar credenciales ni payloads sensibles.
- Los logs no deben contener tokens ni domicilios completos.

Nombre conceptual para la futura variable: `ENVIA_API_TOKEN`. Su nombre definitivo debe confirmarse
contra la documentación vigente de Envia.com antes de implementar.

## D. Precios y selección de envío

El navegador nunca será la fuente autoritativa de:

- precio de envío;
- transportista;
- servicio;
- tiempo estimado;
- total del pedido.

El cliente enviará únicamente un identificador de cotización u opción. Antes de crear el pago, el
servidor deberá volver a consultar o validar la opción, comprobar que sigue vigente y calcular el
total con valores confiables. Debe definirse una expiración corta para las cotizaciones y una
estrategia idempotente para reintentos.

## E. Direcciones y persistencia

La dirección necesaria contempla:

- calle;
- número exterior;
- número interior opcional;
- colonia;
- código postal;
- municipio o alcaldía;
- estado;
- país;
- referencias de entrega.

Probablemente será necesario ampliar el modelo de pedidos/clientes o crear una estructura específica
para guardar un **snapshot de la dirección del pedido**. La dirección histórica no debe depender de
un perfil que pueda modificarse después. También deberá evaluarse la minimización y retención de
estos datos.

No se crea ninguna tabla, campo ni migración en esta fase.

## F. Mercado Pago

El costo de envío validado debe incorporarse al total autoritativo calculado en el servidor antes de
crear la preferencia de Mercado Pago. La preferencia debe reflejar el mismo total persistido en el
pedido.

No se aceptarán precios de envío ni totales calculados por el navegador. La integración futura deberá
mantener la idempotencia existente de pedido y preferencia.

## G. Webhooks y autoridad de estados

Los dos proveedores tienen responsabilidades separadas:

- **Webhook de Mercado Pago:** autoridad sobre el estado del pago.
- **Webhook de Envia.com:** autoridad sobre eventos logísticos, guía y movimiento del envío.

Un webhook de Envia.com nunca puede marcar un pedido como pagado. Una return URL de Mercado Pago
tampoco puede marcar un pedido como pagado. Ambos webhooks requerirán autenticación/verificación,
validación de payload, idempotencia, registro mínimo de auditoría y transiciones de estado
controladas.

## Trabajo requerido antes de implementar

1. Confirmar contrato, ambiente de pruebas, autenticación, límites y webhooks disponibles en
   Envia.com.
2. Definir origen de cada envío, reglas de paquetes y cómo se obtendrán peso y dimensiones.
3. Diseñar y aprobar la migración no destructiva para dirección y snapshot de cotización.
4. Definir política operativa para seguro, cancelación de guía, recolección, devolución y excepciones.
5. Agregar pruebas de manipulación de costo, cotización vencida, doble clic, timeout y respuesta
   inválida del proveedor.
