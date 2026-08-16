import { AbsoluteFill, interpolate, Sequence, useCurrentFrame } from "remotion";
import { ramp, SUAVE } from "../design";

export type Direccion = "arriba" | "abajo" | "izquierda" | "derecha";

const EJE: Record<Direccion, [number, number]> = {
  arriba: [0, 1],
  abajo: [0, -1],
  izquierda: [1, 0],
  derecha: [-1, 0],
};

const SALIDA_FRAMES = 12;
/** Entrada corta y firme; el detalle fino lo pone cada escena. */
const DIST = 56;

const Movimiento: React.FC<{
  durationInFrames: number;
  dir: Direccion;
  children: React.ReactNode;
}> = ({ durationInFrames, dir, children }) => {
  const frame = useCurrentFrame();

  const entrada = ramp(frame, 0, 30);
  const salida = interpolate(
    frame,
    [durationInFrames - SALIDA_FRAMES, durationInFrames],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: SUAVE },
  );

  const [ex, ey] = EJE[dir];
  const desp = (1 - entrada) * DIST - salida * DIST * 0.6;
  /** La opacidad sube antes que el movimiento: se siente más ágil. */
  const opacity = ramp(frame, 0, 9) * (1 - salida);
  const escala = interpolate(entrada, [0, 1], [1.035, 1]) * (1 - salida * 0.04);

  return (
    <AbsoluteFill
      style={{
        opacity,
        transform: `translate(${ex * desp}px, ${ey * desp}px) scale(${escala})`,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

/** Escena con entrada expo y salida desplazada en la dirección indicada. */
export const Scene: React.FC<{
  from: number;
  durationInFrames: number;
  dir?: Direccion;
  children: React.ReactNode;
}> = ({ from, durationInFrames, dir = "arriba", children }) => (
  <Sequence from={from} durationInFrames={durationInFrames} layout="none">
    <Movimiento durationInFrames={durationInFrames} dir={dir}>
      {children}
    </Movimiento>
  </Sequence>
);
