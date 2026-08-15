import "./index.css";
import { Composition } from "remotion";
import { DURACION_TOTAL, PlacasDentales } from "./PlacasDentales";
import { COSMETIC, SPADENTAL } from "./theme";

/** Reel vertical para Instagram / TikTok / estados de WhatsApp. */
const FORMATO = {
  fps: 30,
  width: 1080,
  height: 1920,
  durationInFrames: DURACION_TOTAL,
} as const;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="PlacasDentales-Spadental"
        component={PlacasDentales}
        defaultProps={{ theme: SPADENTAL }}
        {...FORMATO}
      />
      <Composition
        id="PlacasDentales-Cosmetic"
        component={PlacasDentales}
        defaultProps={{ theme: COSMETIC }}
        {...FORMATO}
      />
    </>
  );
};
