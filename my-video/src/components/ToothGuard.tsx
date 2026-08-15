import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { enter, pulse } from "../anim";
import { BrandTheme } from "../theme";

const TOOTH =
  "M100 22 C70 5, 34 21, 31 62 C29 98, 47 112, 54 152 C59 188, 61 224, 78 226 C93 228, 92 182, 100 162 C108 182, 107 228, 122 226 C139 224, 141 188, 146 152 C153 112, 171 98, 169 62 C166 21, 130 5, 100 22 Z";

/** Placa de descarga: cofia translúcida que calza sobre la corona. */
const GUARD =
  "M24 60 C24 30, 60 10, 100 26 C140 10, 176 30, 176 60 C176 84, 164 96, 152 102 C128 110, 72 110, 48 102 C36 96, 24 84, 24 60 Z";

const SPARKS = [
  { x: 34, y: 40, d: 34 },
  { x: 168, y: 74, d: 44 },
  { x: 52, y: 150, d: 54 },
];

/**
 * Animación central: el diente aparece, la placa baja y calza,
 * y queda un brillo de protección respirando.
 */
export const ToothGuard: React.FC<{ theme: BrandTheme; delay?: number }> = ({
  theme,
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const toothIn = enter(frame, fps, delay, 30);
  const guardIn = enter(frame, fps, delay + 16, 34);
  const glow = pulse(frame, fps, 2.4);

  const guardY = interpolate(guardIn, [0, 1], [-170, 0]);
  const settle = interpolate(guardIn, [0.75, 1], [1.04, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <svg
      viewBox="0 0 200 240"
      style={{
        width: 470,
        height: 564,
        overflow: "visible",
        opacity: toothIn,
        transform: `scale(${interpolate(toothIn, [0, 1], [0.9, 1])})`,
      }}
    >
      <defs>
        <linearGradient id="esmalte" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="55%" stopColor="#F2F6F1" />
          <stop offset="100%" stopColor="#D2DBD6" />
        </linearGradient>
        <linearGradient id="placa" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={theme.accent} stopOpacity={0.42} />
          <stop offset="100%" stopColor={theme.accent} stopOpacity={0.16} />
        </linearGradient>
        <radialGradient id="halo" cx="50%" cy="42%" r="50%">
          <stop offset="0%" stopColor={theme.accent} stopOpacity={0.34} />
          <stop offset="100%" stopColor={theme.accent} stopOpacity={0} />
        </radialGradient>
      </defs>

      <circle
        cx={100}
        cy={104}
        r={110}
        fill="url(#halo)"
        opacity={0.5 + glow * 0.5}
      />

      <path d={TOOTH} fill="url(#esmalte)" />
      <path
        d={TOOTH}
        fill="none"
        stroke="rgba(9,20,14,0.16)"
        strokeWidth={1.6}
      />

      <g transform={`translate(0 ${guardY}) scale(${settle}) translate(0 ${(1 - settle) * 60})`}>
        <path
          d={GUARD}
          fill="url(#placa)"
          stroke={theme.accent}
          strokeWidth={2.6}
          strokeLinejoin="round"
          opacity={0.5 + guardIn * 0.5}
        />
        <path
          d="M40 52 C48 34, 74 24, 100 36"
          fill="none"
          stroke="#FFFFFF"
          strokeOpacity={0.55}
          strokeWidth={4}
          strokeLinecap="round"
        />
      </g>

      {SPARKS.map((s, i) => {
        const p = enter(frame, fps, delay + s.d, 22);
        const tw = pulse(frame, fps, 1.6 + i * 0.35);
        return (
          <g
            key={i}
            transform={`translate(${s.x} ${s.y}) scale(${p * (0.75 + tw * 0.45)})`}
            opacity={p * (0.45 + tw * 0.55)}
          >
            <path
              d="M0 -11 L2.6 -2.6 L11 0 L2.6 2.6 L0 11 L-2.6 2.6 L-11 0 L-2.6 -2.6 Z"
              fill={theme.accent}
            />
          </g>
        );
      })}
    </svg>
  );
};
