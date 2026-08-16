import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { enter, fadeUp, popIn } from "../anim";
import { PlacaRemovible } from "../components/PlacaRemovible";
import { SAFE } from "../layout";
import { BrandTheme } from "../theme";

const ETIQUETAS = [
  { texto: "Se pone y se quita", delay: 168 },
  { texto: "Sin cirugía", delay: 177 },
  { texto: "Hecha a tu medida", delay: 186 },
];

export const Solucion: React.FC<{ theme: BrandTheme }> = ({ theme }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const kicker = enter(frame, fps, 2);
  const titulo = enter(frame, fps, 10);

  return (
    <AbsoluteFill style={{ ...SAFE, alignItems: "center", gap: 8 }}>
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
          margin: "14px 0 0",
          textAlign: "center",
          color: theme.text,
          fontSize: 88,
          fontWeight: 800,
          lineHeight: 1.05,
          letterSpacing: -2,
        }}
      >
        Placa dental
        <br />
        removible
      </h2>

      <PlacaRemovible theme={theme} delay={12} llamados />

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 16,
        }}
      >
        {ETIQUETAS.map(({ texto, delay }) => {
          const p = enter(frame, fps, delay, 20);
          return (
            <div
              key={texto}
              style={{
                ...popIn(p, 0.7),
                padding: "16px 30px",
                borderRadius: 999,
                background: theme.card,
                border: `2px solid ${theme.cardBorder}`,
                color: theme.text,
                fontSize: 32,
                fontWeight: 600,
                whiteSpace: "nowrap",
              }}
            >
              {texto}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
