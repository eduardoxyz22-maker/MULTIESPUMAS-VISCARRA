import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { pulse } from "../anim";
import { ramp, TIPO } from "../design";
import { SonrisaHueco } from "../components/SonrisaHueco";
import { Rotulo } from "../components/Titular";
import { SAFE } from "../layout";
import { BrandTheme } from "../theme";

export const Hook: React.FC<{ theme: BrandTheme }> = ({ theme }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const glow = pulse(frame, fps, 1.8);
  const sub = ramp(frame, 72, 30);

  /** Cuando la pieza toca el piso, la cámara se sacude y hay un fogonazo. */
  const impacto = interpolate(frame, [58, 63, 84], [0, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const sacude = Math.sin(frame * 2.2) * 13 * impacto;

  /**
   * El titular no entra con fade: cada palabra sube desde detrás de su
   * propia línea, y "un diente" llega junto con el golpe.
   */
  const l1 = ramp(frame, 4, 30);
  const l2 = ramp(frame, 58, 30);

  return (
    <AbsoluteFill
      style={{
        ...SAFE,
        alignItems: "center",
        gap: 34,
        transform: `translate(${sacude}px, ${sacude * 0.45}px)`,
      }}
    >
      <AbsoluteFill
        style={{ background: theme.accent, opacity: impacto * 0.12 }}
      />

      <Rotulo texto="Placas dentales" color={theme.accent} centrado />

      <div style={{ position: "relative" }}>
        <SonrisaHueco theme={theme} />
        <div
          style={{
            position: "absolute",
            inset: "18% 26%",
            borderRadius: "50%",
            background: theme.accent,
            filter: "blur(60px)",
            opacity: 0.1 + glow * 0.12,
            zIndex: -1,
          }}
        />
      </div>

      <h1
        style={{
          margin: 0,
          textAlign: "center",
          color: theme.text,
          ...TIPO.display,
          letterSpacing: -TIPO.display.fontSize * 0.034,
        }}
      >
        {[
          { texto: "¿Te falta", p: l1, color: theme.text },
          { texto: "un diente?", p: l2, color: theme.accent },
        ].map(({ texto, p, color }) => (
          <span
            key={texto}
            style={{
              display: "block",
              overflow: "hidden",
              paddingBottom: 14,
              marginBottom: -14,
              color,
            }}
          >
            <span
              style={{
                display: "block",
                transform: `translateY(${(1 - p) * 112}%)`,
              }}
            >
              {texto}
            </span>
          </span>
        ))}
      </h1>

      <p
        style={{
          margin: 0,
          textAlign: "center",
          color: theme.muted,
          ...TIPO.subtitulo,
          maxWidth: 820,
          opacity: sub,
          transform: `translateY(${(1 - sub) * 24}px)`,
        }}
      >
        Se nota al comer, al hablar y en las fotos.
      </p>
    </AbsoluteFill>
  );
};
