import { AbsoluteFill, interpolate } from "remotion";
import { useCurrentFrame } from "remotion";
import { SUAVE } from "../design";
import { BrandTheme } from "../theme";

const LARGO = 22;

/**
 * Barrido de color sobre un corte. Se usa solo en los dos cambios que marcan
 * capítulo (entrada al producto y entrada al cierre): si se pone en todos los
 * cortes, cansa.
 */
export const Corte: React.FC<{ en: number; theme: BrandTheme }> = ({
  en,
  theme,
}) => {
  const frame = useCurrentFrame();
  const inicio = en - LARGO / 2;

  if (frame < inicio || frame > inicio + LARGO) return null;

  const p = interpolate(frame, [inicio, inicio + LARGO], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: SUAVE,
  });

  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <AbsoluteFill
        style={{
          background: theme.accent,
          transform: `translateX(${interpolate(p, [0, 1], [-118, 118])}%) skewX(-9deg) scale(1.3)`,
        }}
      />
      <AbsoluteFill
        style={{
          background: theme.bgFrom,
          transform: `translateX(${interpolate(p, [0, 1], [-140, 140])}%) skewX(-9deg) scale(1.3)`,
        }}
      />
    </AbsoluteFill>
  );
};
