import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { enter, fadeIn, fadeUp, pulse } from "../anim";
import {
  IconHablar,
  IconManzana,
  IconMover,
  IconSonrisa,
} from "../components/Icons";
import { SAFE } from "../layout";
import { BrandTheme } from "../theme";

const SENALES = [
  { Icon: IconManzana, texto: "Masticas de un solo lado" },
  { Icon: IconSonrisa, texto: "Evitas sonreír en las fotos" },
  { Icon: IconMover, texto: "Los dientes vecinos se mueven" },
  { Icon: IconHablar, texto: "Se te traban las palabras" },
];

export const Senales: React.FC<{ theme: BrandTheme }> = ({ theme }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titulo = enter(frame, fps, 4);

  return (
    <AbsoluteFill style={{ ...SAFE, gap: 46 }}>
      <h2
        style={{
          ...fadeUp(titulo),
          margin: 0,
          color: theme.text,
          fontSize: 74,
          fontWeight: 800,
          letterSpacing: -1.6,
          lineHeight: 1.08,
        }}
      >
        Vivir con espacios
        <br />
        <span style={{ color: theme.accent }}>te cuesta más</span>
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
        {SENALES.map(({ Icon, texto }, i) => {
          const p = enter(frame, fps, 14 + i * 11);
          const flota = pulse(frame, fps, 2.2 + i * 0.3);
          return (
            <div
              key={texto}
              style={{
                ...fadeIn(p),
                display: "flex",
                alignItems: "center",
                gap: 30,
                padding: "30px 34px",
                borderRadius: 30,
                background: theme.card,
                border: `2px solid ${theme.cardBorder}`,
              }}
            >
              <div
                style={{
                  flexShrink: 0,
                  width: 84,
                  height: 84,
                  borderRadius: 24,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: `${theme.accent}1F`,
                  transform: `translateY(${(flota - 0.5) * 9}px) rotate(${(flota - 0.5) * 5}deg)`,
                }}
              >
                <Icon size={46} color={theme.accent} />
              </div>
              <span
                style={{
                  color: theme.text,
                  fontSize: 38,
                  fontWeight: 600,
                  lineHeight: 1.2,
                }}
              >
                {texto}
              </span>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
