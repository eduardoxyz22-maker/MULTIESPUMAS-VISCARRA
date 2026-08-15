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

/** Masticar / morder. */
export const IconManzana: React.FC<IconProps> = ({ size = 34, color }) => (
  <svg {...base(size)} style={{ color }}>
    <path d="M12 7.4c-1.4-1.3-3.4-1.6-5-.6-1.9 1.2-2.5 3.9-1.6 6.6.8 2.4 2.6 4.8 4.3 5.4 1 .4 1.6 0 2.3 0s1.3.4 2.3 0c1.7-.6 3.5-3 4.3-5.4.4-1.2.5-2.4.3-3.4" />
    <path d="M12 7.4V4.6M12 4.6c0-1.2 1-2.2 2.2-2.2M15.8 6.2c1.2 0 2.2-1 2.2-2.2" />
  </svg>
);

/** Sonreír / no sonreír. */
export const IconSonrisa: React.FC<IconProps> = ({ size = 34, color }) => (
  <svg {...base(size)} style={{ color }}>
    <circle cx="12" cy="12" r="8.6" />
    <path d="M7.8 13.6a4.8 4.8 0 0 0 8.4 0Z" />
    <path d="M8.6 9.2h.01M15.4 9.2h.01" strokeWidth={2.4} />
  </svg>
);

/** Los dientes vecinos se desplazan. */
export const IconMover: React.FC<IconProps> = ({ size = 34, color }) => (
  <svg {...base(size)} style={{ color }}>
    <rect x="3.4" y="7.6" width="4.4" height="9" rx="1.6" />
    <rect x="16.2" y="7.6" width="4.4" height="9" rx="1.6" />
    <path d="M10 12h1.6M14 12h-1.6" />
    <path d="m10.6 10.4 1.6 1.6-1.6 1.6M13.4 10.4 11.8 12l1.6 1.6" />
  </svg>
);

/** Hablar / pronunciar. */
export const IconHablar: React.FC<IconProps> = ({ size = 34, color }) => (
  <svg {...base(size)} style={{ color }}>
    <path d="M20.5 12.6c0 3.5-3.4 6.3-7.6 6.3-.9 0-1.8-.1-2.6-.4L5 20.4l1.3-3.2c-1.1-1.1-1.8-2.6-1.8-4.2 0-3.5 3.4-6.3 7.6-6.3s8.4 2.4 8.4 5.9Z" />
    <path d="M9.4 12.4h.01M12.6 12.4h.01M15.8 12.4h.01" strokeWidth={2.2} />
  </svg>
);

/** Toma de molde. */
export const IconMolde: React.FC<IconProps> = ({ size = 34, color }) => (
  <svg {...base(size)} style={{ color }}>
    <path d="M4.6 8.4c0 6.4 3.3 11 7.4 11s7.4-4.6 7.4-11" />
    <path d="M4.6 8.4c0-2 3.3-3.6 7.4-3.6s7.4 1.6 7.4 3.6" />
    <path d="M8 9.6v2.2M12 9.9v2.4M16 9.6v2.2" />
  </svg>
);

/** Fabricación en laboratorio. */
export const IconLab: React.FC<IconProps> = ({ size = 34, color }) => (
  <svg {...base(size)} style={{ color }}>
    <path d="M10 3.4v5.2L5.2 17a2.2 2.2 0 0 0 1.9 3.3h9.8a2.2 2.2 0 0 0 1.9-3.3L14 8.6V3.4" />
    <path d="M8.6 3.4h6.8M7.6 14.6h8.8" />
  </svg>
);

/** Listo / aprobado. */
export const IconCheck: React.FC<IconProps> = ({ size = 34, color }) => (
  <svg {...base(size)} style={{ color }}>
    <circle cx="12" cy="12" r="8.6" />
    <path d="m8.4 12.2 2.5 2.5 4.7-5.1" />
  </svg>
);

/** Proteger lo que queda. */
export const IconEscudo: React.FC<IconProps> = ({ size = 34, color }) => (
  <svg {...base(size)} style={{ color }}>
    <path d="M12 3 5 5.8v5.4c0 4 2.9 7.6 7 9.1 4.1-1.5 7-5.1 7-9.1V5.8L12 3Z" />
    <path d="m9 12 2.2 2.2L15.4 10" />
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
