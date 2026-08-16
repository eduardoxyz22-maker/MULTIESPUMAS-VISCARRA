import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { enter, pulse } from "../anim";
import { BrandTheme, FONT_STACK } from "../theme";

/**
 * Placa dental removible (prótesis parcial) dibujada y animada en SVG.
 *
 * Toda la geometría sale de una media elipse: el acrílico es un trazo grueso
 * sobre ese arco y cada diente se ubica sobre la misma elipse, rotado hacia
 * afuera. Como todo es paramétrico, basta animar el radio vertical para que
 * la placa se incline en 3D y los dientes acompañen solos.
 *
 * Coreografía (frames locales):
 *   0–34    se dibuja el acrílico
 *   26–70   caen los dientes, escalonados
 *   70–92   enganchan los ganchos metálicos
 *   60–112  un destello barre la placa
 *   100–152 la placa se inclina (vista oclusal → frontal) y vuelve
 *   120+    aparecen los llamados de atención
 *   siempre flota, se mece y late el halo
 */
const CX = 200;
const CY = 118;
const RX = 136;
const RY = 106;
const BANDA = 54;

/** 9 piezas, de molar a molar. 90° es el frente de la arcada. */
const DIENTES = [14, 33, 52, 71, 90, 109, 128, 147, 166];
const GANCHOS = [7, 173];

const punto = (grados: number, dr = 0, ry = RY) => {
  const r = (grados * Math.PI) / 180;
  return {
    x: CX + (RX + dr) * Math.cos(r),
    y: CY + (ry + dr) * Math.sin(r),
  };
};

/** Traza el arco muestreando la elipse (más simple que encadenar curvas). */
const arco = (desde: number, hasta: number, dr = 0, ry = RY, pasos = 56) => {
  const d: string[] = [];
  for (let i = 0; i <= pasos; i++) {
    const g = desde + ((hasta - desde) * i) / pasos;
    const p = punto(g, dr, ry);
    d.push(`${i === 0 ? "M" : "L"}${p.x.toFixed(1)} ${p.y.toFixed(1)}`);
  }
  return d.join(" ");
};

/**
 * Silueta del diente: cuello estrecho y corona ancha, con dos cúspides en los
 * molares y borde plano en los incisivos.
 */
const siluetaDiente = (w: number, h: number, molar: number) => {
  const mx = w / 2;
  const my = h / 2;
  const borde =
    molar > 0.45
      ? `Q${-mx * 0.5} ${-my * 1.16} 0 ${-my * 0.92} Q${mx * 0.5} ${-my * 1.16} ${mx * 0.74} ${-my * 0.84}`
      : `Q0 ${-my * 1.12} ${mx * 0.74} ${-my * 0.84}`;

  return [
    `M${-mx * 0.86} ${my}`,
    `L${mx * 0.86} ${my}`,
    `C${mx * 1.0} ${my * 0.2}, ${mx * 0.96} ${-my * 0.3}, ${mx * 0.74} ${-my * 0.84}`,
    borde,
    `C${-mx * 0.96} ${-my * 0.3}, ${-mx * 1.0} ${my * 0.2}, ${-mx * 0.86} ${my}`,
    "Z",
  ].join(" ");
};

const ESTRELLA =
  "M0 -10 L2.4 -2.4 L10 0 L2.4 2.4 L0 10 L-2.4 2.4 L-10 0 L-2.4 -2.4 Z";

/** Llamados de atención: a qué punto de la placa apuntan y qué dicen. */
const LLAMADOS = [
  {
    grados: 74,
    dr: 30,
    hacia: { x: 330, y: 258 },
    lineas: ["Dientes del", "color que elijas"],
    ancla: "start" as const,
    delay: 122,
  },
  {
    grados: 173,
    dr: 40,
    hacia: { x: 62, y: 84 },
    lineas: ["Ganchos que", "la sujetan"],
    ancla: "end" as const,
    delay: 136,
  },
];

export const PlacaRemovible: React.FC<{
  theme: BrandTheme;
  delay?: number;
  /** Muestra los llamados de atención sobre las partes de la placa. */
  llamados?: boolean;
}> = ({ theme, delay = 0, llamados = false }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame - delay;

  const trazo = interpolate(t, [0, 34], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const brillo = interpolate(t, [60, 112], [-180, 520], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  /**
   * Inclinación: el radio vertical se comprime y vuelve. Como los dientes
   * cuelgan de la misma elipse, la arcada entera gira en perspectiva.
   */
  const giro = interpolate(t, [100, 126, 152], [0, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const meceo = Math.sin((t / (fps * 3.2)) * Math.PI * 2);
  const ry = RY * (1 - giro * 0.62);
  /** Acercamiento sobre la placa terminada. */
  const acerca = interpolate(t, [196, 216, 246], [0, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const zoom = 1 + acerca * 0.24;

  /** Flotación continua. */
  const flotaY = Math.sin((t / (fps * 2.6)) * Math.PI * 2) * 9;
  const inclina = meceo * 2.6 + giro * 4;
  const halo = pulse(frame, fps, 2.4);

  const ARCADA = arco(5, 175, 0, ry);

  /** El cuerpo se dibuja una vez y se reutiliza para el reflejo. */
  const cuerpo = (
    <g>
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
      <path
        d={arco(5, 175, -BANDA / 2 + 5, ry)}
        fill="none"
        stroke="rgba(120,40,36,0.35)"
        strokeWidth={10}
        strokeLinecap="round"
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1 - trazo}
      />
      <path
        d={arco(8, 172, BANDA / 2 - 7, ry)}
        fill="none"
        stroke="rgba(255,255,255,0.32)"
        strokeWidth={6}
        strokeLinecap="round"
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1 - trazo}
      />

      {/* Ganchos metálicos */}
      {GANCHOS.map((g, i) => {
        const p = enter(t, fps, 70 + i * 6, 24);
        const a = punto(g, 6, ry);
        const b = punto(g, 46, ry);
        const c = punto(g + (g < 90 ? -18 : 18), 26, ry);
        const d = punto(g + (g < 90 ? -26 : 26), -4, ry);
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

      {/* Dientes: caen escalonados con un rebote y la encía los abraza */}
      {DIENTES.map((g, i) => {
        const p = enter(t, fps, 26 + i * 4, 24);
        const centro = punto(g, 5, ry);
        const molar = Math.abs(Math.cos((g * Math.PI) / 180));
        const w = 30 + molar * 13;
        const h = 47 - molar * 7;
        /** Anillo que suelta el diente al aterrizar. */
        const golpe = interpolate(t, [26 + i * 4 + 10, 26 + i * 4 + 26], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        return (
          <g
            key={g}
            transform={`translate(${centro.x} ${centro.y}) rotate(${g - 90})`}
            opacity={p}
          >
            {golpe > 0 && golpe < 1 && (
              <circle
                r={interpolate(golpe, [0, 1], [6, 34])}
                fill="none"
                stroke="#FFFFFF"
                strokeWidth={2.5}
                opacity={(1 - golpe) * 0.7}
              />
            )}
            <g
              transform={`translate(0 ${(1 - p) * -36}) scale(${interpolate(p, [0, 1], [0.55, 1])})`}
            >
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
  );

  return (
    <svg
      viewBox="-40 10 480 300"
      style={{ width: 790, height: 494, overflow: "visible" }}
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
        <linearGradient id="difuminaReflejo" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity={0.5} />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity={0} />
        </linearGradient>
        <mask id="soloAcrilico">
          <path
            d={ARCADA}
            fill="none"
            stroke="#FFFFFF"
            strokeWidth={BANDA}
            strokeLinecap="round"
          />
        </mask>
        <mask id="fundeReflejo">
          <rect
            x={-40}
            y={CY + ry + 30}
            width={480}
            height={190}
            fill="url(#difuminaReflejo)"
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

      {/* Ondas que salen de la placa, en bucle */}
      {[0, 40, 80].map((desfase) => {
        const q = ((t + desfase) % 120) / 120;
        return (
          <ellipse
            key={desfase}
            cx={CX}
            cy={CY + 40}
            rx={interpolate(q, [0, 1], [120, 250])}
            ry={interpolate(q, [0, 1], [80, 170])}
            fill="none"
            stroke={theme.accent}
            strokeWidth={2}
            opacity={trazo * interpolate(q, [0, 1], [0.3, 0])}
          />
        );
      })}

      <ellipse
        cx={CX}
        cy={CY + 44}
        rx={214}
        ry={152}
        fill="url(#resplandor)"
        opacity={0.55 + halo * 0.45}
      />

      {/* Reflejo sobre la superficie */}
      <g mask="url(#fundeReflejo)" opacity={0.28}>
        <g
          transform={`translate(0 ${2 * (CY + ry + 40)}) scale(1 -1) translate(0 ${flotaY})`}
        >
          {cuerpo}
        </g>
      </g>

      <g
        transform={`translate(0 ${flotaY}) rotate(${inclina} ${CX} ${CY + 60}) translate(${CX} ${CY + 60}) scale(${zoom}) translate(${-CX} ${-(CY + 60)})`}
        filter="url(#sombraPlaca)"
      >
        {cuerpo}
      </g>

      {/* Destellos que orbitan la placa */}
      {[0, 1, 2].map((i) => {
        const ang = (t / 46 + i * 2.1) % (Math.PI * 2);
        const p = enter(t, fps, 84 + i * 8, 20);
        const tw = pulse(frame, fps, 1.5 + i * 0.4);
        return (
          <g
            key={i}
            transform={`translate(${CX + Math.cos(ang) * 196} ${CY + 50 + Math.sin(ang) * 128}) scale(${p * (0.7 + tw * 0.6)})`}
            opacity={p * (0.4 + tw * 0.6)}
          >
            <path d={ESTRELLA} fill={theme.accent} />
          </g>
        );
      })}

      {/* Llamados de atención sobre las partes de la placa */}
      {llamados &&
        LLAMADOS.map((l) => {
          const p = enter(t, fps, l.delay, 22);
          const desde = punto(l.grados, l.dr, ry);
          const codo = {
            x: (desde.x + l.hacia.x) / 2,
            y: l.hacia.y,
          };
          const late = pulse(frame, fps, 1.6);
          return (
            <g key={l.lineas[0]} opacity={p}>
              <path
                d={`M${desde.x} ${desde.y} L${codo.x} ${codo.y} L${l.hacia.x} ${l.hacia.y}`}
                fill="none"
                stroke={theme.accent}
                strokeWidth={2.4}
                strokeLinecap="round"
                strokeLinejoin="round"
                pathLength={1}
                strokeDasharray={1}
                strokeDashoffset={1 - p}
              />
              <circle
                cx={desde.x}
                cy={desde.y}
                r={4 + late * 2.5}
                fill={theme.accent}
              />
              <text
                x={l.hacia.x + (l.ancla === "start" ? 12 : -12)}
                y={l.hacia.y - 6}
                textAnchor={l.ancla}
                fill={theme.text}
                fontFamily={FONT_STACK}
                fontSize={17}
                fontWeight={700}
              >
                {l.lineas.map((linea, j) => (
                  <tspan
                    key={linea}
                    x={l.hacia.x + (l.ancla === "start" ? 12 : -12)}
                    dy={j === 0 ? 0 : 20}
                  >
                    {linea}
                  </tspan>
                ))}
              </text>
            </g>
          );
        })}
    </svg>
  );
};
