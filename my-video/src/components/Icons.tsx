type IconProps = {
  size?: number;
  color: string;
};

const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
});

/** Rechinar los dientes de noche. */
export const IconLuna: React.FC<IconProps> = ({ size = 34, color }) => (
  <svg {...base(size)} style={{ color }}>
    <path d="M20 14.2A8.2 8.2 0 0 1 9.8 4a8.4 8.4 0 1 0 10.2 10.2Z" />
    <path d="M15.5 3.5h3.8l-3.8 3.4h3.8" />
  </svg>
);

/** Dolor de cabeza al despertar. */
export const IconDolor: React.FC<IconProps> = ({ size = 34, color }) => (
  <svg {...base(size)} style={{ color }}>
    <path d="M8 20v-2.2a6.5 6.5 0 1 1 8.6-6.4V13h1.6l-1.2 2.4.8.7-1 .9v1.2a1.8 1.8 0 0 1-1.8 1.8H13" />
    <path d="M12 3.2V1.4M17.6 5.2 18.9 4M6.4 5.2 5.1 4" />
  </svg>
);

/** Desgaste del esmalte. */
export const IconDiente: React.FC<IconProps> = ({ size = 34, color }) => (
  <svg {...base(size)} style={{ color }}>
    <path d="M12 3.4c-2-1-4.4-.6-5.6.9-1.3 1.6-1 3.7-.5 5.7.4 1.7.6 3.4.8 5.2.2 1.7.4 3.4 1.5 3.6 1.2.2 1.4-2.2 1.9-4 .3-1 .7-1.6 1.9-1.6s1.6.6 1.9 1.6c.5 1.8.7 4.2 1.9 4 1.1-.2 1.3-1.9 1.5-3.6.2-1.8.4-3.5.8-5.2.5-2 .8-4.1-.5-5.7-1.2-1.5-3.6-1.9-5.6-.9Z" />
    <path d="M8.6 7.6c1-.7 2.2-1 3.4-1s2.4.3 3.4 1" strokeDasharray="2 2" />
  </svg>
);

/** Tensión en la mandíbula / ATM. */
export const IconMandibula: React.FC<IconProps> = ({ size = 34, color }) => (
  <svg {...base(size)} style={{ color }}>
    <path d="M4 6.5c0-1.4 1.1-2.5 2.5-2.5h11A2.5 2.5 0 0 1 20 6.5v2A2.5 2.5 0 0 1 17.5 11H14a2 2 0 0 0-2 2v2.5" />
    <path d="M12 15.5a3.5 3.5 0 0 1-3.5 3.5H7" />
    <path d="M17.5 15.5c1.4.6 2.3 1.8 2.5 3.3M6.5 15.5c-1.4.6-2.3 1.8-2.5 3.3" />
  </svg>
);

/** Protección del esmalte. */
export const IconEscudo: React.FC<IconProps> = ({ size = 34, color }) => (
  <svg {...base(size)} style={{ color }}>
    <path d="M12 3 5 5.8v5.4c0 4 2.9 7.6 7 9.1 4.1-1.5 7-5.1 7-9.1V5.8L12 3Z" />
    <path d="m9 12 2.2 2.2L15.4 10" />
  </svg>
);

/** Alivio de la tensión. */
export const IconRelax: React.FC<IconProps> = ({ size = 34, color }) => (
  <svg {...base(size)} style={{ color }}>
    <path d="M3.5 12a8.5 8.5 0 1 1 17 0 8.5 8.5 0 0 1-17 0Z" />
    <path d="M8.4 13.6a4.6 4.6 0 0 0 7.2 0" />
    <path d="M8.6 9.4h.01M15.4 9.4h.01" strokeWidth={2.4} />
  </svg>
);

/** Mejor descanso. */
export const IconDescanso: React.FC<IconProps> = ({ size = 34, color }) => (
  <svg {...base(size)} style={{ color }}>
    <path d="M3 17v-4.5A2.5 2.5 0 0 1 5.5 10H18a3 3 0 0 1 3 3v4" />
    <path d="M3 17h18M3 20v-3M21 20v-3" />
    <path d="M6.5 10V8.2A1.2 1.2 0 0 1 7.7 7h3.1a1.2 1.2 0 0 1 1.2 1.2V10" />
  </svg>
);

export const IconWhatsapp: React.FC<IconProps> = ({ size = 34, color }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    style={{ color }}
  >
    <path d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.48 1.34 5L2 22l5.16-1.35a9.9 9.9 0 0 0 4.88 1.28h.01c5.5 0 9.96-4.46 9.96-9.96 0-2.66-1.04-5.16-2.92-7.04A9.9 9.9 0 0 0 12.04 2Zm0 18.17h-.01a8.3 8.3 0 0 1-4.22-1.15l-.3-.18-3.13.82.84-3.05-.2-.31a8.24 8.24 0 0 1-1.27-4.4c0-4.57 3.72-8.29 8.3-8.29 2.21 0 4.29.86 5.86 2.43a8.23 8.23 0 0 1 2.42 5.87c0 4.57-3.72 8.26-8.29 8.26Zm4.55-6.18c-.25-.13-1.47-.72-1.7-.81-.23-.08-.4-.12-.56.13-.17.25-.64.8-.79.97-.14.16-.29.19-.54.06a6.8 6.8 0 0 1-2-1.24 7.5 7.5 0 0 1-1.38-1.72c-.15-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.15.17-.25.25-.42.09-.16.04-.31-.02-.44-.06-.12-.56-1.35-.77-1.85-.2-.48-.4-.42-.55-.43h-.47c-.16 0-.42.06-.64.31-.22.25-.84.82-.84 2s.86 2.32.98 2.48c.13.16 1.7 2.6 4.12 3.64.58.25 1.02.4 1.37.51.58.19 1.1.16 1.52.1.46-.07 1.42-.58 1.63-1.15.2-.56.2-1.05.14-1.15-.06-.1-.22-.16-.47-.29Z" />
  </svg>
);
