/**
 * Persona caminando, en SVG.
 *
 * Origen local: los pies en (0, 0). El ciclo de marcha es un seno: las
 * piernas giran en oposición, los brazos al revés y el cuerpo sube y baja
 * al doble de frecuencia.
 */
export type PersonaLook = {
  ropa: string;
  pelo: string;
  piel: string;
  /** Un poco de variedad de estatura: 0.9 – 1.1 */
  altura?: number;
};

export const LOOKS: PersonaLook[] = [
  { ropa: "#E8E3DA", pelo: "#2B2118", piel: "#C98F63", altura: 1 },
  { ropa: "#7FA8C9", pelo: "#171310", piel: "#8B5E3C", altura: 0.94 },
  { ropa: "#D98C8C", pelo: "#3A2A1E", piel: "#D8A87C", altura: 1.06 },
  { ropa: "#9BD0A8", pelo: "#241A12", piel: "#A9714A", altura: 0.9 },
  { ropa: "#C9B6E8", pelo: "#4A3423", piel: "#E0B189", altura: 1.02 },
];

export const Persona: React.FC<{
  look: PersonaLook;
  /** Fase del ciclo de marcha en radianes. */
  fase: number;
  /** 0 = quieto (de pie), 1 = caminando. */
  paso?: number;
  /** 1 mira a la derecha, -1 a la izquierda. */
  sentido?: number;
}> = ({ look, fase, paso = 1, sentido = 1 }) => {
  const h = look.altura ?? 1;
  const swing = Math.sin(fase) * 26 * paso;
  const brazo = -swing * 0.75;
  const bote = Math.abs(Math.sin(fase * 2)) * 2.2 * paso;

  return (
    <g transform={`scale(${sentido * h} ${h}) translate(0 ${-bote})`}>
      {/* Sombra en el piso */}
      <ellipse cx={0} cy={2} rx={13} ry={3.4} fill="rgba(0,0,0,0.35)" />

      {/* Piernas */}
      {[swing, -swing].map((a, i) => (
        <g key={i} transform={`rotate(${a} 0 -44)`}>
          <rect
            x={-4.6}
            y={-46}
            width={9}
            height={46}
            rx={4.5}
            fill={i === 0 ? "#2E3A46" : "#26313B"}
          />
          <rect x={-5.4} y={-5} width={12} height={5} rx={2.5} fill="#15181C" />
        </g>
      ))}

      {/* Brazos detrás del torso */}
      <g transform={`rotate(${brazo} 0 -74)`}>
        <rect
          x={-4}
          y={-76}
          width={8}
          height={32}
          rx={4}
          fill={look.piel}
          opacity={0.85}
        />
      </g>

      {/* Torso */}
      <path
        d={`M-13 -44 L-11 -76 Q0 -82 11 -76 L13 -44 Q0 -40 -13 -44 Z`}
        fill={look.ropa}
      />

      {/* Brazo delantero */}
      <g transform={`rotate(${-brazo} 0 -74)`}>
        <rect x={-4} y={-76} width={8} height={32} rx={4} fill={look.piel} />
      </g>

      {/* Cuello y cabeza */}
      <rect x={-3.4} y={-84} width={7} height={9} rx={3} fill={look.piel} />
      <circle cx={0} cy={-93} r={11} fill={look.piel} />
      <path
        d="M-11 -95 Q-9 -106 0 -105 Q9 -106 11 -95 Q6 -100 0 -99 Q-6 -100 -11 -95 Z"
        fill={look.pelo}
      />
    </g>
  );
};
