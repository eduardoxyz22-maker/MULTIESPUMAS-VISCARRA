import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { ramp, TIPO } from "../design";
import { SonrisaHueco } from "../components/SonrisaHueco";
import { Rotulo, Titular } from "../components/Titular";
import { SAFE } from "../layout";
import { BrandTheme } from "../theme";

const GANANCIAS = [
  { texto: "Vuelves a masticar", delay: 62 },
  { texto: "Sonríes sin taparte", delay: 70 },
  { texto: "Sin cirugía", delay: 78 },
];

/** El pago emocional del reel: el hueco se llena y la sonrisa se completa. */
export const AntesDespues: React.FC<{ theme: BrandTheme }> = ({ theme }) => {
  const frame = useCurrentFrame();

  /** La etiqueta cambia justo cuando la pieza nueva calza. */
  const cambio = ramp(frame, 40, 14);

  return (
    <AbsoluteFill style={{ ...SAFE, alignItems: "center", gap: 16 }}>
      <Rotulo texto="Antes · Después" color={theme.accent} desde={2} centrado />

      <div style={{ marginTop: 16, marginBottom: 10 }}>
        <Titular
          color={theme.text}
          desde={8}
          alineado="center"
          tam={82}
          lineas={["Tu sonrisa", "completa otra vez"]}
        />
      </div>

      <div style={{ position: "relative" }}>
        <SonrisaHueco theme={theme} modo="repara" delay={10} />

        <div
          style={{
            position: "absolute",
            top: 196,
            left: "50%",
            transform: "translateX(-50%)",
            display: "grid",
          }}
        >
          {[
            { texto: "ANTES", op: 1 - cambio, color: theme.muted },
            { texto: "DESPUÉS", op: cambio, color: theme.accent },
          ].map(({ texto, op, color }) => (
            <span
              key={texto}
              style={{
                gridArea: "1 / 1",
                opacity: op,
                padding: "12px 26px",
                borderRadius: 6,
                border: `2px solid ${color}`,
                color,
                fontSize: 26,
                fontWeight: 800,
                letterSpacing: 4,
                whiteSpace: "nowrap",
                transform: `translateY(${(1 - op) * 12}px)`,
              }}
            >
              {texto}
            </span>
          ))}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 14,
          marginTop: 22,
        }}
      >
        {GANANCIAS.map(({ texto, delay }) => {
          const p = ramp(frame, delay, 26);
          return (
            <div
              key={texto}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "15px 26px",
                borderRadius: 8,
                background: theme.card,
                border: `2px solid ${theme.cardBorder}`,
                color: theme.text,
                ...TIPO.chip,
                whiteSpace: "nowrap",
                opacity: p,
                transform: `translateY(${(1 - p) * 26}px) scale(${interpolate(p, [0, 1], [0.94, 1])})`,
              }}
            >
              <svg width={22} height={22} viewBox="0 0 24 24" fill="none">
                <path
                  d="m5 12.5 4.5 4.5L19 7.5"
                  stroke={theme.accent}
                  strokeWidth={3}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {texto}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
