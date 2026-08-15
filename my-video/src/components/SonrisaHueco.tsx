import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { enter, pulse } from "../anim";
import { BrandTheme } from "../theme";

const N = 8;
/** Pieza que se cae y deja el hueco. */
const FALTA = 5;

const diente = (i: number) => {
  const centro = (N - 1) / 2;
  const dx = i - centro;
  const w = 40 - Math.abs(dx) * 2.4;
  const h = 58 - Math.abs(dx) * 3.6;
  return {
    x: 46 + i * 44,
    // El centro baja (incisivos más largos), los costados suben: curva de sonrisa.
    y: 30 + (12.25 - dx * dx) * 1.7,
    w,
    h,
  };
};

/**
 * Hilera de dientes en la que una pieza se cae y deja el hueco.
 * Es el gancho visual del reel: se entiende sin leer nada.
 */
export const SonrisaHueco: React.FC<{ theme: BrandTheme; delay?: number }> = ({
  theme,
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame - delay;

  /** La pieza se afloja, cae y desaparece. */
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
  const hueco = interpolate(t, [58, 72], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const late = pulse(frame, fps, 1.3);

  return (
    <svg
      viewBox="0 0 400 150"
      style={{ width: 640, height: 240, overflow: "visible" }}
    >
      <defs>
        <linearGradient id="esmalteFila" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#D9E1DB" />
        </linearGradient>
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
        const p = enter(t, fps, delay ? 0 : i * 3, 20);
        const esFalta = i === FALTA;

        return (
          <g key={i} opacity={p}>
            {esFalta ? (
              <>
                {/* Marca del hueco que queda */}
                <rect
                  x={d.x - d.w / 2}
                  y={d.y}
                  width={d.w}
                  height={d.h}
                  rx={d.w * 0.3}
                  fill="rgba(0,0,0,0.45)"
                  stroke={theme.accent}
                  strokeWidth={3}
                  strokeDasharray="7 7"
                  opacity={hueco * (0.55 + late * 0.45)}
                />
                <g
                  transform={`translate(${d.x} ${d.y + caida}) rotate(${giro})`}
                  opacity={seVa}
                >
                  <rect
                    x={-d.w / 2}
                    y={0}
                    width={d.w}
                    height={d.h}
                    rx={d.w * 0.3}
                    fill="url(#esmalteFila)"
                  />
                </g>
              </>
            ) : (
              <rect
                x={d.x - d.w / 2}
                y={d.y}
                width={d.w}
                height={d.h}
                rx={d.w * 0.3}
                fill="url(#esmalteFila)"
              />
            )}
          </g>
        );
      })}
    </svg>
  );
};
