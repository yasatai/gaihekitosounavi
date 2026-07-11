/** Inline SVG icons extracted from the original markup. */

export function LogoMark({ size = 38 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden>
      <rect x="2" y="2" width="44" height="44" rx="11" fill="#15304d" />
      <path d="M11 25 L24 13 L37 25" stroke="#fff" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14.5 24 V35 H33.5 V24" stroke="#fff" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20 35 V28.5 H28 V35" stroke="#b8923f" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function LogoMarkLight({ size = 38 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden>
      <path d="M9 26 L24 12 L39 26" stroke="#fff" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13 25 V38 H35 V25" stroke="#fff" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M19.5 38 V30 H28.5 V38" stroke="#cba968" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconDiagnose() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden>
      <circle cx="14" cy="14" r="9" stroke="#15304d" strokeWidth="2.2" />
      <path d="M10 14.5 l3 3 l6 -7" stroke="#b8923f" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="20.5" y1="20.5" x2="27" y2="27" stroke="#15304d" strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  );
}

export function IconCompare() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden>
      <line x1="9" y1="24" x2="9" y2="15" stroke="#15304d" strokeWidth="3" strokeLinecap="round" />
      <line x1="16" y1="24" x2="16" y2="8" stroke="#b8923f" strokeWidth="3" strokeLinecap="round" />
      <line x1="23" y1="24" x2="23" y2="18" stroke="#15304d" strokeWidth="3" strokeLinecap="round" />
      <line x1="5" y1="27.5" x2="27" y2="27.5" stroke="#15304d" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function IconEstimate() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden>
      <path d="M9 5 H20 L24 9 V27 H9 Z" stroke="#15304d" strokeWidth="2.2" strokeLinejoin="round" />
      <line x1="12" y1="13" x2="20" y2="13" stroke="#15304d" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="12" y1="17" x2="18" y2="17" stroke="#15304d" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="22" cy="22" r="5.4" fill="#fff" stroke="#b8923f" strokeWidth="2" />
      <path d="M19.7 22 l1.7 1.7 l3 -3.4" stroke="#b8923f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconAward() {
  return (
    <svg width="34" height="34" viewBox="0 0 32 32" fill="none" aria-hidden>
      <circle cx="16" cy="12.5" r="7.5" stroke="#15304d" strokeWidth="2.2" />
      <path d="M16 9 l1.3 2.7 l3 .4 l-2.15 2.05 .5 2.95 -2.65 -1.4 -2.65 1.4 .5 -2.95 -2.15 -2.05 3 -.4 z" fill="#b8923f" />
      <path d="M11.5 18.5 L9 28 L13 25.5 L16 28 L19 25.5 L23 28 L20.5 18.5" stroke="#15304d" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

export function IconLocation() {
  return (
    <svg width="34" height="34" viewBox="0 0 32 32" fill="none" aria-hidden>
      <path d="M16 4 C10.8 4 7.2 7.9 7.2 12.4 C7.2 18.8 16 28 16 28 C16 28 24.8 18.8 24.8 12.4 C24.8 7.9 21.2 4 16 4 Z" stroke="#15304d" strokeWidth="2.2" strokeLinejoin="round" />
      <circle cx="16" cy="12.4" r="3.3" fill="#b8923f" />
    </svg>
  );
}

export function IconPhoto() {
  return (
    <svg width="34" height="34" viewBox="0 0 32 32" fill="none" aria-hidden>
      <rect x="5" y="7" width="22" height="18" rx="2" stroke="#15304d" strokeWidth="2.2" />
      <circle cx="11" cy="13" r="2.2" fill="#b8923f" />
      <path d="M6.5 23 L13.5 16 L18 20.5 L22 17 L25.5 20" stroke="#15304d" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

/* ===== Hero 用（currentColor でゴールド等に着色） ===== */

export function IconCrown({ size = 30 }: { size?: number }) {
  return (
    <svg width={size} height={(size * 26) / 40} viewBox="0 0 40 26" fill="currentColor" aria-hidden>
      <path d="M5 23 L2.5 9 L12 15 L20 4 L28 15 L37.5 9 L35 23 Z" />
      <circle cx="2.5" cy="7" r="2.3" />
      <circle cx="20" cy="2.6" r="2.6" />
      <circle cx="37.5" cy="7" r="2.3" />
    </svg>
  );
}

export function IconGuarantee() {
  return (
    <svg width="30" height="30" viewBox="0 0 32 32" fill="none" stroke="currentColor" aria-hidden>
      <path d="M10.5 27 C5 24.5 3 19 4.5 12.5" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M21.5 27 C27 24.5 29 19 27.5 12.5" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M7 11 q1.6 -1.4 3.4 -0.6 M6.2 15.5 q1.9 -1 3.6 0.2 M25 11 q-1.6 -1.4 -3.4 -0.6 M25.8 15.5 q-1.9 -1 -3.6 0.2" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M11.5 15.5 l3.2 3.2 l6.4 -7" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconFairPrice() {
  return (
    <svg width="30" height="30" viewBox="0 0 32 32" fill="none" stroke="currentColor" aria-hidden>
      <path d="M8 4 H19 L24 9 V28 H8 Z" strokeWidth="2" strokeLinejoin="round" />
      <line x1="11" y1="11" x2="19" y2="11" strokeWidth="1.6" strokeLinecap="round" />
      <line x1="11" y1="15" x2="16.5" y2="15" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="15" cy="21" r="4.3" strokeWidth="2" />
      <line x1="18.2" y1="24.2" x2="22" y2="28" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

export function IconFree() {
  return (
    <svg width="30" height="30" viewBox="0 0 32 32" fill="none" aria-hidden>
      <circle cx="16" cy="16" r="13" stroke="currentColor" strokeWidth="2" />
      <text
        x="16"
        y="20.5"
        textAnchor="middle"
        fontSize="12.5"
        fontWeight="700"
        fill="currentColor"
        fontFamily="sans-serif"
      >
        ¥0
      </text>
    </svg>
  );
}

export function IconShield({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
      <path
        d="M12 2 L20 5 V11 C20 16.5 16.5 20 12 22 C7.5 20 4 16.5 4 11 V5 Z"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M8.5 12 l2.3 2.3 l4.7 -5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconQuote() {
  return (
    <svg width="24" height="24" viewBox="0 0 32 32" fill="#cba968" aria-hidden>
      <path d="M6 18 C6 12 10 8 15 8 L15 11.5 C12.2 11.5 10 13.5 10 16.5 L14 16.5 L14 24 L6 24 Z" />
      <path d="M18 18 C18 12 22 8 27 8 L27 11.5 C24.2 11.5 22 13.5 22 16.5 L26 16.5 L26 24 L18 24 Z" />
    </svg>
  );
}
