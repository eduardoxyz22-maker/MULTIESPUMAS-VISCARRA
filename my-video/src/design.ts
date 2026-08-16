import { Easing, interpolate } from "remotion";

/**
 * Curvas de animación.
 *
 * El spring genérico hace que todo entre "rebotando igual", que es lo que
 * delata una plantilla. Estas dos curvas son las de motion profesional:
 * expo-out para entradas (arranca rapidísimo y frena largo) y una sigmoide
 * para movimientos que entran y salen.
 */
export const SALIDA = Easing.bezier(0.16, 1, 0.3, 1);
export const SUAVE = Easing.bezier(0.65, 0, 0.35, 1);
export const ENTRADA = Easing.bezier(0.7, 0, 0.84, 0);

/** Rampa 0 → 1 en frames, con easing. */
export const ramp = (
  frame: number,
  desde: number,
  duracion = 26,
  easing = SALIDA,
) =>
  interpolate(frame, [desde, desde + duracion], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing,
  });

/** Rampa 0 → 1 → 0. */
export const pico = (
  frame: number,
  desde: number,
  subida: number,
  bajada: number,
) =>
  interpolate(
    frame,
    [desde, desde + subida, desde + subida + bajada],
    [0, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: SUAVE },
  );

/**
 * Escala tipográfica. El interletrado se cierra a medida que crece el cuerpo
 * (corrección óptica): sin esto los titulares grandes se ven sueltos.
 */
export const TIPO = {
  rotulo: {
    fontSize: 28,
    fontWeight: 700,
    letterSpacing: 5,
    textTransform: "uppercase" as const,
  },
  display: { fontSize: 108, fontWeight: 900, lineHeight: 0.96 },
  titulo: { fontSize: 82, fontWeight: 800, lineHeight: 1.02 },
  subtitulo: { fontSize: 40, fontWeight: 500, lineHeight: 1.3 },
  tarjetaTitulo: { fontSize: 44, fontWeight: 700, lineHeight: 1.1 },
  tarjetaTexto: { fontSize: 32, fontWeight: 500, lineHeight: 1.28 },
  chip: { fontSize: 31, fontWeight: 600 },
};
