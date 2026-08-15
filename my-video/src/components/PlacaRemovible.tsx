import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { enter, pulse } from "../anim";
import { BrandTheme } from "../theme";

/**
 * Placa dental removible (prótesis parcial) dibujada en SVG.
 *
 * La arcada es media elipse: el acrílico rosado es un trazo grueso sobre ese
 * arco, y los dientes se posicionan sobre la misma elipse rotados hacia
 * afuera. Así todo se calcula con una sola parametrización.
 */
const CX = 200;
const CY = 116;
const RX = 132;
const RY = 104;
const BANDA = 68;

/** Ángulos (grados) donde va cada diente: 90° es el frente de la arcada. */
const DIENTES = [18, 40, 62, 84, 106, 128, 150];
/** Ganchos metálicos: en los extremos, como en una placa real. */
const GANCHOS = [8, 172];

const punto = (grados: number, dr = 0) => {
  const r = (grados * Math.PI) / 180;
  return {
    x: CX + (RX + dr) * Math.cos(r),
    y: CY + (RY + dr) * Math.sin(r),
  };
};

/** Traza el arco muestreando la elipse (más simple que encadenar curvas). */
const arco = (desde: number, hasta: number, dr = 0, pasos = 48) => {
  const d: string[] = [];
  for (let i = 0; i <= pasos; i++) {
    const g = desde + ((hasta - desde) * i) / pasos;
    const p = punto(g, dr);
    d.push(`${i === 0 ? "M" : "L"}${p.x.toFixed(1)} ${p.y.toFixed(1)}`);
  }
  return d.join(" ");
};

const ARCADA = arco(6, 174);

export const PlacaRemovible: React.FC<{
  theme: BrandTheme;
  delay?: number;
}> = ({ theme, delay = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame - delay;

  /** 1) Se dibuja el acrílico. */
  const trazo = interpolate(t, [0, 34], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  /** 2) Caen los dientes uno por uno. 3) Enganchan los ganchos. */
  const brillo = interpolate(t, [56, 104], [-160, 480], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  /** Flotación continua: sube/baja y se inclina apenas. */
  const flotaY = Math.sin((t / (fps * 2.6)) * Math.PI * 2) * 9;
  const inclina = Math.sin((t / (fps * 3.4)) * Math.PI * 2) * 2.2;
  const halo = pulse(frame, fps, 2.4);

  return (
    <svg
      viewBox="0 30 400 260"
      style={{ width: 700, height: 430, overflow: "visible" }}
    >
      <defs>
        <linearGradient id="acrilico" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFB9AE" />
          <stop offset="55%" stopColor="#F58A7C" />
          <stop offset="100%" stopColor="#D9645A" />
        </linearGradient>
        <linearGradient id="diente" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#DCE3DD" />
        </linearGradient>
        <linearGradient id="metal" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="50%" stopColor="#B9C2C8" />
          <stop offset="100%" stopColor="#EDF1F3" />
        </linearGradient>
        <linearGradient id="destello" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity={0} />
          <stop offset="50%" stopColor="#FFFFFF" stopOpacity={0.55} />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity={0} />
        </linearGradient>
        <radialGradient id="resplandor" cx="50%" cy="55%" r="50%">
          <stop offset="0%" stopColor={theme.accent} stopOpacity={0.3} />
          <stop offset="100%" stopColor={theme.accent} stopOpacity={0} />
        </radialGradient>
        <mask id="soloAcrilico">
          <path
            d={ARCADA}
            fill="none"
            stroke="#FFFFFF"
            strokeWidth={BANDA}
            strokeLinecap="round"
          />
        </mask>
      </defs>

      <ellipse
        cx={CX}
        cy={CY + 40}
        rx={210}
        ry={150}
        fill="url(#resplandor)"
        opacity={0.55 + halo * 0.45}
      />

      <g transform={`translate(0 ${flotaY}) rotate(${inclina} ${CX} ${CY + 60})`}>
        {/* Sombra bajo la placa */}
        <path
          d={ARCADA}
          fill="none"
          stroke="rgba(0,0,0,0.45)"
          strokeWidth={BANDA}
          strokeLinecap="round"
          transform="translate(0 14)"
          opacity={trazo * 0.5}
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={1 - trazo}
        />

        {/* Acrílico rosado: se dibuja de un extremo al otro */}
        <path
          d={ARCADA}
          fill="none"
          stroke="url(#acrilico)"
          strokeWidth={BANDA}
          strokeLinecap="round"
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={1 - trazo}
        />
        {/* Filo superior claro, da volumen */}
        <path
          d={arco(6, 174, -20)}
          fill="none"
          stroke="rgba(255,255,255,0.34)"
          strokeWidth={7}
          strokeLinecap="round"
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={1 - trazo}
        />

        {/* Ganchos metálicos */}
        {GANCHOS.map((g, i) => {
          const p = enter(t, fps, 60 + i * 6, 22);
          const a = punto(g, 8);
          const b = punto(g, 40);
          const c = punto(g + (g < 90 ? -16 : 16), 22);
          return (
            <path
              key={g}
              d={`M${a.x} ${a.y} Q${b.x} ${b.y} ${c.x} ${c.y}`}
              fill="none"
              stroke="url(#metal)"
              strokeWidth={7}
              strokeLinecap="round"
              opacity={p}
              transform={`translate(0 ${(1 - p) * -26})`}
            />
          );
        })}

        {/* Dientes: caen escalonados sobre la arcada */}
        {DIENTES.map((g, i) => {
          const p = enter(t, fps, 26 + i * 5, 24);
          const centro = punto(g, 10);
          const molar = Math.abs(Math.cos((g * Math.PI) / 180));
          const w = 25 + molar * 17;
          const h = 34 + molar * 6;
          return (
            <g
              key={g}
              transform={`translate(${centro.x} ${centro.y}) rotate(${g + 90})`}
              opacity={p}
            >
              <g transform={`translate(0 ${(1 - p) * -34}) scale(${interpolate(p, [0, 1], [0.6, 1])})`}>
                <rect
                  x={-w / 2}
                  y={-h / 2}
                  width={w}
                  height={h}
                  rx={w * 0.32}
                  fill="url(#diente)"
                  stroke="rgba(90,110,100,0.25)"
                  strokeWidth={1.2}
                />
                <ellipse
                  cx={-w * 0.16}
                  cy={-h * 0.2}
                  rx={w * 0.2}
                  ry={h * 0.16}
                  fill="#FFFFFF"
                  opacity={0.85}
                />
              </g>
            </g>
          );
        })}

        {/* Destello que barre el acrílico cuando ya está armada */}
        <g mask="url(#soloAcrilico)">
          <rect
            x={brillo}
            y={20}
            width={90}
            height={300}
            fill="url(#destello)"
            transform={`rotate(16 ${brillo + 45} 170)`}
          />
        </g>
      </g>
    </svg>
  );
};
