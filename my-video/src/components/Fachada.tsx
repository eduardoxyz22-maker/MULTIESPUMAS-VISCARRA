import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { enter, pulse } from "../anim";
import { LOOKS, Persona } from "./Persona";
import { BrandTheme, FONT_STACK } from "../theme";

const PISO = 402;
const PUERTA = 400;

/** Quién llega, cuándo sale de cuadro y a qué velocidad camina. */
const CAMINANTES = [
  { look: 0, salida: 0, vel: 5.2, desde: -80 },
  { look: 1, salida: 30, vel: 4.6, desde: -80 },
  { look: 2, salida: 12, vel: -5.0, desde: 880 },
  { look: 3, salida: 62, vel: 5.8, desde: -80 },
];

/**
 * Fachada del consultorio con pacientes llegando y entrando.
 *
 * La puerta se abre sola: su apertura es la suma de campanas gaussianas
 * centradas en la posición de cada persona, así que se abre justo cuando
 * alguien llega y se cierra cuando ya entró.
 */
export const Fachada: React.FC<{ theme: BrandTheme; delay?: number }> = ({
  theme,
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame - delay;

  const edificio = enter(t, fps, 0, 26);
  const rotulo = enter(t, fps, 14, 24);
  const luces = interpolate(t, [26, 44], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const late = pulse(frame, fps, 1.4);

  const gente = CAMINANTES.map((c) => {
    const avance = Math.max(0, t - c.salida);
    const x = c.desde + avance * c.vel;
    const llegando = c.vel > 0 ? x : 800 - x;
    const entrado = interpolate(llegando, [PUERTA - 20, PUERTA + 40], [1, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
    return { ...c, x, entrado, fase: avance * 0.4 };
  });

  const apertura = Math.min(
    1,
    gente.reduce((acc, g) => {
      const d = g.x - PUERTA;
      return acc + Math.exp(-(d * d) / 2600) * (g.entrado > 0.02 ? 1 : 0);
    }, 0),
  );

  const nombreCorto = theme.clinica.length > 20;

  return (
    <svg viewBox="90 46 620 384" style={{ width: "100%", overflow: "visible" }}>
      <defs>
        <linearGradient id="pared" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.13)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.04)" />
        </linearGradient>
        <linearGradient id="vidrio" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFF6D8" stopOpacity={0.9} />
          <stop offset="100%" stopColor="#FFD98A" stopOpacity={0.35} />
        </linearGradient>
      </defs>

      <g
        opacity={edificio}
        transform={`translate(0 ${(1 - edificio) * 26})`}
      >
        {/* Cuerpo del local */}
        <rect
          x={150}
          y={70}
          width={500}
          height={332}
          rx={26}
          fill="url(#pared)"
          stroke={theme.cardBorder}
          strokeWidth={3}
        />

        {/* Rótulo */}
        <g opacity={rotulo}>
          <rect
            x={176}
            y={92}
            width={448}
            height={74}
            rx={18}
            fill={theme.accent}
            opacity={0.16}
          />
          <rect
            x={176}
            y={92}
            width={448}
            height={74}
            rx={18}
            fill="none"
            stroke={theme.accent}
            strokeWidth={2.5}
            opacity={0.5 + late * 0.5}
          />
          <text
            x={400}
            y={140}
            textAnchor="middle"
            fill={theme.accent}
            fontFamily={FONT_STACK}
            fontSize={nombreCorto ? 30 : 38}
            fontWeight={800}
            letterSpacing={nombreCorto ? 0 : 1}
          >
            {theme.clinica}
          </text>
        </g>

        {/* Toldo a rayas */}
        <g>
          {Array.from({ length: 8 }, (_, i) => (
            <path
              key={i}
              d={`M${176 + i * 56} 186 h56 l-10 34 h-56 Z`}
              fill={i % 2 ? theme.accent : "rgba(255,255,255,0.85)"}
              opacity={0.85}
            />
          ))}
          <rect x={166} y={180} width={468} height={10} rx={5} fill={theme.accent} />
        </g>

        {/* Vitrinas encendidas */}
        {[
          { x: 186, w: 150 },
          { x: 466, w: 150 },
        ].map((v) => (
          <g key={v.x}>
            <rect
              x={v.x}
              y={240}
              width={v.w}
              height={118}
              rx={12}
              fill="url(#vidrio)"
              opacity={0.25 + luces * 0.6}
            />
            <rect
              x={v.x}
              y={240}
              width={v.w}
              height={118}
              rx={12}
              fill="none"
              stroke="rgba(255,255,255,0.35)"
              strokeWidth={2.5}
            />
          </g>
        ))}

        {/* Puerta: dos hojas que se abren cuando alguien llega */}
        <g>
          {/* Vano iluminado: se ve que adentro hay luz */}
          <rect
            x={344}
            y={222}
            width={116}
            height={180}
            rx={12}
            fill="rgba(0,0,0,0.6)"
          />
          <rect
            x={352}
            y={230}
            width={100}
            height={172}
            rx={10}
            fill="url(#vidrio)"
            opacity={0.18 + luces * 0.45}
          />
          {[-1, 1].map((lado) => {
            const bisagra = lado < 0 ? 352 : 452;
            return (
              <g
                key={lado}
                transform={`translate(${bisagra} 0) scale(${1 - apertura * 0.88} 1) translate(${-bisagra} 0)`}
              >
                <rect
                  x={lado < 0 ? 352 : 402}
                  y={228}
                  width={50}
                  height={174}
                  rx={8}
                  fill="url(#vidrio)"
                  opacity={0.5 + luces * 0.3}
                  stroke="rgba(255,255,255,0.55)"
                  strokeWidth={2.5}
                />
              </g>
            );
          })}
        </g>

        {/* Vereda */}
        <rect x={40} y={PISO} width={720} height={7} rx={3.5} fill="rgba(255,255,255,0.22)" />
      </g>

      {/* Pacientes llegando */}
      {gente.map((g, i) => (
        <g
          key={i}
          transform={`translate(${g.x} ${PISO}) scale(1.22)`}
          opacity={edificio * g.entrado}
        >
          <Persona
            look={LOOKS[g.look]}
            fase={g.fase}
            sentido={g.vel > 0 ? 1 : -1}
          />
        </g>
      ))}
    </svg>
  );
};
