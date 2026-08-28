import type { Category, Product } from "@/types/catalog";

import fotografias from "@/assets/cat-fotografias.jpg";
import negativos from "@/assets/cat-negativos.jpg";
import diapositivas from "@/assets/cat-diapositivas.jpg";
import albumes from "@/assets/cat-albumes.jpg";
import ochoMm from "@/assets/cat-8mm.jpg";
import super8 from "@/assets/cat-super8.jpg";
import escaneo from "@/assets/proceso-escaneo.jpg";

/**
 * Mock data estructurado igual que el esquema previsto en base de datos
 * (categories / products / product_options). Sustituible por una consulta real
 * sin cambiar la interfaz de los componentes.
 */

export const CATEGORIES: Category[] = [
  {
    slug: "fotografias",
    name: "Fotografías",
    tagline: "Impresiones sueltas, retratos y fotos de estudio.",
    image: fotografias,
  },
  {
    slug: "negativos",
    name: "Negativos",
    tagline: "Tiras de 35mm y formatos medios.",
    image: negativos,
  },
  {
    slug: "diapositivas",
    name: "Diapositivas",
    tagline: "Transparencias montadas en cartón o plástico.",
    image: diapositivas,
  },
  {
    slug: "albumes",
    name: "Álbumes",
    tagline: "Álbumes completos, sin desmontar las fotos.",
    image: albumes,
  },
  {
    slug: "peliculas",
    name: "Películas",
    tagline: "Carretes caseros de 8mm y Super 8.",
    image: super8,
  },
];

export const CATEGORY_LABEL: Record<string, string> = Object.fromEntries(
  CATEGORIES.map((c) => [c.slug, c.name]),
);

const photoTiers = [
  { units: 100, price: 990, label: "Paquete 100" },
  { units: 500, price: 3990, label: "Paquete 500" },
  { units: 1000, price: 6990, label: "Paquete 1,000" },
  { units: 1500, price: 9490, label: "Paquete 1,500" },
  { units: 3000, price: 16900, label: "Paquete 3,000" },
  { units: 5000, price: 24900, label: "Paquete 5,000" },
];

const reelSizes = [
  { id: '3"', label: '3 pulgadas', feet: "≈ 50 pies", duration: "≈ 3 min", price: 390 },
  { id: '4"', label: '4 pulgadas', feet: "≈ 100 pies", duration: "≈ 6 min", price: 590 },
  { id: '5"', label: '5 pulgadas', feet: "≈ 200 pies", duration: "≈ 12 min", price: 890 },
  { id: '6"', label: '6 pulgadas', feet: "≈ 300 pies", duration: "≈ 18 min", price: 1190 },
  { id: '7"', label: '7 pulgadas', feet: "≈ 400 pies", duration: "≈ 24 min", price: 1490 },
  { id: '9"', label: '9 pulgadas', feet: "≈ 800 pies", duration: "≈ 48 min", price: 2290 },
];

const commonFaqs = [
  {
    question: "¿Cómo les hago llegar mi material?",
    answer:
      "Puedes entregarlo en persona o enviarlo por paquetería. Te compartimos una guía de empaque para que el material viaje protegido.",
  },
  {
    question: "¿Me devuelven los originales?",
    answer:
      "Siempre. Los originales regresan contigo en el mismo orden en que los recibimos, junto con tus archivos digitales.",
  },
  {
    question: "¿Cuánto tarda el proceso?",
    answer:
      "Depende del volumen y del estado del material. Al recibir tu pedido te confirmamos un tiempo estimado por escrito.",
  },
];

export const PRODUCTS: Product[] = [
  {
    id: "prd_fotografias",
    slug: "digitalizacion-de-fotografias",
    name: "Digitalización de fotografías",
    category: "fotografias",
    shortDescription: "Fotografías impresas escaneadas en alta resolución.",
    description:
      "Escaneamos tus fotografías impresas una por una, con limpieza previa y revisión de cada archivo. Conservamos el orden en el que nos entregas el material para que puedas reconocer cada etapa de tu historia.",
    image: fotografias,
    gallery: [fotografias, escaneo, albumes],
    priceFrom: 990,
    unitLabel: "fotografías",
    configurator: "quantity",
    tiers: photoTiers,
    includes: [
      "Escaneo individual en alta resolución",
      "Limpieza de polvo y ajuste básico de color",
      "Archivos JPG organizados por carpetas",
      "Devolución de originales en su orden",
    ],
    preparation: [
      "Separa las fotografías por grupos o épocas.",
      "Retira clips, grapas y notas adheridas.",
      "Evita pegar cinta adhesiva sobre la imagen.",
    ],
    faqs: commonFaqs,
    active: true,
  },
  {
    id: "prd_negativos",
    slug: "digitalizacion-de-negativos",
    name: "Digitalización de negativos",
    category: "negativos",
    shortDescription: "Tiras de negativos 35mm y formato medio.",
    description:
      "Digitalizamos tus negativos con equipo dedicado a película, recuperando detalle y color que muchas veces nunca se vio en papel.",
    image: negativos,
    gallery: [negativos, escaneo],
    priceFrom: 1290,
    unitLabel: "cuadros",
    configurator: "quantity",
    tiers: [
      { units: 100, price: 1290, label: "Paquete 100" },
      { units: 500, price: 4990, label: "Paquete 500" },
      { units: 1000, price: 8990, label: "Paquete 1,000" },
      { units: 3000, price: 21900, label: "Paquete 3,000" },
    ],
    includes: [
      "Escaneo dedicado de película",
      "Corrección de color e inversión",
      "Archivos JPG y opción TIFF",
      "Devolución de originales en fundas",
    ],
    preparation: [
      "Mantén las tiras en sus fundas originales.",
      "No cortes cuadro por cuadro.",
      "Evita tocar la superficie con los dedos.",
    ],
    faqs: commonFaqs,
    active: true,
  },
  {
    id: "prd_diapositivas",
    slug: "digitalizacion-de-diapositivas",
    name: "Digitalización de diapositivas",
    category: "diapositivas",
    shortDescription: "Transparencias montadas, listas para verse de nuevo.",
    description:
      "Recuperamos tus diapositivas cuadro por cuadro, incluso las que llevan décadas guardadas en cajas o carruseles.",
    image: diapositivas,
    gallery: [diapositivas, escaneo],
    priceFrom: 1190,
    unitLabel: "diapositivas",
    configurator: "quantity",
    tiers: [
      { units: 100, price: 1190, label: "Paquete 100" },
      { units: 500, price: 4590, label: "Paquete 500" },
      { units: 1000, price: 8290, label: "Paquete 1,000" },
      { units: 3000, price: 19900, label: "Paquete 3,000" },
    ],
    includes: [
      "Escaneo cuadro por cuadro",
      "Limpieza y ajuste de color",
      "Archivos JPG organizados",
      "Devolución de originales",
    ],
    preparation: [
      "Conserva el orden del carrusel o caja.",
      "Indica si hay marcos de vidrio.",
      "Señala las series que quieres priorizar.",
    ],
    faqs: commonFaqs,
    active: true,
  },
  {
    id: "prd_albumes",
    slug: "digitalizacion-de-albumes",
    name: "Digitalización de álbumes",
    category: "albumes",
    shortDescription: "Álbumes completos sin desmontar las fotografías.",
    description:
      "Digitalizamos álbumes completos respetando su encuadernación. Puedes elegir el escaneo página por página o foto por foto.",
    image: albumes,
    gallery: [albumes, escaneo],
    priceFrom: 1490,
    unitLabel: "páginas",
    configurator: "quantity",
    tiers: [
      { units: 50, price: 1490, label: "Paquete 50" },
      { units: 100, price: 2590, label: "Paquete 100" },
      { units: 300, price: 6790, label: "Paquete 300" },
      { units: 500, price: 9990, label: "Paquete 500" },
    ],
    includes: [
      "Escaneo de página completa",
      "Opción de recorte por fotografía",
      "Manejo sin desmontar el álbum",
      "Devolución en su empaque original",
    ],
    preparation: [
      "Marca con una nota las páginas prioritarias.",
      "No retires las fotos pegadas.",
      "Avísanos si el álbum está frágil o desprendido.",
    ],
    faqs: commonFaqs,
    active: true,
  },
  {
    id: "prd_8mm",
    slug: "digitalizacion-8mm",
    name: "Digitalización de película 8mm",
    category: "peliculas",
    shortDescription: "Carretes caseros de 8mm cuadro por cuadro.",
    description:
      "Transferimos tus carretes de 8mm cuadro por cuadro, sin proyectar la película sobre una pared. El resultado es un video estable y limpio.",
    image: ochoMm,
    gallery: [ochoMm, super8, escaneo],
    priceFrom: 390,
    unitLabel: "carretes",
    configurator: "film",
    filmTypes: ["8mm", "Super 8"],
    reels: reelSizes,
    includes: [
      "Transferencia cuadro por cuadro",
      "Limpieza previa del carrete",
      "Archivo MP4 por carrete",
      "Devolución de carretes originales",
    ],
    preparation: [
      "Revisa que el carrete no esté pegado o mohoso.",
      "Anota el tamaño aproximado de cada carrete.",
      "Empaca los carretes en su lata o caja.",
    ],
    faqs: commonFaqs,
    active: true,
  },
  {
    id: "prd_super8",
    slug: "digitalizacion-super-8",
    name: "Digitalización de Super 8",
    category: "peliculas",
    shortDescription: "Carretes Super 8 con transferencia digital estable.",
    description:
      "Tratamiento específico para Super 8, respetando la cadencia original de la película y con revisión de cada transferencia.",
    image: super8,
    gallery: [super8, ochoMm, escaneo],
    priceFrom: 390,
    unitLabel: "carretes",
    configurator: "film",
    filmTypes: ["Super 8", "8mm"],
    reels: reelSizes,
    includes: [
      "Transferencia cuadro por cuadro",
      "Ajuste de exposición",
      "Archivo MP4 por carrete",
      "Devolución de carretes originales",
    ],
    preparation: [
      "Identifica cada carrete con una etiqueta.",
      "No intentes rebobinar películas frágiles.",
      "Guarda los carretes en un lugar seco antes del envío.",
    ],
    faqs: commonFaqs,
    active: true,
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getRelatedProducts(slug: string, limit = 3): Product[] {
  return PRODUCTS.filter((p) => p.slug !== slug && p.active).slice(0, limit);
}

export const HOME_FAQS = [
  ...commonFaqs,
  {
    question: "¿En qué resolución entregan las fotografías?",
    answer:
      "Trabajamos en alta resolución, suficiente para reimprimir en tamaños mayores al original. La resolución exacta depende del formato del material.",
  },
  {
    question: "¿Cómo recibo mis archivos?",
    answer:
      "Puedes recibirlos en USB, disco duro o mediante una liga de descarga privada. También podemos organizarlos por carpetas y fechas.",
  },
  {
    question: "¿Qué pasa con mi privacidad?",
    answer:
      "Tu material es tuyo. No lo publicamos ni lo compartimos, y eliminamos las copias de trabajo después del periodo de resguardo acordado.",
  },
];
