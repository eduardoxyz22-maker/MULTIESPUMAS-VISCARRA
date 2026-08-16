import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { ramp, TIPO } from "../design";
import { PlacaRemovible } from "../components/PlacaRemovible";
import { Rotulo, Titular } from "../components/Titular";
import { SAFE } from "../layout";
import { BrandTheme } from "../theme";

const ETIQUETAS = [
  { texto: "Se pone y se quita", delay: 168 },
  { texto: "Sin cirugía", delay: 176 },
  { texto: "Hecha a tu medida", delay: 184 },
];

export const Solucion: React.FC<{ theme: BrandTheme }> = ({ theme }) => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ ...SAFE, alignItems: "center", gap: 10 }}>
      <Rotulo texto="La solución" color={theme.accent} desde={2} centrado />

      <div style={{ marginTop: 18 }}>
        <Titular
          color={theme.text}
          desde={8}
          alineado="center"
          tam={90}
          lineas={["Placa dental", "removible"]}
        />
      </div>

      <PlacaRemovible theme={theme} delay={12} llamados />

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 14,
          marginTop: 34,
        }}
      >
        {ETIQUETAS.map(({ texto, delay }) => {
          const p = ramp(frame, delay, 26);
          return (
            <div
              key={texto}
              style={{
                padding: "15px 28px",
                borderRadius: 8,
                border: `2px solid ${theme.cardBorder}`,
                color: theme.text,
                ...TIPO.chip,
                whiteSpace: "nowrap",
                opacity: p,
                transform: `translateY(${(1 - p) * 26}px) scale(${interpolate(p, [0, 1], [0.94, 1])})`,
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
