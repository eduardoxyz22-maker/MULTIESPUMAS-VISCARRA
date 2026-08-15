import {
  AbsoluteFill,
  interpolate,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { enter } from "../anim";

export type Direccion = "arriba" | "abajo" | "izquierda" | "derecha";

const EJE: Record<Direccion, [number, number]> = {
  arriba: [0, 1],
  abajo: [0, -1],
  izquierda: [1, 0],
  derecha: [-1, 0],
};

const SALIDA = 12;
const DIST = 90;

const Movimiento: React.FC<{
  durationInFrames: number;
  dir: Direccion;
  children: React.ReactNode;
}> = ({ durationInFrames, dir, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrada = enter(frame, fps, 0, 22);
  const salida = interpolate(
    frame,
    [durationInFrames - SALIDA, durationInFrames],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const [ex, ey] = EJE[dir];
  const desp = (1 - entrada) * DIST - salida * DIST * 0.75;
  const opacity = entrada * (1 - salida);
  const scale = interpolate(salida, [0, 1], [1, 0.94]);

  return (
    <AbsoluteFill
      style={{
        opacity,
        transform: `translate(${ex * desp}px, ${ey * desp}px) scale(${scale})`,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

/** Escena con entrada elástica y salida desplazada en la dirección indicada. */
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
