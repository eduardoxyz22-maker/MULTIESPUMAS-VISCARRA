import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { BrandTheme } from "../theme";

/**
 * Fondo continuo del reel: degradado + dos manchas de luz que se mueven
 * lentamente + grano sutil. Vive fuera de las escenas para que los cortes
 * no se sientan bruscos.
 */
export const Background: React.FC<{ theme: BrandTheme }> = ({ theme }) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const t = frame / fps;

  const ax = width * 0.28 + Math.sin(t * 0.32) * width * 0.16;
  const ay = height * 0.24 + Math.cos(t * 0.24) * height * 0.08;
  const bx = width * 0.74 + Math.cos(t * 0.21) * width * 0.14;
  const by = height * 0.74 + Math.sin(t * 0.28) * height * 0.09;

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(160deg, ${theme.bgFrom} 0%, ${theme.bgTo} 100%)`,
      }}
    >
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at ${ax}px ${ay}px, ${theme.glowA} 0%, transparent 46%),
                       radial-gradient(circle at ${bx}px ${by}px, ${theme.glowB} 0%, transparent 44%)`,
          filter: "blur(2px)",
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(0,0,0,0.55) 100%)",
        }}
      />
    </AbsoluteFill>
  );
};
