import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { pulse } from "../anim";
import { ramp, TIPO } from "../design";
import { IconWhatsapp } from "../components/Icons";
import { Titular } from "../components/Titular";
import { SAFE } from "../layout";
import { BrandTheme } from "../theme";

/** Ondas que salen del botón, desfasadas entre sí. */
const ONDAS = [0, 22, 44];
const CICLO = 66;

export const Cta: React.FC<{ theme: BrandTheme }> = ({ theme }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const marca = ramp(frame, 2, 26);
  const sub = ramp(frame, 26, 28);
  const boton = ramp(frame, 34, 30);
  const datos = ramp(frame, 48, 28);
  const late = pulse(frame, fps, 1.6);

  return (
    <AbsoluteFill style={{ ...SAFE, alignItems: "center", gap: 26 }}>
      <div
        style={{
          textAlign: "center",
          opacity: marca,
          transform: `translateY(${(1 - marca) * 20}px)`,
        }}
      >
        <div
          style={{
            color: theme.accent,
            fontSize: 38,
            fontWeight: 800,
            letterSpacing: -0.5,
          }}
        >
          {theme.clinica}
        </div>
        <div
          style={{
            marginTop: 12,
            color: theme.muted,
            ...TIPO.rotulo,
            fontSize: 25,
          }}
        >
          {theme.lema}
        </div>
      </div>

      <div style={{ marginTop: 10 }}>
        <Titular
          color={theme.text}
          desde={10}
          alineado="center"
          tam={96}
          peso={900}
          lineas={["Agenda tu", "valoración"]}
        />
      </div>

      <p
        style={{
          margin: 0,
          textAlign: "center",
          color: theme.muted,
          ...TIPO.subtitulo,
          fontSize: 36,
          maxWidth: 800,
          opacity: sub,
          transform: `translateY(${(1 - sub) * 20}px)`,
        }}
      >
        Te decimos qué placa necesitas y cuánto cuesta, sin compromiso.
      </p>

      <div style={{ position: "relative", marginTop: 22 }}>
        {ONDAS.map((desfase) => {
          const q = ((frame + desfase) % CICLO) / CICLO;
          return (
            <div
              key={desfase}
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: 14,
                border: `3px solid ${theme.accent}`,
                opacity: boton * interpolate(q, [0, 1], [0.4, 0]),
                transform: `scale(${interpolate(q, [0, 1], [1, 1.3])})`,
              }}
            />
          );
        })}

        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            gap: 22,
            padding: "30px 52px",
            borderRadius: 14,
            background: theme.accent,
            color: theme.accentInk,
            fontSize: 44,
            fontWeight: 800,
            letterSpacing: -0.6,
            boxShadow: `0 30px 80px ${theme.accent}3D`,
            opacity: boton,
            transform: `translateY(${(1 - boton) * 26}px) scale(${interpolate(late, [0, 1], [1, 1.02])})`,
          }}
        >
          <IconWhatsapp size={50} color={theme.accentInk} />
          Escríbenos al WhatsApp
        </div>
      </div>

      <div
        style={{
          marginTop: 20,
          textAlign: "center",
          color: theme.text,
          fontSize: 42,
          fontWeight: 800,
          letterSpacing: 1,
          opacity: datos,
          transform: `translateY(${(1 - datos) * 20}px)`,
        }}
      >
        {theme.whatsapp}
        <div
          style={{
            marginTop: 14,
            color: theme.muted,
            fontSize: 28,
            fontWeight: 500,
            letterSpacing: 0,
          }}
        >
          {theme.promesa} · {theme.direccion}
        </div>
      </div>
    </AbsoluteFill>
  );
};
