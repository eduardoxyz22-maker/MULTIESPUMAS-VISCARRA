import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { BrandTheme } from "../theme";

/**
 * Grano de película, generado con `feTurbulence` dentro de un data URI.
 * Chrome lo rasteriza una vez y después solo movemos el fondo, así que sale
 * barato aunque se dibuje en los 1080×1920 de cada frame.
 */
const GRANO =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='220' height='220' filter='url(%23g)'/%3E%3C/svg%3E\")";

/** Saltos pseudoaleatorios pero deterministas para que el grano no "flote". */
const salto = (frame: number, semilla: number) => {
  const v = Math.sin(frame * 12.9898 + semilla * 78.233) * 43758.5453;
  return Math.floor((v - Math.floor(v)) * 220);
};

/**
 * Fondo cinematográfico: degradado profundo, dos fugas de luz que se mueven,
 * viñeta y grano. Vive fuera de las escenas para que los cortes no rompan la
 * continuidad de la imagen.
 */
export const Background: React.FC<{ theme: BrandTheme }> = ({ theme }) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const t = frame / fps;

  const ax = width * 0.3 + Math.sin(t * 0.22) * width * 0.2;
  const ay = height * 0.2 + Math.cos(t * 0.17) * height * 0.07;
  const bx = width * 0.76 + Math.cos(t * 0.15) * width * 0.16;
  const by = height * 0.78 + Math.sin(t * 0.2) * height * 0.08;

  return (
    <AbsoluteFill>
      {/* Base */}
      <AbsoluteFill
        style={{
          background: `linear-gradient(157deg, ${theme.bgFrom} 0%, ${theme.bgTo} 58%, ${theme.bgFrom} 100%)`,
        }}
      />

      {/* Fugas de luz */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(60% 40% at ${ax}px ${ay}px, ${theme.glowA} 0%, transparent 70%),
                       radial-gradient(55% 38% at ${bx}px ${by}px, ${theme.glowB} 0%, transparent 72%)`,
          mixBlendMode: "screen",
        }}
      />

      {/* Foco central: da profundidad y separa el contenido del fondo */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(46% 30% at 50% 46%, rgba(255,255,255,0.07) 0%, transparent 70%)`,
        }}
      />

      {/* Viñeta */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(72% 55% at 50% 48%, transparent 42%, rgba(0,0,0,0.72) 100%)",
        }}
      />

      {/* Grano */}
      <AbsoluteFill
        style={{
          backgroundImage: GRANO,
          backgroundPosition: `${salto(frame, 1)}px ${salto(frame, 2)}px`,
          mixBlendMode: "overlay",
          opacity: 0.15,
        }}
      />
    </AbsoluteFill>
  );
};
