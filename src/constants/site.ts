export const SITE = {
  name: "Mikuva",
  tagline: "Preservación y digitalización de recuerdos familiares",
  description:
    "Digitalizamos fotografías, negativos, diapositivas, álbumes y películas 8mm y Super 8 para conservar tus historias por generaciones.",
  /* Datos por confirmar con el cliente */
  whatsapp: "[WHATSAPP_NUMBER]",
  email: "[EMAIL]",
  phone: "[TELÉFONO]",
  address: "[DIRECCIÓN]",
  social: {
    instagram: "[INSTAGRAM]",
    facebook: "[FACEBOOK]",
  },
} as const;

export const MAIN_NAV = [
  { label: "Inicio", to: "/" },
  { label: "Servicios", to: "/servicios" },
  { label: "Tienda", to: "/tienda" },
  { label: "Cómo funciona", to: "/como-funciona" },
  { label: "Preguntas frecuentes", to: "/faq" },
  { label: "Nosotros", to: "/nosotros" },
  { label: "Contacto", to: "/contacto" },
] as const;

export const LEGAL_NAV = [
  { label: "Aviso de privacidad", to: "/aviso-de-privacidad" },
  { label: "Términos y condiciones", to: "/terminos" },
  { label: "Política de envíos", to: "/envios" },
  { label: "Política de devolución", to: "/devoluciones" },
] as const;

export const PRICING_NOTE =
  "Precios de referencia [POR CONFIRMAR]. El cotizador final se ajusta al material recibido.";
