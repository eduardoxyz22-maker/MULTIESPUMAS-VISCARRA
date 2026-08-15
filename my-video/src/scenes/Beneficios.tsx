import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { enter, fadeUp, popIn, pulse } from "../anim";
import { IconEscudo, IconManzana, IconSonrisa } from "../components/Icons";
import { SAFE } from "../layout";
import { BrandTheme } from "../theme";

const BENEFICIOS = [
  {
    Icon: IconManzana,
    titulo: "Vuelves a masticar",
    texto: "Con los dos lados, sin miedo a la comida dura.",
  },
  {
    Icon: IconSonrisa,
    titulo: "Recuperas tu sonrisa",
    texto: "Dientes del color que elijas, se ven naturales.",
  },
  {
    Icon: IconEscudo,
    titulo: "Cuidas lo que te queda",
    texto: "Frena que los demás dientes se sigan moviendo.",
  },
];

export const Beneficios: React.FC<{ theme: BrandTheme }> = ({ theme }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titulo = enter(frame, fps, 4);
  const nota = enter(frame, fps, 62);
  const late = pulse(frame, fps, 1.8);

  return (
    <AbsoluteFill style={{ ...SAFE, gap: 40 }}>
      <h2
        style={{
          ...fadeUp(titulo),
          margin: 0,
          color: theme.text,
          fontSize: 76,
          fontWeight: 800,
          letterSpacing: -1.6,
        }}
      >
        Lo que ganas
        <span style={{ color: theme.accent }}>.</span>
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
        {BENEFICIOS.map(({ Icon, titulo: t, texto }, i) => {
          const p = enter(frame, fps, 16 + i * 14);
          const flota = pulse(frame, fps, 2.4 + i * 0.4);
          return (
            <div
              key={t}
              style={{
                ...popIn(p, 0.92),
                display: "flex",
                gap: 30,
                padding: "36px 36px",
                borderRadius: 34,
                background: theme.card,
                border: `2px solid ${theme.cardBorder}`,
              }}
            >
              <div
                style={{
                  flexShrink: 0,
                  width: 92,
                  height: 92,
                  borderRadius: 26,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: theme.accent,
                  transform: `translateY(${(flota - 0.5) * 10}px)`,
                }}
              >
                <Icon size={50} color={theme.accentInk} />
              </div>
              <div>
                <div
                  style={{
                    color: theme.text,
                    fontSize: 46,
                    fontWeight: 700,
                    letterSpacing: -0.8,
                  }}
                >
                  {t}
                </div>
                <div
                  style={{
                    marginTop: 8,
                    color: theme.muted,
                    fontSize: 34,
                    lineHeight: 1.3,
                  }}
                >
                  {texto}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div
        style={{
          ...fadeUp(nota, 26),
          alignSelf: "center",
          padding: "18px 34px",
          borderRadius: 999,
          border: `2px dashed ${theme.cardBorder}`,
          color: theme.muted,
          fontSize: 31,
          fontWeight: 600,
          whiteSpace: "nowrap",
          transform: `${fadeUp(nota, 26).transform} scale(${1 + late * 0.02})`,
        }}
      >
        Desde 1 pieza hasta la arcada completa
      </div>
    </AbsoluteFill>
  );
};
