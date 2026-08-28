export type CategorySlug =
  | "fotografias"
  | "negativos"
  | "diapositivas"
  | "albumes"
  | "peliculas";

export interface Category {
  slug: CategorySlug;
  name: string;
  tagline: string;
  image: string;
}

export type ConfiguratorType = "quantity" | "film" | "simple";

/** Paquete por volumen (fotografías, negativos, diapositivas). */
export interface VolumeTier {
  units: number;
  price: number;
  label: string;
}

/** Carrete de película 8mm / Super 8. */
export interface ReelSize {
  id: string;
  label: string;
  feet: string;
  duration: string;
  price: number;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: CategorySlug;
  shortDescription: string;
  description: string;
  image: string;
  gallery: string[];
  priceFrom: number;
  unitLabel: string;
  configurator: ConfiguratorType;
  tiers?: VolumeTier[];
  reels?: ReelSize[];
  filmTypes?: string[];
  includes: string[];
  preparation: string[];
  faqs: FaqItem[];
  active: boolean;
}

export interface CartItemConfig {
  summary: string;
  quantity?: number;
  tierLabel?: string;
  filmType?: string;
  reelLabel?: string;
}

export interface CartItem {
  id: string;
  productSlug: string;
  name: string;
  image: string;
  unitPrice: number;
  quantity: number;
  config: CartItemConfig;
}

export type OrderStatus =
  | "recibido"
  | "esperando_material"
  | "material_recibido"
  | "digitalizacion"
  | "control_calidad"
  | "preparando_entrega"
  | "enviado"
  | "entregado"
  | "cancelado";
