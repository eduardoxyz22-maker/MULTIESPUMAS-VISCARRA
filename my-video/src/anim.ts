import { interpolate, spring } from "remotion";

/**
 * Entrada estándar: spring 0 → 1 con retardo en frames.
 */
export const enter = (
  frame: number,
  fps: number,
  delay = 0,
  durationInFrames = 26,
): number =>
  spring({
    frame: frame - delay,
    fps,
    durationInFrames,
    config: { damping: 200, mass: 0.7, stiffness: 120 },
  });

/** Traslada hacia arriba mientras aparece. */
export const fadeUp = (p: number, distance = 46) => ({
  opacity: p,
  transform: `translateY(${(1 - p) * distance}px)`,
});

/** Traslada desde la izquierda mientras aparece. */
export const fadeIn = (p: number, distance = 60) => ({
  opacity: p,
  transform: `translateX(${(1 - p) * -distance}px)`,
});

/** Escala suave desde 0.86 mientras aparece. */
export const popIn = (p: number, from = 0.86) => ({
  opacity: p,
  transform: `scale(${interpolate(p, [0, 1], [from, 1])})`,
});

/** Oscilación continua (respiración / brillo). */
export const pulse = (frame: number, fps: number, periodInSeconds = 2) =>
  (Math.sin((frame / (fps * periodInSeconds)) * Math.PI * 2) + 1) / 2;
