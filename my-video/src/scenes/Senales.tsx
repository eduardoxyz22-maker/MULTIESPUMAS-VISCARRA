import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { ramp, TIPO } from "../design";
import { IconManzana, IconMover, IconSonrisa } from "../components/Icons";
import { Rotulo, Titular } from "../components/Titular";
import { SAFE } from "../layout";
import { BrandTheme } from "../theme";

const SENALES = [
  { Icon: IconManzana, texto: "Masticas de un solo lado" },
  { Icon: IconSonrisa, texto: "Evitas sonreír en las fotos" },
  { Icon: IconMover, texto: "Los dientes vecinos se mueven" },
];

export const Senales: React.FC<{ theme: BrandTheme }> = ({ theme }) => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ ...SAFE, gap: 52 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
        <Rotulo texto="Lo que cuesta" color={theme.accent} desde={2} />
        <Titular
          color={theme.text}
          desde={8}
          lineas={[
            "Vivir con",
            "espacios",
            <span key="c" style={{ color: theme.accent }}>
              te cuesta más
            </span>,
          ]}
        />
      </div>

      {/* Filas con filete, en vez de tarjetas: se lee editorial, no plantilla */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        {SENALES.map(({ Icon, texto }, i) => {
          const p = ramp(frame, 26 + i * 8, 30);
          return (
            <div
              key={texto}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 30,
                padding: "34px 4px",
                borderTop: `2px solid ${theme.cardBorder}`,
                opacity: p,
                transform: `translateX(${(1 - p) * 46}px)`,
              }}
            >
              <span
                style={{
                  ...TIPO.rotulo,
                  fontSize: 26,
                  color: theme.accent,
                  opacity: 0.7,
                  minWidth: 44,
                }}
              >
                0{i + 1}
              </span>
              <span style={{ display: "flex", width: 60, justifyContent: "center" }}>
                <Icon size={56} color={theme.accent} />
              </span>
              <span
                style={{
                  color: theme.text,
                  ...TIPO.tarjetaTitulo,
                  fontSize: 40,
                  letterSpacing: -0.8,
                }}
              >
                {texto}
              </span>
            </div>
          );
        })}
        <div
          style={{
            height: 2,
            background: theme.cardBorder,
            transform: `scaleX(${interpolate(ramp(frame, 52, 30), [0, 1], [0, 1])})`,
            transformOrigin: "left",
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
