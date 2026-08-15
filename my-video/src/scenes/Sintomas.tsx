import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { enter, fadeIn, fadeUp } from "../anim";
import {
  IconDiente,
  IconDolor,
  IconLuna,
  IconMandibula,
} from "../components/Icons";
import { SAFE } from "../layout";
import { BrandTheme } from "../theme";

const SENALES = [
  { Icon: IconLuna, texto: "Rechinas los dientes al dormir" },
  { Icon: IconDolor, texto: "Dolor de cabeza al despertar" },
  { Icon: IconDiente, texto: "Dientes gastados o sensibles" },
  { Icon: IconMandibula, texto: "Chasquido al abrir la boca" },
];

export const Sintomas: React.FC<{ theme: BrandTheme }> = ({ theme }) => {
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
          fontSize: 76,
          fontWeight: 800,
          letterSpacing: -1.6,
        }}
      >
        4 señales de que
        <br />
        <span style={{ color: theme.accent }}>necesitas una placa</span>
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
        {SENALES.map(({ Icon, texto }, i) => {
          const p = enter(frame, fps, 16 + i * 11);
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
                }}
              >
                <Icon size={44} color={theme.accent} />
              </div>
              <span
                style={{
                  color: theme.text,
                  fontSize: 37,
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
