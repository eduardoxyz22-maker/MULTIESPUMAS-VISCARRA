import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { pulse } from "../anim";
import { ramp } from "../design";
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
    `M${-w / 2} 2`,
    `L${w / 2} 2`,
    `L${w / 2 - 1} ${h * 0.72}`,
    `Q${w / 2 - 2} ${h} ${w * 0.2} ${h}`,
    `L${-w * 0.2} ${h}`,
    `Q${-w / 2 + 2} ${h} ${-w / 2 + 1} ${h * 0.72}`,
    "Z",
  ].join(" ");

/**
 * Hilera de dientes con un hueco.
 *
 * - `modo="cae"`: una pieza se afloja, gira y cae (gancho del reel).
 * - `modo="repara"`: la pieza nueva baja al hueco y la sonrisa se completa.
 *
 * La encía es festoneada de verdad (un arco por diente) y cada pieza lleva
 * degradado, brillo especular y sombra en el cuello: sin eso la sonrisa se
 * ve como rectángulos blancos.
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
  const marcaHueco = ramp(t, 58, 16);

  /** Modo "repara": la pieza nueva baja y calza. */
  const repone = ramp(t, 18, 30);
  const destello = interpolate(t, [46, 92], [-120, 460], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const late = pulse(frame, fps, 1.3);

  const f = diente(FALTA);

  /** Encía festoneada: un arco por diente, sobre una banda continua. */
  const encia = Array.from({ length: N }, (_, i) => {
    const d = diente(i);
    return `M${d.x - d.w / 2 - 3} ${d.y + 16} Q${d.x} ${d.y - 16} ${d.x + d.w / 2 + 3} ${d.y + 16}`;
  }).join(" ");

  const pieza = (d: ReturnType<typeof diente>, key: string) => (
    <g key={key}>
      <path d={silueta(d.w, d.h)} fill="url(#esmalteFila)" />
      {/* Brillo especular */}
      <ellipse
        cx={-d.w * 0.16}
        cy={d.h * 0.36}
        rx={d.w * 0.11}
        ry={d.h * 0.22}
        fill="#FFFFFF"
        opacity={0.7}
      />
      {/* Sombra del cuello, donde entra la encía */}
      <rect
        x={-d.w / 2}
        y={2}
        width={d.w}
        height={d.h * 0.22}
        fill="url(#cuello)"
      />
    </g>
  );

  return (
    <svg
      viewBox="0 0 400 150"
      style={{ width: 640, height: 240, overflow: "visible" }}
    >
      <defs>
        <linearGradient id="esmalteFila" x1="0.2" y1="0" x2="0.8" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="52%" stopColor="#F5F8F4" />
          <stop offset="100%" stopColor="#CFD8D2" />
        </linearGradient>
        <linearGradient id="cuello" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#B98A84" stopOpacity={0.55} />
          <stop offset="100%" stopColor="#B98A84" stopOpacity={0} />
        </linearGradient>
        <linearGradient id="enciaFila" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E58C86" />
          <stop offset="100%" stopColor="#C25F5C" />
        </linearGradient>
        <linearGradient id="destelloFila" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity={0} />
          <stop offset="50%" stopColor="#FFFFFF" stopOpacity={0.8} />
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
        <filter id="sombraSonrisa" x="-20%" y="-20%" width="140%" height="150%">
          <feDropShadow
            dx="0"
            dy="6"
            stdDeviation="7"
            floodColor="#000000"
            floodOpacity="0.5"
          />
        </filter>
      </defs>

      {/* Interior de la boca */}
      <path
        d="M28 32 Q200 92 372 32 L372 76 Q200 130 28 76 Z"
        fill="rgba(0,0,0,0.55)"
      />

      {/* Encía festoneada */}
      <g filter="url(#sombraSonrisa)">
        <path
          d="M30 30 Q200 74 370 30 L370 8 Q200 52 30 8 Z"
          fill="url(#enciaFila)"
        />
        <path
          d={encia}
          fill="none"
          stroke="url(#enciaFila)"
          strokeWidth={22}
          strokeLinecap="round"
        />
      </g>

      {Array.from({ length: N }, (_, i) => {
        const d = diente(i);
        const p = ramp(t, i * 3, 22);
        if (i === FALTA) return null;
        return (
          <g key={i} transform={`translate(${d.x} ${d.y})`} opacity={p}>
            {pieza(d, `p${i}`)}
          </g>
        );
      })}

      {modo === "cae" ? (
        <>
          {/* Marca del hueco que queda */}
          <path
            d={silueta(f.w, f.h)}
            transform={`translate(${f.x} ${f.y})`}
            fill="rgba(0,0,0,0.55)"
            stroke={theme.accent}
            strokeWidth={3}
            strokeDasharray="7 7"
            opacity={marcaHueco * (0.55 + late * 0.45)}
          />
          {/* La pieza que se cae */}
          <g
            transform={`translate(${f.x} ${f.y + caida}) rotate(${giro})`}
            opacity={seVa * ramp(t, FALTA * 3, 22)}
          >
            {pieza(f, "cae")}
          </g>
        </>
      ) : (
        <>
          <path
            d={silueta(f.w, f.h)}
            transform={`translate(${f.x} ${f.y})`}
            fill="rgba(0,0,0,0.55)"
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
          <g
            transform={`translate(${f.x} ${f.y + (1 - repone) * -120})`}
            opacity={repone}
          >
            {pieza(f, "nueva")}
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
