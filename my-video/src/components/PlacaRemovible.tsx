import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { enter, pulse } from "../anim";
import { BrandTheme } from "../theme";

/**
 * Placa dental removible (prótesis parcial) dibujada en SVG.
 *
 * La arcada es media elipse: el acrílico rosado es un trazo grueso sobre ese
 * arco y cada diente se ubica sobre la misma elipse, rotado hacia afuera.
 * Los dientes no son rectángulos: llevan silueta anatómica (incisivos planos
 * al frente, molares con cúspides atrás), encía festoneada en el cuello y
 * brillo especular, que es lo que hace que se lea como una placa real.
 */
const CX = 200;
const CY = 112;
const RX = 136;
const RY = 108;
const BANDA = 54;

/** 9 piezas, de molar a molar. 90° es el frente de la arcada. */
const DIENTES = [14, 33, 52, 71, 90, 109, 128, 147, 166];
const GANCHOS = [7, 173];

const punto = (grados: number, dr = 0) => {
  const r = (grados * Math.PI) / 180;
  return {
    x: CX + (RX + dr) * Math.cos(r),
    y: CY + (RY + dr) * Math.sin(r),
  };
};

/** Traza el arco muestreando la elipse (más simple que encadenar curvas). */
const arco = (desde: number, hasta: number, dr = 0, pasos = 56) => {
  const d: string[] = [];
  for (let i = 0; i <= pasos; i++) {
    const g = desde + ((hasta - desde) * i) / pasos;
    const p = punto(g, dr);
    d.push(`${i === 0 ? "M" : "L"}${p.x.toFixed(1)} ${p.y.toFixed(1)}`);
  }
  return d.join(" ");
};

const ARCADA = arco(5, 175);
/**
 * Silueta del diente. El lado que muerde queda hacia -y (afuera de la
 * arcada) y el cuello, hacia +y (donde lo abraza la encía).
 */
const siluetaDiente = (w: number, h: number, molar: number) => {
  const mx = w / 2;
  const my = h / 2;
  const borde =
    molar > 0.45
      ? // Molares: dos cúspides
        `Q${-mx * 0.5} ${-my * 1.16} 0 ${-my * 0.92} Q${mx * 0.5} ${-my * 1.16} ${mx * 0.74} ${-my * 0.84}`
      : // Incisivos: borde plano con esquinas redondeadas
        `Q0 ${-my * 1.12} ${mx * 0.74} ${-my * 0.84}`;

  return [
    `M${-mx * 0.86} ${my}`,
    `L${mx * 0.86} ${my}`,
    `C${mx * 1.0} ${my * 0.2}, ${mx * 0.96} ${-my * 0.3}, ${mx * 0.74} ${-my * 0.84}`,
    borde.replace(/^Q/, "Q"),
    `C${-mx * 0.96} ${-my * 0.3}, ${-mx * 1.0} ${my * 0.2}, ${-mx * 0.86} ${my}`,
    "Z",
  ].join(" ");
};

export const PlacaRemovible: React.FC<{
  theme: BrandTheme;
  delay?: number;
}> = ({ theme, delay = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame - delay;

  /** 1) Se dibuja el acrílico. 2) Caen los dientes. 3) Enganchan los ganchos. */
  const trazo = interpolate(t, [0, 34], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const brillo = interpolate(t, [64, 116], [-180, 520], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  /** Flotación continua: sube/baja y se inclina apenas. */
  const flotaY = Math.sin((t / (fps * 2.6)) * Math.PI * 2) * 9;
  const inclina = Math.sin((t / (fps * 3.4)) * Math.PI * 2) * 2.4;
  const halo = pulse(frame, fps, 2.4);

  return (
    <svg
      viewBox="0 20 400 268"
      style={{ width: 720, height: 482, overflow: "visible" }}
    >
      <defs>
        <linearGradient id="acrilico" x1="0.1" y1="0" x2="0.6" y2="1">
          <stop offset="0%" stopColor="#FFC2B6" />
          <stop offset="42%" stopColor="#F08E7F" />
          <stop offset="100%" stopColor="#C4544C" />
        </linearGradient>
        <linearGradient id="encia" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFB3A6" />
          <stop offset="100%" stopColor="#E07A6C" />
        </linearGradient>
        <linearGradient id="esmalte" x1="0.2" y1="0" x2="0.8" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="46%" stopColor="#F6F8F4" />
          <stop offset="100%" stopColor="#D5DDD6" />
        </linearGradient>
        <linearGradient id="metal" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="38%" stopColor="#AEB8BF" />
          <stop offset="62%" stopColor="#F2F5F7" />
          <stop offset="100%" stopColor="#8F9AA2" />
        </linearGradient>
        <linearGradient id="destello" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity={0} />
          <stop offset="50%" stopColor="#FFFFFF" stopOpacity={0.5} />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity={0} />
        </linearGradient>
        <radialGradient id="resplandor" cx="50%" cy="55%" r="50%">
          <stop offset="0%" stopColor={theme.accent} stopOpacity={0.28} />
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
        <filter id="sombraPlaca" x="-25%" y="-25%" width="150%" height="160%">
          <feDropShadow
            dx="0"
            dy="10"
            stdDeviation="10"
            floodColor="#000000"
            floodOpacity="0.45"
          />
        </filter>
      </defs>

      <ellipse
        cx={CX}
        cy={CY + 44}
        rx={214}
        ry={152}
        fill="url(#resplandor)"
        opacity={0.55 + halo * 0.45}
      />

      <g
        transform={`translate(0 ${flotaY}) rotate(${inclina} ${CX} ${CY + 60})`}
        filter="url(#sombraPlaca)"
      >
        {/* Cuerpo de acrílico: se dibuja de un extremo al otro */}
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
        {/* Sombra del borde interno: da grosor */}
        <path
          d={arco(5, 175, -BANDA / 2 + 5)}
          fill="none"
          stroke="rgba(120,40,36,0.35)"
          strokeWidth={10}
          strokeLinecap="round"
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={1 - trazo}
        />
        {/* Reflejo del borde externo */}
        <path
          d={arco(8, 172, BANDA / 2 - 7)}
          fill="none"
          stroke="rgba(255,255,255,0.32)"
          strokeWidth={6}
          strokeLinecap="round"
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={1 - trazo}
        />

        {/* Ganchos metálicos: rodean la pieza de apoyo */}
        {GANCHOS.map((g, i) => {
          const p = enter(t, fps, 74 + i * 6, 24);
          const a = punto(g, 6);
          const b = punto(g, 46);
          const c = punto(g + (g < 90 ? -18 : 18), 26);
          const d = punto(g + (g < 90 ? -26 : 26), -4);
          return (
            <g key={g} opacity={p} transform={`translate(0 ${(1 - p) * -30})`}>
              <path
                d={`M${a.x} ${a.y} Q${b.x} ${b.y} ${c.x} ${c.y} Q${d.x} ${d.y} ${d.x} ${d.y + 6}`}
                fill="none"
                stroke="url(#metal)"
                strokeWidth={7.5}
                strokeLinecap="round"
              />
              <path
                d={`M${a.x} ${a.y} Q${b.x} ${b.y} ${c.x} ${c.y}`}
                fill="none"
                stroke="rgba(255,255,255,0.8)"
                strokeWidth={2}
                strokeLinecap="round"
              />
            </g>
          );
        })}

        {/* Dientes: caen escalonados y la encía los abraza en el cuello */}
        {DIENTES.map((g, i) => {
          const p = enter(t, fps, 30 + i * 4, 24);
          const centro = punto(g, 5);
          const molar = Math.abs(Math.cos((g * Math.PI) / 180));
          const w = 30 + molar * 13;
          const h = 47 - molar * 7;
          return (
            <g
              key={g}
              transform={`translate(${centro.x} ${centro.y}) rotate(${g - 90})`}
              opacity={p}
            >
              <g
                transform={`translate(0 ${(1 - p) * -36}) scale(${interpolate(p, [0, 1], [0.55, 1])})`}
              >
                {/* La corona ancha va hacia afuera y el cuello, hacia la encía */}
                <g transform="scale(1 -1)">
                  <path
                    d={siluetaDiente(w, h, molar)}
                    fill="url(#esmalte)"
                    stroke="rgba(80,100,92,0.28)"
                    strokeWidth={1.1}
                  />
                  <ellipse
                    cx={-w * 0.17}
                    cy={h * 0.1}
                    rx={w * 0.12}
                    ry={h * 0.24}
                    fill="#FFFFFF"
                    opacity={0.75}
                  />
                </g>
                {/* Encía festoneada abrazando el cuello del diente */}
                <ellipse
                  cx={0}
                  cy={h * 0.46}
                  rx={w * 0.52}
                  ry={h * 0.15}
                  fill="url(#encia)"
                />
                <ellipse
                  cx={0}
                  cy={h * 0.4}
                  rx={w * 0.4}
                  ry={h * 0.09}
                  fill="rgba(120,40,36,0.2)"
                />
              </g>
            </g>
          );
        })}

        {/* Destello que barre la placa cuando ya está armada */}
        <g mask="url(#soloAcrilico)">
          <rect
            x={brillo}
            y={10}
            width={86}
            height={320}
            fill="url(#destello)"
            transform={`rotate(16 ${brillo + 43} 170)`}
          />
        </g>
      </g>
    </svg>
  );
};
