import { AbsoluteFill, useCurrentFrame } from "remotion";
import { ramp } from "./design";
import { Background } from "./components/Background";
import { Corte } from "./components/Corte";
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

/** Firma discreta abajo, como en un aviso: no compite con el contenido. */
const Firma: React.FC<{ theme: BrandTheme }> = ({ theme }) => {
  const frame = useCurrentFrame();
  /** Se apaga en el cierre, donde la marca ya aparece en grande. */
  const visible = 1 - ramp(frame, TIMELINE.cta.from - 10, 20);

  return (
  <div
    style={{
      position: "absolute",
      bottom: 74,
      left: MARGEN,
      display: "flex",
      alignItems: "center",
      gap: 14,
      color: theme.muted,
      fontSize: 24,
      fontWeight: 600,
      letterSpacing: 4,
      textTransform: "uppercase",
      opacity: 0.75 * visible,
    }}
  >
    <span
      style={{
        width: 10,
        height: 10,
        borderRadius: 999,
        background: theme.accent,
      }}
    />
    {theme.clinica}
  </div>
  );
};

export const PlacasDentales: React.FC<PlacasDentalesProps> = ({
  theme = SPADENTAL,
}) => {
  return (
    <AbsoluteFill
      style={{
        fontFamily: FONT_STACK,
        fontFeatureSettings: '"ss01", "cv05", "tnum"',
        WebkitFontSmoothing: "antialiased",
      }}
    >
      <Background theme={theme} />

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

      <Firma theme={theme} />

      {/* Barridos solo en los dos cambios de capítulo */}
      <Corte en={TIMELINE.solucion.from + 6} theme={theme} />
      <Corte en={TIMELINE.cta.from + 6} theme={theme} />
    </AbsoluteFill>
  );
};
