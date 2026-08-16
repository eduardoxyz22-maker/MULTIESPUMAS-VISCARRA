import { useCurrentFrame } from "remotion";
import { ramp, TIPO } from "../design";

/**
 * Titular con revelado por máscara: cada línea sube desde detrás de su propio
 * borde, escalonada. Es el recurso que distingue un titular animado de un
 * texto con fade, y no cuesta nada: un contenedor con `overflow: hidden` y el
 * texto desplazado dentro.
 */
export const Titular: React.FC<{
  lineas: React.ReactNode[];
  color: string;
  desde?: number;
  tam?: number;
  peso?: number;
  interlinea?: number;
  alineado?: "left" | "center";
  escalonado?: number;
}> = ({
  lineas,
  color,
  desde = 0,
  tam = TIPO.titulo.fontSize,
  peso = TIPO.titulo.fontWeight,
  interlinea = TIPO.titulo.lineHeight,
  alineado = "left",
  escalonado = 5,
}) => {
  const frame = useCurrentFrame();

  return (
    <h2
      style={{
        margin: 0,
        textAlign: alineado,
        color,
        fontSize: tam,
        fontWeight: peso,
        lineHeight: interlinea,
        // Corrección óptica: cuanto más grande, más cerrado el interletrado.
        letterSpacing: -tam * 0.032,
      }}
    >
      {lineas.map((linea, i) => {
        const p = ramp(frame, desde + i * escalonado, 30);
        return (
          <span
            key={i}
            style={{
              display: "block",
              overflow: "hidden",
              paddingBottom: tam * 0.08,
              marginBottom: -tam * 0.08,
            }}
          >
            <span
              style={{
                display: "block",
                transform: `translateY(${(1 - p) * 112}%)`,
              }}
            >
              {linea}
            </span>
          </span>
        );
      })}
    </h2>
  );
};

/** Rótulo pequeño en versalitas, con una línea que se estira al lado. */
export const Rotulo: React.FC<{
  texto: string;
  color: string;
  desde?: number;
  centrado?: boolean;
}> = ({ texto, color, desde = 0, centrado = false }) => {
  const frame = useCurrentFrame();
  const p = ramp(frame, desde, 24);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: centrado ? "center" : "flex-start",
        gap: 18,
        opacity: p,
      }}
    >
      <span
        style={{
          height: 3,
          width: 54 * p,
          borderRadius: 999,
          background: color,
        }}
      />
      <span style={{ ...TIPO.rotulo, color }}>{texto}</span>
    </div>
  );
};
