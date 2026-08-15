import { CSSProperties } from "react";

/** Margen lateral seguro del reel (evita el recorte de las UI de IG/TikTok). */
export const MARGEN = 92;

/**
 * Estilo base de la raíz de cada escena. El padding va aquí y no en el
 * wrapper: un `AbsoluteFill` hijo se ancla al borde del contenedor e
 * ignoraría el padding del padre.
 */
export const SAFE: CSSProperties = {
  padding: `210px ${MARGEN}px 190px`,
  justifyContent: "center",
};
