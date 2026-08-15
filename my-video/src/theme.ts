/**
 * Marcas disponibles para el video de placas dentales.
 *
 * OJO: `whatsapp` y `direccion` son PLACEHOLDER — reemplazar con los datos
 * reales de cada clínica antes de publicar el reel.
 */

export type BrandTheme = {
  id: string;
  clinica: string;
  lema: string;
  /** Fondo: degradado principal */
  bgFrom: string;
  bgTo: string;
  /** Manchas de luz del fondo */
  glowA: string;
  glowB: string;
  /** Color de marca */
  accent: string;
  /** Texto que va encima del color de marca */
  accentInk: string;
  text: string;
  muted: string;
  card: string;
  cardBorder: string;
  whatsapp: string;
  direccion: string;
};

export const SPADENTAL: BrandTheme = {
  id: "spadental",
  clinica: "Ezequiel Spadental",
  lema: "Odontología honesta · Mercado Mutualista",
  bgFrom: "#06130B",
  bgTo: "#0D2416",
  glowA: "rgba(182, 240, 46, 0.22)",
  glowB: "rgba(46, 200, 130, 0.18)",
  accent: "#B6F02E",
  accentInk: "#0A1A03",
  text: "#F4FBEC",
  muted: "rgba(244, 251, 236, 0.66)",
  card: "rgba(255, 255, 255, 0.05)",
  cardBorder: "rgba(182, 240, 46, 0.24)",
  whatsapp: "+591 700 00000",
  direccion: "Mercado Mutualista · 3er anillo, Santa Cruz",
};

export const COSMETIC: BrandTheme = {
  id: "cosmetic",
  clinica: "Cosmetic Dental & Face Center",
  lema: "Diseño de sonrisa · Equipetrol Norte",
  bgFrom: "#08080A",
  bgTo: "#1A1418",
  glowA: "rgba(217, 180, 91, 0.22)",
  glowB: "rgba(160, 120, 200, 0.14)",
  accent: "#D9B45B",
  accentInk: "#1A1206",
  text: "#F7F2E8",
  muted: "rgba(247, 242, 232, 0.62)",
  card: "rgba(255, 255, 255, 0.05)",
  cardBorder: "rgba(217, 180, 91, 0.26)",
  whatsapp: "+591 700 00000",
  direccion: "Equipetrol Norte, Santa Cruz",
};

export const FONT_STACK =
  '"Inter", "Segoe UI", system-ui, -apple-system, "Helvetica Neue", Arial, sans-serif';
