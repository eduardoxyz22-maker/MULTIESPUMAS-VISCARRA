import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { enter, popIn } from "../anim";
import { TIPO } from "../design";
import { Rotulo, Titular } from "../components/Titular";
import { Fachada } from "../components/Fachada";
import { MapaPin } from "../components/MapaPin";
import { SAFE } from "../layout";
import { BrandTheme } from "../theme";

/** Dónde queda y cómo se ve: baja la fricción de "¿y dónde es?". */
export const Ubicacion: React.FC<{ theme: BrandTheme }> = ({ theme }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const chip = enter(frame, fps, 30);

  return (
    <AbsoluteFill style={{ ...SAFE, alignItems: "center", gap: 12 }}>
      <Rotulo texto="Cómo llegar" color={theme.accent} desde={2} centrado />

      <div style={{ marginTop: 14, marginBottom: 6 }}>
        <Titular
          color={theme.text}
          desde={8}
          alineado="center"
          tam={84}
          lineas={["Estamos acá"]}
        />
      </div>

      <div style={{ width: "100%" }}>
        <MapaPin theme={theme} delay={6} />
      </div>

      <div
        style={{
          ...popIn(chip, 0.8),
          padding: "16px 32px",
          borderRadius: 8,
          background: theme.card,
          border: `2px solid ${theme.cardBorder}`,
          color: theme.text,
          ...TIPO.chip,
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
