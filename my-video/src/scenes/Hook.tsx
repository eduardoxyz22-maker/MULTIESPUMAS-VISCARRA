import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { enter, fadeUp, popIn, pulse } from "../anim";
import { SAFE } from "../layout";
import { BrandTheme } from "../theme";

export const Hook: React.FC<{ theme: BrandTheme }> = ({ theme }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const badge = enter(frame, fps, 2);
  const l1 = enter(frame, fps, 12);
  const l2 = enter(frame, fps, 22);
  const sub = enter(frame, fps, 40);
  const glow = pulse(frame, fps, 2);

  return (
    <AbsoluteFill style={{ ...SAFE, gap: 34 }}>
      <div
        style={{
          ...popIn(badge),
          alignSelf: "flex-start",
          display: "flex",
          alignItems: "center",
          gap: 16,
          padding: "16px 30px",
          borderRadius: 999,
          border: `2px solid ${theme.cardBorder}`,
          background: theme.card,
          color: theme.accent,
          fontSize: 32,
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
            opacity: 0.4 + glow * 0.6,
          }}
        />
        Bruxismo nocturno
      </div>

      <h1
        style={{
          margin: 0,
          color: theme.text,
          fontSize: 92,
          lineHeight: 1.02,
          fontWeight: 800,
          letterSpacing: -2.5,
        }}
      >
        <span style={{ display: "block", ...fadeUp(l1) }}>¿Amaneces con</span>
        <span style={{ display: "block", ...fadeUp(l2) }}>
          la <span style={{ color: theme.accent }}>mandíbula</span>
        </span>
        <span style={{ display: "block", ...fadeUp(l2) }}>tensa?</span>
      </h1>

      <p
        style={{
          ...fadeUp(sub, 30),
          margin: 0,
          color: theme.muted,
          fontSize: 42,
          lineHeight: 1.35,
          maxWidth: 800,
        }}
      >
        Aprietas los dientes mientras duermes y ni te enteras.
      </p>
    </AbsoluteFill>
  );
};
