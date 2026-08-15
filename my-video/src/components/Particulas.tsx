import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { BrandTheme } from "../theme";

const N = 22;

/** Pseudo-aleatorio determinista (Math.random rompería el render por frames). */
const rnd = (i: number, semilla: number) => {
  const v = Math.sin((i + 1) * 12.9898 + semilla * 78.233) * 43758.5453;
  return v - Math.floor(v);
};

/** Puntos de luz que suben en loop. Dan movimiento incluso en escenas de texto. */
export const Particulas: React.FC<{ theme: BrandTheme }> = ({ theme }) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const t = frame / fps;

  return (
    <AbsoluteFill>
      {Array.from({ length: N }, (_, i) => {
        const x = rnd(i, 1) * width;
        const tam = 5 + rnd(i, 2) * 13;
        const vel = 26 + rnd(i, 3) * 58;
        const y = (height + 120 - ((t * vel + rnd(i, 4) * height) % (height + 240))) - 60;
        const deriva = Math.sin(t * (0.3 + rnd(i, 5) * 0.5) + i) * 26;
        const op = 0.1 + rnd(i, 6) * 0.28;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x + deriva,
              top: y,
              width: tam,
              height: tam,
              borderRadius: 999,
              background: theme.accent,
              opacity: op,
              filter: "blur(1px)",
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
