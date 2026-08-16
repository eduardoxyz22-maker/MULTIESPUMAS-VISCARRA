import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { enter, fadeUp, popIn } from "../anim";
import { Fachada } from "../components/Fachada";
import { MapaPin } from "../components/MapaPin";
import { SAFE } from "../layout";
import { BrandTheme } from "../theme";

/** Dónde queda y cómo se ve: baja la fricción de "¿y dónde es?". */
export const Ubicacion: React.FC<{ theme: BrandTheme }> = ({ theme }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const kicker = enter(frame, fps, 2);
  const titulo = enter(frame, fps, 8);
  const chip = enter(frame, fps, 30);

  return (
    <AbsoluteFill style={{ ...SAFE, alignItems: "center", gap: 12 }}>
      <div
        style={{
          ...popIn(kicker),
          color: theme.accent,
          fontSize: 32,
          fontWeight: 700,
          letterSpacing: 4,
          textTransform: "uppercase",
        }}
      >
        Cómo llegar
      </div>

      <h2
        style={{
          ...fadeUp(titulo),
          margin: "8px 0 4px",
          textAlign: "center",
          color: theme.text,
          fontSize: 84,
          fontWeight: 800,
          lineHeight: 1.04,
          letterSpacing: -2,
        }}
      >
        Estamos acá
        <span style={{ color: theme.accent }}>.</span>
      </h2>

      <div style={{ width: "100%" }}>
        <MapaPin theme={theme} delay={6} />
      </div>

      <div
        style={{
          ...popIn(chip, 0.8),
          padding: "16px 32px",
          borderRadius: 999,
          background: theme.card,
          border: `2px solid ${theme.cardBorder}`,
          color: theme.text,
          fontSize: 32,
          fontWeight: 700,
          whiteSpace: "nowrap",
          textAlign: "center",
        }}
      >
        {theme.referencia}
      </div>

      <div style={{ width: "100%", marginTop: 4 }}>
        <Fachada theme={theme} delay={26} />
      </div>
    </AbsoluteFill>
  );
};
