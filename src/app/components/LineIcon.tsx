import type { ReactNode } from "react";

export type IconName =
  | "globe"
  | "handshake"
  | "sparkle"
  | "sprout"
  | "phone"
  | "trophy"
  | "menu"
  | "tent"
  | "utensils"
  | "pin"
  | "calendar"
  | "users"
  | "check"
  | "close"
  | "search"
  | "paw"
  | "beach"
  | "mountain"
  | "culture"
  | "leaf"
  | "coin"
  | "sun"
  | "plane"
  | "language"
  | "badge"
  | "clock"
  | "plug"
  | "medical"
  | "volcano"
  | "island"
  | "snorkel"
  | "mail"
  | "warning"
  | "info";

const shapes: Record<IconName, ReactNode> = {
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
    </>
  ),
  handshake: (
    <>
      <path d="m3 12 4-4 4 1 2-1 5 1 3 3-7 7-4-1-3-3-4-3Z" />
      <path d="m7 8 3-3 5 1 3 3M8 14l3 3m0-4 3 3m0-5 3 3" />
    </>
  ),
  sparkle: (
    <>
      <path d="m12 3 1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5L12 3Z" />
      <path d="m19 15 .8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15Z" />
    </>
  ),
  sprout: (
    <>
      <path d="M12 21v-9" />
      <path d="M12 12C7 12 4 9 4 4c5 0 8 3 8 8ZM12 15c0-5 3-8 8-8 0 5-3 8-8 8Z" />
      <path d="M7 21h10" />
    </>
  ),
  phone: (
    <>
      <path d="M7 3h10a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
      <path d="M11 18h2" />
    </>
  ),
  trophy: (
    <>
      <path d="M8 21h8m-4-4v4M7 4h10v5a5 5 0 0 1-10 0V4Z" />
      <path d="M7 6H4v2a4 4 0 0 0 4 4m9-6h3v2a4 4 0 0 1-4 4" />
    </>
  ),
  menu: <path d="M4 6h16M4 12h16M4 18h16" />,
  tent: (
    <>
      <path d="m3 20 9-16 9 16H3Z" />
      <path d="m12 4 1 16m-4-7h6" />
    </>
  ),
  utensils: (
    <>
      <path d="M7 3v7m-3-7v4a3 3 0 0 0 6 0V3m-3 7v11M17 3v18m0-18c3 3 3 8 0 10" />
    </>
  ),
  pin: (
    <>
      <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M16 3v4M8 3v4M3 10h18" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20v-1a6 6 0 0 1 12 0v1H3Zm13-11a3 3 0 1 0 0-6m1 11a5 5 0 0 1 4 5" />
    </>
  ),
  check: <path d="m5 12 4 4L19 6" />,
  close: <path d="m6 6 12 12M18 6 6 18" />,
  search: (
    <>
      <circle cx="10.8" cy="10.8" r="6.8" />
      <path d="m16 16 5 5" />
    </>
  ),
  paw: (
    <>
      <ellipse cx="12" cy="16" rx="5" ry="4" />
      <ellipse cx="5.5" cy="10" rx="1.7" ry="2.3" />
      <ellipse cx="10" cy="6.5" rx="1.7" ry="2.3" />
      <ellipse cx="15" cy="6.5" rx="1.7" ry="2.3" />
      <ellipse cx="18.5" cy="10" rx="1.7" ry="2.3" />
    </>
  ),
  beach: (
    <>
      <path d="M3 17c3-2 5-2 8 0s5 2 10 0M3 21c3-2 5-2 8 0s5 2 10 0" />
      <path d="M12 15V4m0 4c-1-3-4-4-7-3 1 3 3 5 7 5m0-3c1-3 4-4 7-3-1 3-3 5-7 5" />
    </>
  ),
  mountain: <path d="m2 20 7-12 4 6 3-4 6 10H2Zm7-12V5m-2 3h4" />,
  culture: (
    <>
      <circle cx="8" cy="8" r="3" />
      <circle cx="17" cy="9" r="2.5" />
      <path d="M2.5 20a5.5 5.5 0 0 1 11 0m1-4a4.5 4.5 0 0 1 7 4" />
    </>
  ),
  leaf: (
    <>
      <path d="M20 4C10 3 4 7 4 14a6 6 0 0 0 6 6c7 0 11-6 10-16Z" />
      <path d="M4 20c3-5 7-8 13-11" />
    </>
  ),
  coin: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M15 8.5c-.7-.7-1.7-1-3-1-1.7 0-3 1-3 2.3 0 3.7 6 1.7 6 5.1 0 1.4-1.3 2.6-3.2 2.6-1.3 0-2.5-.5-3.3-1.3M12 6v12" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
    </>
  ),
  plane: (
    <>
      <path d="m3 11 18-7-7 18-3-8-8-3Z" />
      <path d="m11 14 5-5" />
    </>
  ),
  language: (
    <>
      <path d="M4 5h12M10 3v2m-4 0c0 5 3 8 7 10M13 5c0 4-3 8-7 10m8 6 4-10 4 10m-6-3h4" />
    </>
  ),
  badge: (
    <>
      <path d="M12 3 5 6v5c0 5 3 8 7 10 4-2 7-5 7-10V6l-7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  plug: (
    <>
      <path d="M9 3v6m6-6v6M7 9h10v2a5 5 0 0 1-5 5v5m-3-10h6" />
    </>
  ),
  medical: (
    <>
      <path d="M10 3h4v7h7v4h-7v7h-4v-7H3v-4h7V3Z" />
    </>
  ),
  volcano: (
    <>
      <path d="m3 20 6-12 3 4 3-4 6 12H3Z" />
      <path d="M12 5V2m-3 2 3 2 3-2" />
    </>
  ),
  island: (
    <>
      <path d="M3 19c4-2 14-2 18 0M12 16V5m0 4c-2-4-5-5-8-4 1 4 4 6 8 6m0-4c2-4 5-5 8-4-1 4-4 6-8 6" />
    </>
  ),
  snorkel: (
    <>
      <path d="M5 6v5a7 7 0 0 0 14 0V7" />
      <path d="M3 6h4v4H3zm14 0h4v4h-4zM3 19c2-1 4-1 6 0s4 1 6 0 4-1 6 0" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </>
  ),
  warning: (
    <>
      <path d="M12 3 2.8 19h18.4L12 3Z" />
      <path d="M12 9v4m0 3h.01" />
    </>
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5m0-8h.01" />
    </>
  ),
};

export default function LineIcon({
  name,
  size = 20,
  className,
}: {
  name: IconName;
  size?: number;
  className?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      className={["line-icon", className].filter(Boolean).join(" ")}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      focusable="false"
    >
      {shapes[name]}
    </svg>
  );
}
