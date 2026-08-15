import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { enter, fadeUp, popIn } from "../anim";
import { ToothGuard } from "../components/ToothGuard";
import { SAFE } from "../layout";
import { BrandTheme } from "../theme";

export const Solucion: React.FC<{ theme: BrandTheme }> = ({ theme }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const kicker = enter(frame, fps, 2);
  const titulo = enter(frame, fps, 10);
  const pie = enter(frame, fps, 54);

  return (
    <AbsoluteFill style={{ ...SAFE, alignItems: "center" }}>
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
        La solución
      </div>

      <h2
        style={{
          ...fadeUp(titulo),
          margin: "18px 0 0",
          textAlign: "center",
          color: theme.text,
          fontSize: 90,
          fontWeight: 800,
          lineHeight: 1.05,
          letterSpacing: -2,
        }}
      >
        Placa dental
        <br />
        de descarga
      </h2>

      <ToothGuard theme={theme} delay={14} />

      <p
        style={{
          ...fadeUp(pie, 30),
          margin: 0,
          textAlign: "center",
          color: theme.muted,
          fontSize: 40,
          lineHeight: 1.35,
          maxWidth: 820,
        }}
      >
        Un protector hecho <strong style={{ color: theme.text }}>a tu medida</strong>{" "}
        que absorbe la fuerza de la mordida mientras duermes.
      </p>
    </AbsoluteFill>
  );
};
