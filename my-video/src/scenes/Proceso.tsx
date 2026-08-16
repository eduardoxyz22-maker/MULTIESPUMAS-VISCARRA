import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { enter, fadeIn } from "../anim";
import { ramp, TIPO } from "../design";
import { Rotulo, Titular } from "../components/Titular";
import { IconCheck, IconLab, IconMolde } from "../components/Icons";
import { SAFE } from "../layout";
import { BrandTheme } from "../theme";

const PASOS = [
  {
    Icon: IconMolde,
    titulo: "Valoración y molde",
    texto: "Revisamos tu boca y tomamos la medida. No duele.",
  },
  {
    Icon: IconLab,
    titulo: "Se fabrica a tu medida",
    texto: "Elegimos el color de los dientes contigo.",
  },
  {
    Icon: IconCheck,
    titulo: "Prueba y ajuste",
    texto: "Te la colocamos y la calibramos hasta que calce.",
  },
];

const ALTO_PASO = 216;

export const Proceso: React.FC<{ theme: BrandTheme }> = ({ theme }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  /** La línea se dibuja de arriba abajo conectando los pasos. */
  const linea = ramp(frame, 16, 74);

  return (
    <AbsoluteFill style={{ ...SAFE, gap: 44 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
        <Rotulo texto="El proceso" color={theme.accent} desde={2} />
        <Titular
          color={theme.text}
          desde={8}
          lineas={[
            "Así se hace",
          ]}
        />
      </div>

      <div style={{ position: "relative" }}>
        {/* Riel que une los 3 pasos */}
        <div
          style={{
            position: "absolute",
            left: 51,
            top: 40,
            width: 6,
            height: ALTO_PASO * 2,
            borderRadius: 999,
            background: "rgba(255,255,255,0.12)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 51,
            top: 40,
            width: 6,
            height: ALTO_PASO * 2 * linea,
            borderRadius: 999,
            background: theme.accent,
          }}
        />

        {PASOS.map(({ Icon, titulo: t, texto }, i) => {
          const p = enter(frame, fps, 18 + i * 20);
          return (
            <div
              key={t}
              style={{
                ...fadeIn(p, 40),
                display: "flex",
                gap: 34,
                height: i < PASOS.length - 1 ? ALTO_PASO : undefined,
              }}
            >
              <div
                style={{
                  position: "relative",
                  flexShrink: 0,
                  width: 108,
                  height: 108,
                  borderRadius: 34,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: theme.accent,
                  transform: `scale(${interpolate(p, [0, 1], [0.7, 1])})`,
                  boxShadow: `0 18px 50px ${theme.accent}33`,
                }}
              >
                <Icon size={56} color={theme.accentInk} />
                <div
                  style={{
                    position: "absolute",
                    top: -12,
                    right: -12,
                    width: 46,
                    height: 46,
                    borderRadius: 999,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: theme.bgFrom,
                    border: `2px solid ${theme.accent}`,
                    color: theme.accent,
                    fontSize: 26,
                    fontWeight: 800,
                  }}
                >
                  {i + 1}
                </div>
              </div>

              <div style={{ paddingTop: 6 }}>
                <div
                  style={{
                    color: theme.text,
                    ...TIPO.tarjetaTitulo,
                    letterSpacing: -0.8,
                  }}
                >
                  {t}
                </div>
                <div
                  style={{
                    marginTop: 10,
                    color: theme.muted,
                    ...TIPO.tarjetaTexto,
                    maxWidth: 640,
                  }}
                >
                  {texto}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
