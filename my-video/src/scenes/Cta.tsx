import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { enter, fadeUp, popIn, pulse } from "../anim";
import { IconWhatsapp } from "../components/Icons";
import { SAFE } from "../layout";
import { BrandTheme } from "../theme";

/** Ondas que salen del botón, desfasadas entre sí. */
const ONDAS = [0, 22, 44];
const CICLO = 66;

export const Cta: React.FC<{ theme: BrandTheme }> = ({ theme }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const marca = enter(frame, fps, 2);
  const titulo = enter(frame, fps, 12);
  const boton = enter(frame, fps, 28);
  const datos = enter(frame, fps, 44);
  const late = pulse(frame, fps, 1.6);

  return (
    <AbsoluteFill style={{ ...SAFE, alignItems: "center", gap: 28 }}>
      <div
        style={{
          ...popIn(marca),
          textAlign: "center",
          color: theme.accent,
          fontSize: 40,
          fontWeight: 700,
          letterSpacing: 1,
        }}
      >
        {theme.clinica}
        <div
          style={{
            marginTop: 10,
            color: theme.muted,
            fontSize: 28,
            fontWeight: 500,
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          {theme.lema}
        </div>
      </div>

      <h2
        style={{
          ...fadeUp(titulo),
          margin: 0,
          textAlign: "center",
          color: theme.text,
          fontSize: 92,
          fontWeight: 800,
          lineHeight: 1.04,
          letterSpacing: -2.2,
        }}
      >
        Agenda tu
        <br />
        valoración
      </h2>

      <p
        style={{
          ...fadeUp(titulo, 24),
          margin: 0,
          textAlign: "center",
          color: theme.muted,
          fontSize: 38,
          maxWidth: 780,
          lineHeight: 1.3,
        }}
      >
        Te decimos qué placa necesitas y cuánto cuesta, sin compromiso.
      </p>

      <div style={{ position: "relative", marginTop: 20 }}>
        {ONDAS.map((desfase) => {
          const q = ((frame + desfase) % CICLO) / CICLO;
          return (
            <div
              key={desfase}
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: 999,
                border: `3px solid ${theme.accent}`,
                opacity: boton * interpolate(q, [0, 1], [0.45, 0]),
                transform: `scale(${interpolate(q, [0, 1], [1, 1.35])})`,
              }}
            />
          );
        })}

        <div
          style={{
            ...popIn(boton, 0.8),
            position: "relative",
            transform: `${popIn(boton, 0.8).transform} scale(${interpolate(late, [0, 1], [1, 1.03])})`,
            display: "flex",
            alignItems: "center",
            gap: 22,
            padding: "30px 54px",
            borderRadius: 999,
            background: theme.accent,
            color: theme.accentInk,
            fontSize: 46,
            fontWeight: 800,
            boxShadow: `0 24px 70px ${theme.accent}44`,
          }}
        >
          <span
            style={{
              display: "flex",
              transform: `rotate(${(late - 0.5) * 14}deg)`,
            }}
          >
            <IconWhatsapp size={52} color={theme.accentInk} />
          </span>
          Escríbenos al WhatsApp
        </div>
      </div>

      <div
        style={{
          ...fadeUp(datos, 24),
          marginTop: 16,
          textAlign: "center",
          color: theme.text,
          fontSize: 40,
          fontWeight: 700,
          letterSpacing: 1,
        }}
      >
        {theme.whatsapp}
        <div
          style={{
            marginTop: 12,
            color: theme.muted,
            fontSize: 30,
            fontWeight: 500,
          }}
        >
          {theme.promesa} · {theme.direccion}
        </div>
      </div>
    </AbsoluteFill>
  );
};
