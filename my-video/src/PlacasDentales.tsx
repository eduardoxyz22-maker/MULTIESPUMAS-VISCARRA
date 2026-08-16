import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { Background } from "./components/Background";
import { Particulas } from "./components/Particulas";
import { Scene } from "./components/Scene";
import { AntesDespues } from "./scenes/AntesDespues";
import { Cta } from "./scenes/Cta";
import { Hook } from "./scenes/Hook";
import { Proceso } from "./scenes/Proceso";
import { Senales } from "./scenes/Senales";
import { Solucion } from "./scenes/Solucion";
import { Ubicacion } from "./scenes/Ubicacion";
import { MARGEN } from "./layout";
import { BrandTheme, FONT_STACK, SPADENTAL } from "./theme";

/**
 * Guion del reel (30 fps). Cada escena se solapa ~10 frames con la
 * siguiente: la que sale se desplaza mientras la que entra ya está llegando.
 */
export const TIMELINE = {
  hook: { from: 0, durationInFrames: 116 },
  senales: { from: 106, durationInFrames: 136 },
  solucion: { from: 232, durationInFrames: 260 },
  antesDespues: { from: 482, durationInFrames: 172 },
  proceso: { from: 644, durationInFrames: 156 },
  ubicacion: { from: 790, durationInFrames: 186 },
  cta: { from: 966, durationInFrames: 170 },
} as const;

export const DURACION_TOTAL = 1136; // 38 s

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
      <Particulas theme={theme} />

      <Scene {...TIMELINE.hook} dir="arriba">
        <Hook theme={theme} />
      </Scene>
      <Scene {...TIMELINE.senales} dir="izquierda">
        <Senales theme={theme} />
      </Scene>
      <Scene {...TIMELINE.solucion} dir="arriba">
        <Solucion theme={theme} />
      </Scene>
      <Scene {...TIMELINE.antesDespues} dir="derecha">
        <AntesDespues theme={theme} />
      </Scene>
      <Scene {...TIMELINE.proceso} dir="izquierda">
        <Proceso theme={theme} />
      </Scene>
      <Scene {...TIMELINE.ubicacion} dir="derecha">
        <Ubicacion theme={theme} />
      </Scene>
      <Scene {...TIMELINE.cta} dir="arriba">
        <Cta theme={theme} />
      </Scene>

      <Marca theme={theme} />
      <Progreso theme={theme} />
    </AbsoluteFill>
  );
};
