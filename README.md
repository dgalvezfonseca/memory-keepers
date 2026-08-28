# Memory Keepers

MEGA PROMPT — REDISEÑO COMPLETO DE MIKUVA.COM

Quiero rediseñar por completo el sitio web mikuva.com.

Actualmente el sitio está construido en WordPress y alojado en servidores propios. El objetivo es reemplazar WordPress por una solución moderna, rápida, mantenible y completamente independiente, conservando la esencia actual de la marca Mikuva y manteniendo la lógica de tienda en línea.

1. OBJETIVO GENERAL

Crear una nueva versión de Mikuva con una experiencia moderna, emocional y profesional.

Mikuva se dedica a la preservación y digitalización de recuerdos familiares, incluyendo principalmente:

Fotografías impresas

Álbumes

Negativos

Diapositivas

Películas 8mm

Películas Super 8

Otros formatos relacionados con recuerdos físicos

La página debe transmitir principalmente:

Confianza

Cuidado

Profesionalismo

Tecnología

Nostalgia

Seguridad

Cercanía

Valor emocional

El cliente debe sentir que puede confiar a Mikuva recuerdos familiares únicos e irremplazables.

NO quiero una página que parezca:

WordPress

WooCommerce

Una plantilla genérica

Una tienda tradicional de productos físicos

Un marketplace

Una web excesivamente tecnológica

Una página oscura o agresiva

Quiero una web premium, limpia, moderna y emocional.

La referencia conceptual puede ser una mezcla entre:

Apple Photos

Un estudio fotográfico premium

Un laboratorio profesional de digitalización

Un álbum familiar moderno

2. STACK TECNOLÓGICO

Construir el proyecto utilizando:

Next.js

React

TypeScript

Tailwind CSS

shadcn/ui

Supabase

PostgreSQL

Supabase Auth

Supabase Storage

Stripe

Mercado Pago como integración opcional/futura

Resend para correos transaccionales

Docker

Nginx

El proyecto deberá estar preparado para ser desplegado en servidores propios.

No usar WordPress.

No usar WooCommerce.

No usar Shopify.

No usar un CMS tradicional.

La aplicación debe estar completamente desacoplada del sistema actual.

3. ESTRUCTURA DEL PROYECTO

Quiero una estructura profesional y mantenible.

No colocar toda la lógica dentro de una sola página.

Separar correctamente:

Componentes

Layouts

Hooks

Servicios

Tipos

Utilidades

Configuración

API

Base de datos

Autenticación

Administración

Tienda

Checkout

Ejemplo recomendado:

src/
├── app/
│   ├── page.tsx
│   ├── servicios/
│   ├── tienda/
│   ├── producto/
│   ├── carrito/
│   ├── checkout/
│   ├── pedido/
│   ├── nosotros/
│   ├── contacto/
│   ├── faq/
│   └── admin/
│
├── components/
│   ├── layout/
│   ├── home/
│   ├── products/
│   ├── services/
│   ├── cart/
│   ├── checkout/
│   ├── admin/
│   └── ui/
│
├── lib/
│   ├── supabase/
│   ├── stripe/
│   ├── email/
│   ├── validations/
│   └── utils/
│
├── hooks/
├── types/
├── constants/
└── styles/


No repetir código.

Crear componentes reutilizables.

4. DISEÑO VISUAL

Estilo general

Quiero un diseño:

Minimalista

Premium

Editorial

Emocional

Luminoso

Muy limpio

Con bastante espacio en blanco

Responsive

Elegante

Amigable

Evitar saturación visual.

No abusar de:

Gradientes

Glassmorphism

Neones

Tarjetas flotantes

Sombras excesivas

Animaciones innecesarias

Paleta

La página debe ser principalmente clara.

Utilizar colores como:

Blanco cálido

Marfil

Beige claro

Arena

Gris cálido

Gris carbón para tipografía

Agregar uno o dos colores de marca para botones, enlaces y elementos importantes.

No usar negro puro como fondo principal.

5. TIPOGRAFÍA

Utilizar una combinación elegante.

Idealmente:

Sans serif moderna para interfaz

Serif elegante opcional para titulares emocionales

Ejemplo conceptual:

Titular:

"Los recuerdos no deberían desaparecer."

Texto:

"Digitalizamos fotografías, negativos, películas y álbumes para que puedas conservarlos por generaciones."

6. HEADER

Crear un header limpio y fijo.

Contenido:

Logo Mikuva

Inicio

Servicios

Tienda

Cómo funciona

Preguntas frecuentes

Nosotros

Contacto

A la derecha:

Icono de búsqueda opcional

Carrito

Botón CTA

CTA principal:

"Digitaliza tus recuerdos"

En móvil usar menú hamburguesa elegante.

7. HOME PAGE

La página principal debe construirse en varias secciones.

SECCIÓN 1 — HERO

Debe ser emocional y muy visual.

Usar una composición de:

Fotografías antiguas

Álbumes

Negativos

Películas

Recuerdos familiares

El diseño debe sugerir la transformación del mundo físico al digital.

Ejemplo de copy:

"Los recuerdos no deberían desaparecer."

Subtítulo:

"Digitalizamos fotografías, negativos, diapositivas, álbumes y películas para conservar tus historias por generaciones."

Botones:

"Digitaliza tus recuerdos"

"Ver servicios"

Agregar un pequeño mensaje de confianza:

"Tratamos cada recuerdo como si fuera nuestro."

8. SECCIÓN — QUÉ PUEDES DIGITALIZAR

Crear una sección visual con tarjetas grandes.

Categorías:

Fotografías

Negativos

Diapositivas

Álbumes

8mm

Super 8

Cada tarjeta debe tener:

Imagen

Nombre

Breve explicación

Precio desde

CTA

Ejemplo:

Fotografías

"Digitalizamos tus fotografías impresas en alta resolución."

"Desde $XXX"

"Ver opciones"

9. SECCIÓN — CÓMO FUNCIONA

Crear una explicación muy sencilla.

Paso 1:

Elige tu servicio.

Paso 2:

Prepara y envía tus recuerdos.

Paso 3:

Digitalizamos y revisamos tu material.

Paso 4:

Recibe tus archivos y originales.

Visualizarlo mediante una línea de proceso limpia.

Debe ser extremadamente fácil de entender.

10. SECCIÓN — POR QUÉ MIKUVA

Crear beneficios claros.

Ejemplos:

Manejo cuidadoso de originales

Digitalización profesional

Equipo especializado

Alta resolución

Control de calidad

Privacidad

Años de experiencia

Atención personalizada

No hacer claims falsos.

Los valores deben poder editarse posteriormente desde el proyecto.

11. SECCIÓN — ANTES Y DESPUÉS

Crear una sección muy visual.

Mostrar:

Fotografía original

→

Resultado digitalizado/restaurado

Usar un componente comparador tipo slider si es posible.

Debe funcionar bien en móvil.

12. SECCIÓN — HISTORIAS / TESTIMONIOS

Crear testimonios visuales pero sobrios.

No inventar testimonios reales.

Por ahora usar contenido placeholder claramente marcado para ser reemplazado.

Ejemplo:

"[TESTIMONIO REAL POR AGREGAR]"

13. SECCIÓN — CTA FINAL

Crear una sección emocional.

Ejemplo:

"Hay recuerdos que no se pueden volver a tomar."

"Presérvalos hoy."

CTA:

"Comenzar mi digitalización"

14. FOOTER

Incluir:

Mikuva

Servicios

Tienda

Cómo funciona

FAQ

Contacto

Aviso de privacidad

Términos

Política de envíos

Política de devolución

Redes sociales

Copyright dinámico.

15. TIENDA

La tienda no debe sentirse como WooCommerce.

Debe estar enfocada en SERVICIOS DE DIGITALIZACIÓN.

Página:

/tienda

Agregar filtros por categoría:

Fotografías

Negativos

Diapositivas

Álbumes

Películas

Cada producto debe tener:

Imagen

Nombre

Descripción corta

Precio desde

Etiqueta de categoría

CTA

No mostrar información innecesaria como SKU al usuario.

16. PÁGINA DE PRODUCTO

La página del producto debe sentirse premium.

Layout desktop:

Columna izquierda:

Imagen principal

Galería

Columna derecha:

Nombre

Descripción

Precio

Configurador

CTA

Debajo:

Qué incluye

Cómo preparar el material

Cómo funciona

Preguntas frecuentes relacionadas

Entrega

Seguridad

Productos relacionados

17. CONFIGURADOR DE PRODUCTOS

Mikuva vende servicios que pueden tener diferentes cantidades y formatos.

No quiero un selector simple estilo WooCommerce.

Crear configuradores visuales.

Ejemplo para fotografías:

Título:

"¿Cuántas fotografías quieres digitalizar?"

Crear un slider.

Rango configurable:

100

500

1,000

3,000

5,000

El sistema debe recomendar automáticamente el paquete más adecuado.

Ejemplo:

"1,200 fotografías"

"Te recomendamos el paquete de 1,500 fotografías."

Mostrar precio dinámicamente.

18. CONFIGURADOR DE 8MM / SUPER 8

Crear una experiencia específica.

Pregunta:

"¿Qué tipo de película tienes?"

Opciones:

8mm

Super 8

Después:

"Selecciona el tamaño del carrete"

Mostrar tamaños:

3"

4"

5"

6"

7"

9"

Cada tamaño deberá poder tener:

Pies aproximados

Duración aproximada

Precio

Agregar cantidad.

Ejemplo:

3 carretes

Precio unitario

Subtotal

Mostrar resumen dinámico.

19. CARRITO

Crear carrito moderno.

Ruta:

/carrito

Mostrar:

Servicio

Configuración

Cantidad

Precio

Subtotal

Permitir:

Cambiar cantidad

Eliminar

Editar configuración

Mostrar resumen:

Subtotal

Envío

Impuestos si aplica

Total

CTA:

"Continuar al pago"

20. CHECKOUT

Checkout limpio y extremadamente sencillo.

Secciones:

Datos personales

Nombre

Apellidos

Email

Teléfono

Dirección

Datos de envío

Método de entrega

Método de pago

Stripe será el método principal.

Dejar arquitectura preparada para Mercado Pago.

Agregar checkbox:

"Acepto los términos y condiciones."

21. SISTEMA DE PEDIDOS

Cada pedido deberá generar un folio.

Formato sugerido:

MK-2026-00001

El folio debe generarse automáticamente.

Guardar:

ID

Folio

Cliente

Email

Teléfono

Fecha

Productos

Total

Estado

Pago

Tracking

Notas internas

22. ESTADOS DE PEDIDO

Crear estados específicos para el negocio.

Estados:

Pedido recibido

Esperando material

Material recibido

En digitalización

Control de calidad

Preparando entrega

Enviado

Entregado

Cancelado

23. SEGUIMIENTO DE PEDIDO

Crear:

/pedido

El cliente debe ingresar:

Número de pedido

Email

Mostrar estado visual.

Ejemplo:

Pedido MK-2026-00182

✓ Pedido confirmado

✓ Material recibido

● Digitalización en proceso

○ Control de calidad

○ Preparando entrega

○ Enviado

Agregar fechas si existen.

24. PANEL ADMINISTRATIVO

Crear:

/admin

Login protegido.

Utilizar Supabase Auth.

El panel debe tener sidebar.

Secciones:

Dashboard

Pedidos

Productos

Categorías

Clientes

Configuraciones

25. DASHBOARD ADMIN

Mostrar estadísticas.

Ejemplo:

Ventas del mes

Pedidos nuevos

Pedidos en digitalización

Pedidos terminados

Ticket promedio

Agregar gráfica de ventas.

Agregar lista de pedidos recientes.

26. ADMINISTRACIÓN DE PRODUCTOS

Crear CRUD completo.

Permitir:

Crear

Editar

Eliminar

Activar/desactivar

Campos:

Nombre

Slug

Descripción

Descripción corta

Categoría

Precio

Precio desde

Imágenes

Opciones

Configuraciones

SEO

Estado

27. ADMINISTRACIÓN DE PEDIDOS

Mostrar tabla.

Columnas:

Folio

Cliente

Fecha

Total

Pago

Estado

Acciones

Permitir abrir pedido.

Dentro:

Información cliente

Productos

Configuración

Notas

Historial

Estado

Tracking

28. CAMBIO DE ESTADO

Al cambiar estado del pedido, guardar historial.

Ejemplo:

28 agosto 2026

"Material recibido"

Usuario admin

Agregar opción de mandar email automático.

29. EMAILS

Crear templates para:

Pedido recibido

Pago confirmado

Material recibido

Digitalización iniciada

Pedido terminado

Pedido enviado

Usar Resend.

Los emails deben mantener branding Mikuva.

30. BASE DE DATOS

Crear esquema Supabase.

Tablas sugeridas:

profiles

products

categories

product_options

orders

order_items

order_status_history

customers

addresses

payments

shipments

site_settings

Crear relaciones correctamente.

31. SEGURIDAD

Implementar:

Row Level Security en Supabase

Autenticación para admin

Validación server-side

Validación de formularios

Variables de entorno

No exponer keys privadas

No guardar información bancaria

Stripe debe manejar la información de tarjeta.

32. SEO

Implementar:

Metadata dinámica

Open Graph

Twitter Cards

Canonical

Sitemap.xml

robots.txt

Schema.org

Product schema

Organization schema

FAQ schema

Breadcrumbs

33. MIGRACIÓN SEO DESDE WORDPRESS

Muy importante.

La nueva web reemplazará una web existente.

Preparar un archivo/configuración de redirecciones 301.

Ejemplo:

/producto/nombre-producto

→

/tienda/nombre-producto

No perder URLs existentes.

Crear una estructura donde podamos añadir redirecciones fácilmente.

34. PERFORMANCE

Objetivo:

Google Lighthouse superior a 90.

Optimizar:

Imágenes

Fonts

JavaScript

Lazy loading

Server components

Caching

No cargar librerías innecesarias.

Usar next/image.

35. RESPONSIVE DESIGN

La web debe estar diseñada MOBILE FIRST.

Debe funcionar perfectamente en:

320px

375px

430px

768px

1024px

1440px

1920px

No crear overflow horizontal.

36. ACCESIBILIDAD

Implementar:

Semantic HTML

Labels

Keyboard navigation

Contrast

Focus states

ARIA cuando sea necesario.

37. ANIMACIONES

Usar animaciones suaves y elegantes.

Permitido:

Fade

Slide suave

Hover

Microinteracciones

Transiciones

Evitar:

Animaciones exageradas

Parallax excesivo

Scroll hijacking

38. IMÁGENES

Las fotografías deben ser protagonistas.

Crear componentes preparados para imágenes reales de:

Familias

Fotografías antiguas

Negativos

Álbumes

Carretes

Escáneres

Digitalización

No utilizar imágenes genéricas de tecnología.

39. CONTENIDO

No inventar datos empresariales.

Cuando falte información, usar placeholders claramente identificados.

Ejemplo:

[PRECIO]

[DIRECCIÓN]

[WHATSAPP]

[TELÉFONO]

[TESTIMONIO]

No generar datos falsos.

40. COMPONENTES REUTILIZABLES

Crear como mínimo:

Header

Footer

Hero

ServiceCard

ProductCard

ProductConfigurator

PhotoQuantityConfigurator

FilmConfigurator

CartDrawer

CartItem

CheckoutForm

OrderTimeline

FAQAccordion

Testimonials

BeforeAfterSlider

ProductGallery

AdminSidebar

AdminHeader

OrderTable

ProductTable

StatusBadge

StatsCard

41. EXPERIENCIA DE USUARIO

Siempre priorizar:

Claridad

Confianza

Conversión

Emoción

Facilidad

El usuario debe entender en menos de 10 segundos:

Qué hace Mikuva

Qué puede digitalizar

Cuánto puede costar

Cómo funciona

Cómo empezar

42. HOME VISUAL

Quiero que el home tenga ritmo visual.

Evitar:

Card

Card

Card

Card

Card

Utilizar diferentes layouts.

Alternar:

Imágenes grandes

Texto editorial

Grid

Secciones horizontales

Fondos ligeramente diferentes

Elementos visuales relacionados con fotografías.

43. DETALLES DE MARCA

Crear recursos gráficos sutiles inspirados en:

Esquinas de fotografías

Bordes de negativos

Film strips

Sellos de fecha

Notas escritas en álbumes

Nunca hacerlo kitsch.

Debe sentirse moderno.

44. WHATSAPP

Agregar botón flotante de WhatsApp.

No debe tapar contenido.

Agregar CTA contextual.

Ejemplo:

"¿No sabes qué paquete necesitas?"

"Te ayudamos por WhatsApp."

Usar placeholder:

[WHATSAPP_NUMBER]

45. CONTACTO

Crear página:

/contacto

Campos:

Nombre

Email

Teléfono

Mensaje

Tipo de material

Agregar:

WhatsApp

Email

Información de contacto

No publicar datos ficticios.

46. FAQ

Crear preguntas sobre:

Cómo enviar material

Tiempo de procesamiento

Seguridad

Devolución de originales

Resolución

Formatos digitales

USB

Nube

Películas

Fotografías

Precios

47. PÁGINA CÓMO FUNCIONA

Crear una página completa explicando:

Seleccionar servicio

Preparar recuerdos

Empacar

Enviar

Recepción

Digitalización

Control de calidad

Entrega

Debe generar confianza.

48. EXPERIENCIA EMOCIONAL

Quiero utilizar mensajes como:

"Las fotos envejecen. Las historias no deberían."

"Hay recuerdos que solo existen una vez."

"Conserva hoy lo que quieres compartir mañana."

"Tu historia merece durar."

No usar todos simultáneamente.

Elegir los que mejor funcionen.

49. ENTREGA DEL PROYECTO

Generar una primera versión funcional.

Prioridad:

Home

Header

Footer

Servicios

Tienda

Producto

Configuradores

Carrito

Checkout

Admin

Base de datos

No intentar meter toda la lógica dentro de la primera página.

50. IMPORTANTE SOBRE EL CÓDIGO

No quiero código prototipo.

Quiero estructura lista para convertirse en producción.

Evitar:

Archivos gigantes

CSS inline excesivo

Código duplicado

Componentes de 1,000 líneas

Datos hardcodeados innecesariamente

Crear tipos TypeScript.

Separar lógica de UI y servicios.

51. DOCKER

Preparar Dockerfile.

Preparar docker-compose si es conveniente.

Preparar archivo:

.env.example

Variables sugeridas:

NEXT_PUBLIC_SUPABASE_URL=

NEXT_PUBLIC_SUPABASE_ANON_KEY=

SUPABASE_SERVICE_ROLE_KEY=

STRIPE_SECRET_KEY=

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=

STRIPE_WEBHOOK_SECRET=

RESEND_API_KEY=

NEXT_PUBLIC_SITE_URL=

NEXT_PUBLIC_WHATSAPP_NUMBER=

52. DOCUMENTACIÓN

Crear README.md con:

Instalación

Dependencias

Variables

Supabase

Stripe

Desarrollo

Build

Docker

Producción

Migraciones

Deploy

53. PRIMER RESULTADO ESPERADO

En la primera iteración quiero ver:

Home completamente rediseñado

Header

Footer

Página tienda

Página de producto

Carrito funcional visualmente

Layout responsive

Mock data bien estructurado

Arquitectura profesional

Diseño coherente

Todavía no es obligatorio conectar pagos reales en la primera iteración.

54. NO CAMBIAR LA ESENCIA DE MIKUVA

Aunque el diseño será completamente nuevo, mantener el concepto principal:

Preservar recuerdos familiares mediante digitalización profesional.

La web no debe sentirse como una startup SaaS.

No quiero frases tipo:

"Revolutionizing digital memory transformation through cutting-edge AI."

Mikuva debe sentirse humana.

55. CRITERIO FINAL

Antes de considerar terminada cualquier pantalla, preguntarse:

"¿Confiaría una persona las únicas fotografías de sus abuelos a esta empresa viendo esta página?"

Si la respuesta no es claramente sí, mejorar la experiencia.

Construye la web con ese principio como guía.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/458b36bc-cef2-4398-8599-4017c7ac1863).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
