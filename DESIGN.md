---
version: alpha
name: Mikuva
description: Sistema visual para un servicio mexicano de preservación y digitalización de memorias familiares.
colors:
  primary: "#EE2A7B"
  primary-foreground: "#111111"
  background: "oklch(0.985 0.006 85)"
  foreground: "oklch(0.27 0.012 60)"
  ivory: "oklch(0.975 0.01 88)"
  sand: "oklch(0.945 0.017 85)"
  ink: "#1B1A18"
  card: "oklch(1 0 0)"
  card-foreground: "oklch(0.27 0.012 60)"
  muted: "oklch(0.955 0.012 85)"
  muted-foreground: "oklch(0.51 0.014 60)"
  border: "oklch(0.9 0.014 82)"
  destructive: "oklch(0.55 0.19 27)"
  destructive-foreground: "oklch(0.985 0.006 85)"
  clay: "oklch(0.53 0.108 42)"
typography:
  display-xl:
    fontFamily: Fraunces
    fontSize: 4.5rem
    fontWeight: 400
    lineHeight: 1.02
    letterSpacing: -0.02em
  display-lg:
    fontFamily: Fraunces
    fontSize: 3.75rem
    fontWeight: 400
    lineHeight: 1.05
    letterSpacing: -0.02em
  heading-lg:
    fontFamily: Fraunces
    fontSize: 3rem
    fontWeight: 400
    lineHeight: 1.08
    letterSpacing: -0.015em
  heading-md:
    fontFamily: Fraunces
    fontSize: 2.25rem
    fontWeight: 400
    lineHeight: 1.15
    letterSpacing: -0.015em
  heading-sm:
    fontFamily: Fraunces
    fontSize: 1.5rem
    fontWeight: 400
    lineHeight: 1.25
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Manrope
    fontSize: 1.125rem
    fontWeight: 400
    lineHeight: 1.7
  body-md:
    fontFamily: Manrope
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.7
  body-sm:
    fontFamily: Manrope
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.6
  eyebrow:
    fontFamily: Manrope
    fontSize: 0.72rem
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: 0.18em
  control:
    fontFamily: Manrope
    fontSize: 0.875rem
    fontWeight: 600
    lineHeight: 1.2
spacing:
  xs: 0.25rem
  sm: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.25rem
  2xl: 1.5rem
  3xl: 2rem
  4xl: 3rem
  5xl: 4rem
  section-mobile: 5rem
  section-desktop: 7rem
rounded:
  none: 0px
  xs: 0.1875rem
  sm: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  2xl: 1rem
  full: 9999px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    typography: "{typography.control}"
    rounded: "{rounded.md}"
    padding: 0.625rem 1.5rem
    height: 2.75rem
  button-secondary:
    backgroundColor: "{colors.background}"
    textColor: "{colors.foreground}"
    typography: "{typography.control}"
    rounded: "{rounded.md}"
    padding: 0.625rem 1.5rem
    height: 2.75rem
  surface-card:
    backgroundColor: "{colors.card}"
    textColor: "{colors.card-foreground}"
    rounded: "{rounded.lg}"
    padding: "{spacing.2xl}"
  surface-archive:
    backgroundColor: "{colors.ivory}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.sm}"
    padding: "{spacing.2xl}"
  section-paper:
    backgroundColor: "{colors.background}"
    textColor: "{colors.foreground}"
    padding: "{spacing.section-desktop}"
  section-sand:
    backgroundColor: "{colors.sand}"
    textColor: "{colors.foreground}"
    padding: "{spacing.section-desktop}"
  final-cta:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.background}"
    rounded: "{rounded.xl}"
    padding: "{spacing.4xl}"
  input:
    backgroundColor: "{colors.card}"
    textColor: "{colors.foreground}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    padding: 0.625rem 0.75rem
    height: 2.75rem
  supporting-clay:
    backgroundColor: "{colors.clay}"
    textColor: "{colors.destructive-foreground}"
    rounded: "{rounded.sm}"
  destructive-message:
    backgroundColor: "{colors.destructive}"
    textColor: "{colors.destructive-foreground}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.sm}"
    padding: "{spacing.md}"
  quiet-note:
    backgroundColor: "{colors.muted}"
    textColor: "{colors.muted-foreground}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.sm}"
    padding: "{spacing.lg}"
  divider:
    backgroundColor: "{colors.border}"
    height: 1px
---

## Overview

Mikuva preserva fotografías, álbumes, negativos, diapositivas y película familiar. Su diseño debe responder una pregunta antes que cualquier otra: **¿confiaría una persona a Mikuva la única fotografía que conserva de alguien querido?**

La dirección no es una reidentidad. Conserva el rosa Mikuva, el casi negro, el blanco, la fotografía familiar y el lenguaje material de fotos impresas, álbumes, negativos, película y laboratorio. La síntesis es:

> Archivo familiar + fotografía editorial + laboratorio fotográfico profesional + servicio premium contemporáneo.

La experiencia debe sentirse humana, fotográfica, editorial, cálida, confiable, premium, moderna y emocionalmente contenida. La nostalgia viene de las memorias y los objetos, no de filtros sepia ni de una interfaz retro. El sistema debe poder decir **CONSERVAR / PROTEGER / COMPARTIR** sin sentimentalismo artificial.

### Principios rectores

1. **La fotografía es la prueba principal.** El contenido visual explica el valor del servicio antes que los adornos de interfaz.
2. **La confianza se construye con precisión.** Explicar proceso, cuidado, entregables, tiempos y límites con información verificable.
3. **La edición da ritmo.** Alternar escala, densidad, alineación y pausas como en un libro de fotografía.
4. **El rosa señala intención.** Se reserva para acciones y estados importantes; no tiñe toda la experiencia.
5. **Los objetos importan.** Papel, película, bordes, fechas y secuencias de archivo pueden inspirar detalles sutiles, nunca una escenografía vintage.
6. **Cada ruta merece una idea memorable.** Una composición o interacción distintiva basta; no convertir cada bloque en espectáculo.

## Colors

La jerarquía conceptual es aproximadamente **80% neutrales cálidos, 15% fotografía y 5% rosa Mikuva**. No es una fórmula de cobertura de píxeles: es una regla para que el contenido y la confianza dominen.

### Contrato cromático

| Rol | Valor de contrato | Uso |
| --- | --- | --- |
| `primary` | `#EE2A7B` | Rosa Mikuva para CTA principal, enlace relevante, progreso, foco, estado activo o selección. Valor verificado en el logotipo histórico original. |
| `primary-foreground` | `#111111` | Texto o icono sobre rosa; contraste AA verificado para texto normal sobre `#EE2A7B`. |
| `background` | `oklch(0.985 0.006 85)` | Fondo general cálido. |
| `foreground` | `oklch(0.27 0.012 60)` | Texto principal casi negro y cálido. |
| `ivory` | `oklch(0.975 0.01 88)` | Papel secundario y pausas editoriales. |
| `sand` | `oklch(0.945 0.017 85)` | Secciones de proceso o archivo; usar con moderación. |
| `ink` | `#1B1A18` | Panel oscuro, titulares y contraste fuerte. |
| `card` | `oklch(1 0 0)` | Superficie funcional cuando una separación es necesaria. |
| `muted` / `muted-foreground` | `oklch(0.955 0.012 85)` / `oklch(0.51 0.014 60)` | Información secundaria, nunca texto crítico de bajo contraste. |
| `border` | `oklch(0.9 0.014 82)` | Divisiones discretas, marcos y controles. |
| `destructive` | `oklch(0.55 0.19 27)` | Error o acción destructiva, no acento promocional. |
| `clay` | `oklch(0.53 0.108 42)` | Color de apoyo heredado de la implementación actual; no reemplaza al rosa de marca. |

Los colores históricos `#6A5E51`, `#E7E4DC`, `#E57374`, `#BEB4BB` y `#A8A092` son referencia de legado, no una paleta que deba aparecer completa en una misma pantalla. Sólo incorporar uno si resuelve un rol semántico ausente y después de comprobar contraste.

Nunca usar el rosa como única señal de selección, error o progreso: acompañarlo con borde, forma, texto, icono o estado ARIA. No usar gradientes decorativos, especialmente rosa/morado. La fotografía debe conservar tonos naturales; no aplicar una capa rosa global.

## Typography

**Fraunces** es la voz editorial para títulos y momentos de memoria. **Manrope** es la voz práctica para lectura, navegación, formularios, precio y estado. Esta pareja ya está cargada por el proyecto y debe conservarse.

- Usar Fraunces en `display-xl`, `display-lg` y encabezados con peso 400. Evitar cursivas ornamentales y exceso de titulares serif en una misma vista.
- Usar Manrope en cuerpo, controles, datos y microcopy. El cuerpo base es `1rem` con interlínea `1.7` en superficies amplias.
- El `eyebrow` existente —mayúsculas, `0.72rem`, tracking `0.18em`— sirve para clasificar, no para sustituir un título.
- Mantener líneas de lectura de aproximadamente 45–75 caracteres. Los títulos deben envolver de forma intencional; no reducirlos hasta perder carácter.
- En móvil, escalar los displays con `clamp()` o escalones equivalentes. `display-xl` es un techo para escritorio amplio, no un mínimo.
- Usar cifras legibles y alineación estable en precios, cantidades y seguimiento. No convertir información funcional en tratamiento editorial difícil de escanear.

## Layout

El contenedor actual `max-w-7xl` (80 rem), con laterales de `1.25rem` y `2rem` desde `lg`, es el marco general. No debe convertirse en la composición de todas las secciones. Alternar texto estrecho, fotografía a sangre, bloques desplazados y anchos intermedios.

### Ritmo y espaciado

- La escala base está en múltiplos de 4 px y los tokens YAML son la fuente de decisión.
- Separación vertical de sección actual: `5rem` móvil y `7rem` desde `md`; reducirla sólo cuando dos bloques formen una unidad narrativa.
- Usar `3rem`, `4rem` y `5rem` para cambios de capítulo; `0.5rem`–`1.5rem` para relaciones internas.
- No llenar todo el espacio disponible. El vacío debe permitir observar una fotografía y comprender un paso.
- Evitar una sucesión de secciones con idéntico título centrado, mismo ancho y misma cuadrícula.

### Composiciones preferidas

- texto–foto y foto–texto alternados;
- imagen completa con pie breve;
- cronología de proceso;
- comparación antes/después honesta;
- mosaico asimétrico de archivo;
- declaración tipográfica con una sola imagen;
- hoja de contactos o tira de película sutil;
- cambios deliberados entre densidad informativa y pausa visual.

### Responsive

Diseñar y comprobar, como mínimo, en 320, 375, 430, 768, 1024, 1440 y 1920 px. El proyecto usa `sm`, `md`, `lg` y `xl`; elegir el breakpoint por el punto donde el contenido falla, no por un dispositivo nominal.

En móvil, preservar orden de lectura, acción primaria, fotografías útiles y controles de al menos 44 × 44 px. Las composiciones asimétricas deben simplificarse, no encogerse. No debe existir desplazamiento horizontal; `overflow-x: hidden` no cuenta como solución.

## Elevation & Depth

La profundidad proviene primero de fotografía, superposición editorial, bordes y cambios de papel. Las sombras son funcionales:

- `shadow-sm` sólo para separar un control, una foto física o una superficie flotante real.
- Una sombra mayor se reserva para `CartDrawer`, diálogos o elementos sobre el plano de contenido.
- No apilar borde, sombra, fondo y gran radio en cada bloque.
- Evitar brillos, glassmorphism y sombras difusas de “producto premium”.
- En fondos oscuros, crear jerarquía con tipografía y espaciado, no con tarjetas flotantes.

## Shapes

El radio base implementado es `0.5rem`; la escala actual va de `0.25rem` a `1rem`. La forma normal de controles y superficies debe permanecer entre `rounded-sm` y `rounded-xl`.

- Botones principales: `rounded-md`, 44 px de alto como mínimo.
- Fotos y superficies editoriales: bordes rectos, `rounded-sm` o `rounded-lg` según contexto.
- Paneles funcionales: `rounded-lg` o `rounded-xl` como máximo.
- `rounded-full` sólo para un control compacto que verdaderamente sea una etiqueta, filtro o icono circular. No usarlo como estilo universal de CTA.
- Un marco fotográfico, perforación de película o placa de fecha puede romper la geometría regular si aporta significado.

## Components

Los componentes existentes son el punto de partida. Extenderlos antes de crear duplicados.

| Componente | Regla de diseño |
| --- | --- |
| `Header` | Navegación clara, logo con aire y una sola acción dominante. En móvil, menú fácil de cerrar, foco contenido y CTA no duplicado sin necesidad. |
| `Hero` | Una promesa concreta, una fotografía familiar dominante y uno o dos caminos claros. La placa de fecha puede actuar como firma de archivo; no añadir badges, métricas ni decoración flotante. |
| `CategoryGrid` | Debe evolucionar de cinco tarjetas equivalentes a una composición editorial con jerarquías de imagen y categoría. Mantener nombres y destinos claros. |
| `ProductCard` | Imagen, nombre, formato y precio orientativo cuando esté confirmado. Sin lista larga de atributos, badges promocionales o CTA repetido si toda la tarjeta es navegable. |
| `ProductGallery` | Priorizar detalle material, zoom y orden predecible. Las miniaturas deben mostrar selección con algo más que color. |
| `BeforeAfter` | Comparación accesible con rango, etiquetas y datos reales. Nunca usar la misma imagen como demostración final ni insinuar una restauración no realizada. |
| `Testimonials` | Sólo testimonios reales, autorizados y atribuibles al nivel permitido. Si no existen, retirar la sección; nunca inventar citas, nombres o avatares. |
| `FAQAccordion` | Preguntas concretas agrupadas por intención. Respuestas breves, estados accesibles y etiquetas en español de México. |
| `OrderTimeline` | Línea de tiempo calmada y lineal, con estado actual, fecha y siguiente paso. No presentarla como dashboard ni simular datos reales. |
| `PhotoQuantityConfigurator` | Divulgación progresiva: formato, cantidad, opciones y resumen. Precio y unidad deben actualizarse con explicación, no sorpresa. |
| `FilmConfigurator` | Primero identificar el formato con fotografía o guía visual; después duración/cantidad, opciones y resumen. Permitir “no sé qué formato tengo”. |
| `CartDrawer` | Resumen temporal y accionable; no sustituye la página de carrito. Mantener foco, escape, cierre visible y cantidades táctiles. |
| `FinalCTA` | Una conclusión breve, específica y de alto contraste. Evitar el panel oscuro genérico con texto centrado si no conecta con la narrativa previa. |

### Patrones por experiencia

- **Inicio:** Hero → categorías → proceso → por qué Mikuva → antes/después real → testimonios reales si existen → CTA final. Variar la composición entre pasos.
- **Servicios:** no presentar seis servicios como tarjetas idénticas. Usar mosaico editorial o capítulos alternos, con material de origen y resultado visible.
- **Tienda:** organizar por intención —qué quiere preservar la persona— antes que por SKU. Los filtros deben ser pocos y comprensibles.
- **Detalle de producto:** explicar qué se recibe, cómo preparar el material, opciones, precio, tiempo confirmado y cuidado; no esconder incertidumbre.
- **Configuradores:** son una interacción distintiva de Mikuva. Una decisión por paso, resumen persistente y posibilidad de corregir sin empezar de nuevo.
- **Seguimiento:** comunicar calma y siguiente acción mediante cronología; jamás convertirlo en tablero operativo.
- **Confianza:** proceso, custodia, privacidad, entregables y contacto sólo con afirmaciones verificadas. Usar `[INFORMACIÓN POR CONFIRMAR]` cuando falte evidencia.

## Do's and Don'ts

### Sí

- Usar fotografía auténtica de familias, impresiones, álbumes, negativos, diapositivas, película, equipo y proceso real.
- Dar protagonismo a recortes, escalas y secuencias fotográficas deliberadas.
- Escribir en español de México con tono claro, humano, conciso, confiable y práctico.
- Explicar qué ocurre con el material físico y digital en cada etapa.
- Reutilizar componentes y tokens existentes cuando expresen la intención correcta.
- Hacer que cada ruta tenga una composición o interacción propia y reconocible.
- Marcar información no verificada con `[INFORMACIÓN POR CONFIRMAR]`.

### No

- No usar fotografía corporativa, personas con laptop, equipos falsos, servidores genéricos ni “familias perfectas” de stock.
- No prometer cuidado, seguridad, tiempos, resultados o eliminación de archivos sin respaldo operativo.
- No usar filtros nostálgicos para fabricar emoción.
- No convertir servicios humanos en métricas, badges o jerga de plataforma.
- No crear un sistema visual paralelo ni migrar la arquitectura.

## Design tokens: implementation contract

El frontmatter de este archivo es el contrato objetivo. `src/styles.css` sigue siendo hoy la implementación técnica y sus variables semánticas deben conservar nombres compatibles con shadcn/Tailwind: `background`, `foreground`, `card`, `popover`, `primary`, `secondary`, `muted`, `accent`, `destructive`, `border`, `input`, `ring`, además de `ivory`, `sand`, `clay` e `ink`.

El logotipo histórico original verifica el rosa Mikuva `#EE2A7B`. `src/styles.css` lo implementa mediante `--brand-pink` y lo asigna a `primary`, `ring` y sus equivalentes de sidebar; `clay` permanece como color de apoyo. Revisar contraste en estados normal, hover, focus y disabled cada vez que cambie la combinación de superficie y texto.

- **Tipografía:** Fraunces 300/400/500 y Manrope 400/500/600/700 ya se cargan. El sistema sólo necesita los pesos documentados; no sumar familias.
- **Espaciado:** escala de 4 px; gutters actuales de 20 px en móvil y 32 px desde `lg`; secciones de 80/112 px.
- **Radios:** base de 8 px y escala técnica actual de 4, 6, 8, 12 y 16 px. El contrato restringe el uso, no exige eliminar capacidades.
- **Sombras:** pequeñas y funcionales; no existe todavía una escala nominal centralizada y debe auditarse antes de crearla.
- **Contenedor:** máximo general de 80 rem, con anchos de lectura más estrechos para texto. No usar 80 rem automáticamente.
- **Breakpoints:** Tailwind `sm`, `md`, `lg`, `xl`; probar también los anchos enumerados en Responsive.
- **Transiciones:** cambios de color/estado breves; paneles Radix actuales de 300–500 ms; `fade-up` actual de 700 ms con `cubic-bezier(0.22, 1, 0.36, 1)`. Añadir alternativa de movimiento reducido antes de ampliar animaciones.

## Photography and archive language

La fotografía debe mostrar la materia de las memorias: manos cuidadosas, papel, reversos escritos, álbumes, bordes, negativos a contraluz, diapositivas, carretes, escáneres y resultados digitales. Priorizar material real, autorizado y representativo de familias mexicanas diversas.

No asumir que los archivos actuales son fotografía documental del negocio: su procedencia, permisos y autenticidad están por confirmar. Mientras se verifica, tratarlos como activos provisionales y evitar afirmaciones que dependan de lo que muestran.

Los recursos de archivo permitidos son discretos: fecha, número de fotograma, pie de foto, hoja de contactos, perforación o secuencia. Como firma visual, Mikuva puede usar una **secuencia de archivo**: varias imágenes relacionadas, de tamaños distintos y con un único dato real de contexto. No repetir tiras de película en todas las rutas.

## Content and trust

El texto debe responder en este orden: qué se preserva, qué hará Mikuva, qué recibirá la persona, cuánto cuesta o cómo se calcula, cuánto tarda si está confirmado y qué necesita hacer después.

- Preferir “Digitalizamos tus fotografías y te entregamos…” a abstracciones como “transformamos recuerdos en eternidad”.
- Mantener frases cortas y vocabulario cotidiano de México.
- Usar **CONSERVAR / PROTEGER / COMPARTIR** como estructura editorial cuando sea útil, no como eslogan repetido.
- No inventar cantidades procesadas, porcentajes, garantías, testimonios, certificaciones, socios ni insignias de confianza.
- Las políticas de manejo, privacidad, respaldos, devolución y borrado deben venir de una fuente operativa aprobada. Si falta, escribir `[INFORMACIÓN POR CONFIRMAR]`.
- Errores y estados vacíos deben decir qué pasó y qué puede hacer la persona. Evitar culpa, humor o tecnicismos.

## Anti-AI / Anti-template design rules

Queda prohibido resolver Mikuva con:

- cuadrículas interminables de tres tarjetas;
- la repetición “título centrado + subtítulo + tres tarjetas”;
- bloques de icono circular, título y descripción repetidos;
- tarjetas redondeadas, pills y badges en exceso;
- estadísticas, testimonios, avatares o sellos de confianza falsos;
- gradientes morados, rosas o decorativos;
- glassmorphism, blobs o interfaz flotante sin función;
- dashboards de marketing o seguimiento;
- bento grids sin significado editorial;
- cuadrículas simétricas en todas las secciones;
- todas las secciones centradas y con el mismo ancho máximo;
- sombras excesivas;
- estética “premium” basada sólo en fondos oscuros;
- 3D decorativo;
- animación sin propósito;
- convertir cada problema de layout en una tarjeta.

Una composición humana alterna ritmo, escala y densidad. Debe permitir asimetría controlada, fotografía a sangre, recortes deliberados, espacios negativos, pausas y referencias de archivo. La interfaz se siente diseñada cuando la jerarquía responde al contenido, no cuando todos los módulos comparten el mismo molde.

## Accessibility, motion, and performance

- Cumplir WCAG 2.2 AA en contraste, foco, teclado, nombre accesible, estado y orden de lectura.
- Mantener `:focus-visible` claramente perceptible y no depender sólo de rosa.
- Controles táctiles: mínimo 44 × 44 px; aumentar áreas activas sin inflar visualmente todos los elementos.
- Imágenes informativas requieren `alt` útil; las decorativas deben usar `alt=""`. Pies de foto no sustituyen el texto alternativo.
- Los comparadores deben conservar control de rango por teclado y valor anunciado.
- Drawers, diálogos y menús deben gestionar foco, escape y retorno de foco.
- Respetar `prefers-reduced-motion`; desactivar desplazamiento suave y animaciones de entrada cuando se solicite.
- No animar por defecto grandes fotografías, desenfoque o parallax. Movimiento sólo para relación causa–efecto, orientación o progreso.
- Servir dimensiones y formatos de imagen adecuados, reservar espacio para evitar CLS y cargar diferidamente lo que queda fuera del primer viewport.
- No sacrificar legibilidad ni rendimiento por texturas, filtros o vídeo decorativo.

## Instructions for AI coding agents

1. Leer `AGENTS.md` completo y preservar íntegro el bloque Lovable.
2. Leer este `DESIGN.md` completo antes de cualquier cambio visual, UX, layout, tipografía, copy o componente.
3. Cargar `frontend-design` para decisiones visuales; `design-system` para tokens, patrones o componentes; `design-md` para actualizar o validar este archivo.
4. Inspeccionar la ruta y los componentes reales antes de proponer cambios.
5. Preservar TanStack Start, TanStack Router, React 19, TypeScript, Vite, Tailwind CSS v4, shadcn/ui y Bun. No migrar a Next.js.
6. Reutilizar componentes y tokens existentes cuando encajen; no crear un sistema paralelo.
7. Mantener el rosa Mikuva `#EE2A7B` como acento estratégico.
8. Priorizar fotografía y composición editorial sobre contenedores decorativos.
9. No uniformar secciones sólo para hacerlas parecer consistentes; conservar variedad con una jerarquía común.
10. No aplicar ninguno de los patrones prohibidos en Anti-AI / Anti-template design rules.
11. No inventar datos, precios finales, plazos, garantías, procesos, testimonios, políticas ni medios de contacto.
12. Marcar cualquier dato operativo sin fuente como `[INFORMACIÓN POR CONFIRMAR]`.
13. Escribir copy en español de México: humano, concreto, sobrio y útil.
14. Diseñar mobile-first y comprobar 320, 375, 430, 768, 1024, 1440 y 1920 px.
15. Mantener navegación por teclado, foco visible, contraste AA, nombres accesibles y objetivos táctiles de 44 × 44 px.
16. Respetar movimiento reducido y justificar toda animación por su función.
17. Optimizar fotografías sin alterar su significado ni crear nostalgia artificial.
18. Probar estados vacío, carga, error, disabled, hover, focus, selección y contenido largo.
19. Ejecutar typecheck, lint y build después de una implementación significativa y resolver regresiones propias.
20. Actualizar este archivo sólo cuando cambie una decisión sistémica verificada; documentar deuda en lugar de fingir consistencia.

### Implementation workflow

```text
Read AGENTS.md
↓
Read DESIGN.md
↓
Load relevant skills
↓
Audit route/component
↓
Identify reusable pieces
↓
Define hierarchy
↓
Implement
↓
Check responsive
↓
interaction
↓
accessibility
↓
typecheck
↓
lint
↓
build
```

## Current implementation notes

- Rutas presentes: inicio, servicios, tienda, producto, carrito, checkout, cómo funciona, FAQ, nosotros, contacto y seguimiento de pedido, además de estados raíz de error/404.
- El inicio ya combina Hero de dos columnas, categorías, proceso, bloque asimétrico, comparador, testimonios y CTA final. La base es útil, pero varias secciones siguen patrones de tarjeta repetidos.
- Los activos visuales usados por la interfaz se copiaron sin alterar desde el respaldo histórico del sitio y viven en `src/assets/historicas/`; el logotipo original vive en `src/assets/marca/`.
- `BeforeAfter` usa temporalmente la misma imagen en ambos lados y lo reconoce como placeholder.
- `Testimonials` usa `[TESTIMONIO REAL POR AGREGAR]`; debe permanecer ausente de una experiencia publicada hasta contar con material real.
- El catálogo contiene seis productos y precios de referencia. Confirmar precios, alcance y preparación antes de presentarlos como definitivos.
- Checkout, contacto, WhatsApp y seguimiento contienen funciones o datos simulados/pendientes; no tratarlos como procesos operativos terminados.
- Existen constantes para privacidad, términos, envíos y devoluciones, pero no rutas legales implementadas.

## Known design debt

1. **Radios y pills demasiado frecuentes.** CTA, filtros y superficies usan `rounded-full`, `rounded-xl` o `rounded-2xl` con mayor frecuencia que la dirección editorial prevista.
2. **Patrones repetidos.** `CategoryGrid`, testimonios y varias superficies comerciales dependen de tarjetas equivalentes; servicios es más editorial, pero conserva módulos repetidos.
3. **Contenido provisional.** Testimonios, antes/después, teléfono, correo, dirección, redes, precio, políticas, checkout y seguimiento incluyen placeholders o mocks.
4. **Afirmaciones operativas por validar.** Uso de guantes, manejo por una misma persona, borrado de copias de trabajo, orden/nombre de archivos y otros detalles deben confirmarse con operación.
5. **Fotografía histórica por clasificar.** Distinguir fotografía real, composición, render y stock dentro del respaldo; confirmar permisos, releases y correspondencia con el proceso real.
6. **Objetivos táctiles pequeños.** El botón base de 32/36/40 px y varios controles de cantidad quedan por debajo del objetivo de 44 px.
7. **Movimiento reducido incompleto.** Hay `scroll-behavior: smooth`, `fade-up` y transiciones de panel sin una regla global para `prefers-reduced-motion`.
8. **Sombras sin tokens nominales.** Se usan sombras utilitarias, pero no existe una escala documentada por función.
9. **Localización incompleta.** Algunos textos de primitivas, como “Close”, pueden exponerse en inglés a tecnologías de asistencia.
10. **Overflow oculto.** `body { overflow-x: hidden; }` puede ocultar problemas responsive en vez de resolverlos.
11. **Ausencia de rutas legales.** El pie menciona políticas sin destinos navegables ni contenido confirmado.

## Design acceptance checklist

- [ ] Se siente inequívocamente Mikuva.
- [ ] Preserva el rosa Mikuva.
- [ ] Da prioridad a la fotografía.
- [ ] No parece una interfaz generada por IA.
- [ ] Evita cuadrículas repetitivas de tarjetas.
- [ ] El copy se siente humano.
- [ ] La acción principal es clara.
- [ ] El servicio se entiende sin conocimiento previo.
- [ ] La experiencia inspira confianza para entregar material irreemplazable.
- [ ] La versión móvil se siente intencional.
- [ ] No existe overflow horizontal.
- [ ] El foco de teclado es visible.
- [ ] El contraste cumple AA.
- [ ] No hay afirmaciones, datos ni testimonios falsos.
- [ ] La arquitectura existente se preserva.
- [ ] Los tokens existentes se reutilizan o evolucionan deliberadamente.
- [ ] TypeScript pasa.
- [ ] Lint pasa.
- [ ] Build pasa.
