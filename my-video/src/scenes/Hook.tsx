import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { enter, fadeUp, popIn, pulse } from "../anim";
import { SonrisaHueco } from "../components/SonrisaHueco";
import { SAFE } from "../layout";
import { BrandTheme } from "../theme";

export const Hook: React.FC<{ theme: BrandTheme }> = ({ theme }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const badge = enter(frame, fps, 2);
  const l1 = enter(frame, fps, 6);
  const l2 = enter(frame, fps, 13);
  const sub = enter(frame, fps, 70);
  const glow = pulse(frame, fps, 1.8);

  return (
    <AbsoluteFill style={{ ...SAFE, alignItems: "center", gap: 30 }}>
      <div
        style={{
          ...popIn(badge),
          display: "flex",
          alignItems: "center",
          gap: 16,
          padding: "16px 30px",
          borderRadius: 999,
          border: `2px solid ${theme.cardBorder}`,
          background: theme.card,
          color: theme.accent,
          fontSize: 30,
          fontWeight: 600,
          letterSpacing: 1.4,
          textTransform: "uppercase",
        }}
      >
        <span
          style={{
            width: 14,
            height: 14,
            borderRadius: 999,
            background: theme.accent,
            opacity: 0.3 + glow * 0.7,
            transform: `scale(${0.8 + glow * 0.5})`,
          }}
        />
        Placas dentales
      </div>

      <SonrisaHueco theme={theme} />

      <h1
        style={{
          margin: 0,
          textAlign: "center",
          color: theme.text,
          fontSize: 92,
          lineHeight: 1.04,
          fontWeight: 800,
          letterSpacing: -2.4,
        }}
      >
        <span style={{ display: "block", ...fadeUp(l1) }}>¿Te falta</span>
        <span style={{ display: "block", ...fadeUp(l2) }}>
          <span style={{ color: theme.accent }}>un diente</span>?
        </span>
      </h1>

      <p
        style={{
          ...fadeUp(sub, 30),
          margin: 0,
          textAlign: "center",
          color: theme.muted,
          fontSize: 42,
          lineHeight: 1.3,
          maxWidth: 800,
        }}
      >
        Se nota al comer, al hablar y en las fotos.
      </p>
    </AbsoluteFill>
  );
};
