import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { Background } from "./components/Background";
import { Scene } from "./components/Scene";
import { Beneficios } from "./scenes/Beneficios";
import { Cta } from "./scenes/Cta";
import { Hook } from "./scenes/Hook";
import { Sintomas } from "./scenes/Sintomas";
import { Solucion } from "./scenes/Solucion";
import { MARGEN } from "./layout";
import { BrandTheme, FONT_STACK, SPADENTAL } from "./theme";

/**
 * Guion del reel (30 fps). Cada escena se solapa ~10 frames con la
 * siguiente para que el fade encadene sin negros intermedios.
 */
export const TIMELINE = {
  hook: { from: 0, durationInFrames: 106 },
  sintomas: { from: 96, durationInFrames: 166 },
  solucion: { from: 252, durationInFrames: 176 },
  beneficios: { from: 418, durationInFrames: 188 },
  cta: { from: 596, durationInFrames: 184 },
} as const;

export const DURACION_TOTAL = 780; // 26 s

export type PlacasDentalesProps = {
  theme: BrandTheme;
};

const Marca: React.FC<{ theme: BrandTheme }> = ({ theme }) => (
  <div
    style={{
      position: "absolute",
      top: 68,
      left: MARGEN,
      display: "flex",
      alignItems: "center",
      gap: 16,
      color: theme.muted,
      fontSize: 28,
      fontWeight: 600,
      letterSpacing: 3,
      textTransform: "uppercase",
    }}
  >
    <span
      style={{
        width: 40,
        height: 6,
        borderRadius: 999,
        background: theme.accent,
      }}
    />
    {theme.clinica}
  </div>
);

const Progreso: React.FC<{ theme: BrandTheme }> = ({ theme }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const p = Math.min(1, frame / (durationInFrames - 1));

  return (
    <div
      style={{
        position: "absolute",
        left: MARGEN,
        right: MARGEN,
        bottom: 68,
        height: 8,
        borderRadius: 999,
        background: "rgba(255,255,255,0.12)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: `${p * 100}%`,
          height: "100%",
          borderRadius: 999,
          background: theme.accent,
        }}
      />
    </div>
  );
};

export const PlacasDentales: React.FC<PlacasDentalesProps> = ({
  theme = SPADENTAL,
}) => {
  return (
    <AbsoluteFill style={{ fontFamily: FONT_STACK }}>
      <Background theme={theme} />

      <Scene {...TIMELINE.hook}>
        <Hook theme={theme} />
      </Scene>
      <Scene {...TIMELINE.sintomas}>
        <Sintomas theme={theme} />
      </Scene>
      <Scene {...TIMELINE.solucion}>
        <Solucion theme={theme} />
      </Scene>
      <Scene {...TIMELINE.beneficios}>
        <Beneficios theme={theme} />
      </Scene>
      <Scene {...TIMELINE.cta}>
        <Cta theme={theme} />
      </Scene>

      <Marca theme={theme} />
      <Progreso theme={theme} />
    </AbsoluteFill>
  );
};
