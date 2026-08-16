import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { enter, pulse } from "../anim";
import { BrandTheme } from "../theme";

const RUTA = "M70 250 L70 176 L286 176 L286 96 L520 96 L520 132";
const PIN_X = 520;
const PIN_Y = 132;

/** Mini mapa: la ruta se dibuja sola y el pin cae sobre el consultorio. */
export const MapaPin: React.FC<{ theme: BrandTheme; delay?: number }> = ({
  theme,
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame - delay;

  const tarjeta = enter(t, fps, 0, 24);
  const ruta = interpolate(t, [12, 62], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const pin = enter(t, fps, 56, 26);
  const onda = ((frame - delay) % 54) / 54;
  const late = pulse(frame, fps, 1.5);

  return (
    <svg viewBox="0 0 640 300" style={{ width: "100%", overflow: "visible" }}>
      <g opacity={tarjeta}>
        <rect
          x={8}
          y={8}
          width={624}
          height={284}
          rx={30}
          fill="rgba(255,255,255,0.05)"
          stroke={theme.cardBorder}
          strokeWidth={3}
        />

        {/* Manzanas y calles */}
        {[
          [40, 40, 210, 110],
          [270, 40, 150, 110],
          [440, 40, 160, 110],
          [40, 176, 150, 84],
          [210, 176, 190, 84],
          [420, 176, 180, 84],
        ].map(([x, y, w, h]) => (
          <rect
            key={`${x}-${y}`}
            x={x}
            y={y}
            width={w}
            height={h}
            rx={10}
            fill="rgba(255,255,255,0.05)"
          />
        ))}
      </g>

      {/* Ruta que se dibuja */}
      <path
        d={RUTA}
        fill="none"
        stroke={theme.accent}
        strokeWidth={7}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="14 12"
        pathLength={1}
        opacity={0.9}
        style={{
          strokeDasharray: "1",
          strokeDashoffset: 1 - ruta,
        }}
      />
      <circle cx={70} cy={250} r={11} fill={theme.accent} opacity={tarjeta} />
      <circle
        cx={70}
        cy={250}
        r={19}
        fill="none"
        stroke={theme.accent}
        strokeWidth={3}
        opacity={tarjeta * 0.5}
      />

      {/* Onda que sale del pin */}
      <ellipse
        cx={PIN_X}
        cy={PIN_Y + 42}
        rx={interpolate(onda, [0, 1], [16, 74])}
        ry={interpolate(onda, [0, 1], [5, 24])}
        fill="none"
        stroke={theme.accent}
        strokeWidth={3}
        opacity={pin * interpolate(onda, [0, 1], [0.55, 0])}
      />

      {/* Pin */}
      <g
        transform={`translate(${PIN_X} ${PIN_Y}) translate(0 ${(1 - pin) * -150}) scale(${0.9 + late * 0.08})`}
        opacity={pin}
      >
        <path
          d="M0 42 C0 42 34 6 34 -12 A34 34 0 1 0 -34 -12 C-34 6 0 42 0 42 Z"
          fill={theme.accent}
          stroke="rgba(0,0,0,0.25)"
          strokeWidth={2}
        />
        {/* Diente dentro del pin */}
        <path
          d="M0 -30 C-9 -35, -20 -30, -20 -18 C-20 -8, -16 -4, -14 6 C-13 13, -12 18, -9 18 C-5 18, -5 6, 0 3 C5 6, 5 18, 9 18 C12 18, 13 13, 14 6 C16 -4, 20 -8, 20 -18 C20 -30, 9 -35, 0 -30 Z"
          fill={theme.accentInk}
        />
      </g>
    </svg>
  );
};
