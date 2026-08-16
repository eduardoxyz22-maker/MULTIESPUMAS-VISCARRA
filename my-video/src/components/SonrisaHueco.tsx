import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { enter, pulse } from "../anim";
import { BrandTheme } from "../theme";

const N = 8;
/** Pieza que falta. */
const FALTA = 5;

const diente = (i: number) => {
  const centro = (N - 1) / 2;
  const dx = i - centro;
  return {
    x: 46 + i * 44,
    // El centro baja (incisivos más largos), los costados suben: curva de sonrisa.
    y: 30 + (12.25 - dx * dx) * 1.7,
    w: 40 - Math.abs(dx) * 2.4,
    h: 58 - Math.abs(dx) * 3.6,
  };
};

/** Silueta frontal: cuello recto y borde incisal redondeado. */
const silueta = (w: number, h: number) =>
  [
    `M${-w / 2} 4`,
    `L${w / 2} 4`,
    `L${w / 2 - 1} ${h * 0.72}`,
    `Q${w / 2 - 2} ${h} ${w * 0.22} ${h}`,
    `L${-w * 0.22} ${h}`,
    `Q${-w / 2 + 2} ${h} ${-w / 2 + 1} ${h * 0.72}`,
    "Z",
  ].join(" ");

/**
 * Hilera de dientes con un hueco.
 *
 * - `modo="cae"`: una pieza se afloja, gira y cae (gancho del reel).
 * - `modo="repara"`: la pieza nueva baja al hueco y la sonrisa se completa.
 */
export const SonrisaHueco: React.FC<{
  theme: BrandTheme;
  delay?: number;
  modo?: "cae" | "repara";
}> = ({ theme, delay = 0, modo = "cae" }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame - delay;

  /** Modo "cae": la pieza se afloja, cae y desaparece. */
  const caida = interpolate(t, [34, 40, 62], [0, -6, 150], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const giro = interpolate(t, [34, 62], [0, 46], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const seVa = interpolate(t, [40, 64], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const marcaHueco = interpolate(t, [58, 72], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  /** Modo "repara": la pieza nueva baja y calza. */
  const repone = enter(t, fps, 18, 30);
  const destello = interpolate(t, [46, 92], [-120, 460], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const late = pulse(frame, fps, 1.3);

  const f = diente(FALTA);

  return (
    <svg
      viewBox="0 0 400 150"
      style={{ width: 640, height: 240, overflow: "visible" }}
    >
      <defs>
        <linearGradient id="esmalteFila" x1="0.2" y1="0" x2="0.8" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="55%" stopColor="#F4F7F3" />
          <stop offset="100%" stopColor="#D6DED8" />
        </linearGradient>
        <linearGradient id="destelloFila" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity={0} />
          <stop offset="50%" stopColor="#FFFFFF" stopOpacity={0.75} />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity={0} />
        </linearGradient>
        <mask id="soloDientes">
          {Array.from({ length: N }, (_, i) => {
            const d = diente(i);
            return (
              <path
                key={i}
                d={silueta(d.w, d.h)}
                transform={`translate(${d.x} ${d.y})`}
                fill="#FFFFFF"
              />
            );
          })}
        </mask>
      </defs>

      {/* Encía: mismo arco que los dientes, con extremos redondeados */}
      <path
        d="M46 30 Q200 68 354 30"
        fill="none"
        stroke={theme.accent}
        strokeWidth={26}
        strokeLinecap="round"
        opacity={0.2}
      />

      {Array.from({ length: N }, (_, i) => {
        const d = diente(i);
        const p = enter(t, fps, i * 3, 20);
        if (i === FALTA) return null;
        return (
          <path
            key={i}
            d={silueta(d.w, d.h)}
            transform={`translate(${d.x} ${d.y})`}
            fill="url(#esmalteFila)"
            opacity={p}
          />
        );
      })}

      {modo === "cae" ? (
        <>
          {/* Marca del hueco que queda */}
          <path
            d={silueta(f.w, f.h)}
            transform={`translate(${f.x} ${f.y})`}
            fill="rgba(0,0,0,0.5)"
            stroke={theme.accent}
            strokeWidth={3}
            strokeDasharray="7 7"
            opacity={marcaHueco * (0.55 + late * 0.45)}
          />
          {/* La pieza que se cae */}
          <g
            transform={`translate(${f.x} ${f.y + caida}) rotate(${giro})`}
            opacity={seVa * enter(t, fps, FALTA * 3, 20)}
          >
            <path d={silueta(f.w, f.h)} fill="url(#esmalteFila)" />
          </g>
        </>
      ) : (
        <>
          {/* Hueco que se va tapando */}
          <path
            d={silueta(f.w, f.h)}
            transform={`translate(${f.x} ${f.y})`}
            fill="rgba(0,0,0,0.5)"
            opacity={1 - repone}
          />
          {/* Halo de la pieza nueva */}
          <ellipse
            cx={f.x}
            cy={f.y + f.h * 0.55}
            rx={f.w * 0.95}
            ry={f.h * 0.75}
            fill={theme.accent}
            opacity={repone * (1 - repone) * 1.6}
          />
          {/* La pieza nueva baja y calza */}
          <g
            transform={`translate(${f.x} ${f.y + (1 - repone) * -120})`}
            opacity={repone}
          >
            <path d={silueta(f.w, f.h)} fill="url(#esmalteFila)" />
          </g>
        </>
      )}

      {/* Destello final que barre la sonrisa completa */}
      {modo === "repara" && (
        <g mask="url(#soloDientes)">
          <rect
            x={destello}
            y={-20}
            width={70}
            height={190}
            fill="url(#destelloFila)"
            transform={`rotate(14 ${destello + 35} 75)`}
          />
        </g>
      )}
    </svg>
  );
};
