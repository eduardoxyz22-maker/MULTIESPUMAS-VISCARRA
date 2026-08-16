import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { enter, fadeUp, popIn } from "../anim";
import { SonrisaHueco } from "../components/SonrisaHueco";
import { SAFE } from "../layout";
import { BrandTheme } from "../theme";

const GANANCIAS = [
  { texto: "Vuelves a masticar", delay: 62 },
  { texto: "Sonríes sin taparte", delay: 72 },
  { texto: "Sin cirugía", delay: 82 },
];

/** El pago emocional del reel: el hueco se llena y la sonrisa se completa. */
export const AntesDespues: React.FC<{ theme: BrandTheme }> = ({ theme }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const kicker = enter(frame, fps, 2);
  const titulo = enter(frame, fps, 8);
  /** La etiqueta cambia justo cuando la pieza nueva calza. */
  const cambio = interpolate(frame, [40, 52], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ ...SAFE, alignItems: "center", gap: 18 }}>
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
        Antes · Después
      </div>

      <h2
        style={{
          ...fadeUp(titulo),
          margin: "10px 0 20px",
          textAlign: "center",
          color: theme.text,
          fontSize: 80,
          fontWeight: 800,
          lineHeight: 1.04,
          letterSpacing: -2,
        }}
      >
        Tu sonrisa
        <br />
        completa otra vez
      </h2>

      <div style={{ position: "relative" }}>
        <SonrisaHueco theme={theme} modo="repara" delay={10} />

        {/* Etiqueta que pasa de ANTES a DESPUÉS */}
        <div
          style={{
            position: "absolute",
            top: 178,
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
                padding: "12px 28px",
                borderRadius: 999,
                border: `2px solid ${color}`,
                color,
                fontSize: 28,
                fontWeight: 800,
                letterSpacing: 3,
                whiteSpace: "nowrap",
                transform: `scale(${0.9 + op * 0.1})`,
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
          gap: 16,
          marginTop: 16,
        }}
      >
        {GANANCIAS.map(({ texto, delay }) => {
          const p = enter(frame, fps, delay, 20);
          return (
            <div
              key={texto}
              style={{
                ...popIn(p, 0.7),
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "16px 28px",
                borderRadius: 999,
                background: theme.card,
                border: `2px solid ${theme.cardBorder}`,
                color: theme.text,
                fontSize: 32,
                fontWeight: 600,
                whiteSpace: "nowrap",
              }}
            >
              <span style={{ color: theme.accent, fontSize: 30 }}>✓</span>
              {texto}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
