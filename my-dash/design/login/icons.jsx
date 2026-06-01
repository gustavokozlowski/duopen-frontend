/* Shared inline icons for the IEOP login concepts. Exported to window. */
const _ic = {
  fill: "none", stroke: "currentColor", strokeWidth: 2,
  strokeLinecap: "round", strokeLinejoin: "round",
};

function ChartIcon({ s = 24 }) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" {..._ic} aria-hidden="true">
      <path d="M3 3v18h18" />
      <path d="m7 14 3-3 3 3 5-5" />
    </svg>
  );
}
function MailIcon({ s = 18 }) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" {..._ic} aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}
function LockIcon({ s = 18 }) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" {..._ic} aria-hidden="true">
      <rect x="4" y="11" width="16" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  );
}
function ArrowIcon({ s = 16 }) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" {..._ic} aria-hidden="true">
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
function ShieldIcon({ s = 13 }) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" {..._ic} aria-hidden="true">
      <path d="M12 3 5 6v5c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6l-7-3Z" />
    </svg>
  );
}

/* IEOP brand emblem — green tile + rising trend line with peak dot.
   On-brand with the project's line-chart icon, but rendered as a solid logo. */
function IEOPLogo({ s = 40 }) {
  const id = "ieopGrad";
  return (
    <svg width={s} height={s} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <rect width="40" height="40" rx="11" fill={`url(#${id})`} />
      <rect width="40" height="40" rx="11" fill="none" stroke="rgba(255,255,255,0.10)" />
      <path
        d="M9 27.5 L16.5 20 L23 24 L31 12"
        stroke="#ffffff" strokeWidth="2.6"
        strokeLinecap="round" strokeLinejoin="round"
        opacity="0.96"
      />
      <circle cx="31" cy="12" r="2.7" fill="#ffffff" />
      <circle cx="9" cy="27.5" r="1.8" fill="rgba(255,255,255,0.55)" />
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2FBE90" />
          <stop offset="1" stopColor="#168A63" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function EyeIcon({ s = 18 }) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" {..._ic} aria-hidden="true">
      <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
function EyeOffIcon({ s = 18 }) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" {..._ic} aria-hidden="true">
      <path d="M10.6 6.2A9.7 9.7 0 0 1 12 6c6.4 0 10 7 10 7a16.6 16.6 0 0 1-3.4 4.1" />
      <path d="M6.3 7.8A16.4 16.4 0 0 0 2 12s3.6 7 10 7a9.6 9.6 0 0 0 4.3-1" />
      <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
      <path d="m3 3 18 18" />
    </svg>
  );
}

function UserIcon({ s = 18 }) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" {..._ic} aria-hidden="true">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
function CrownIcon({ s = 18 }) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" {..._ic} aria-hidden="true">
      <path d="M3 7l4 4 5-7 5 7 4-4-2 12H5L3 7Z" />
    </svg>
  );
}
function ViewIcon({ s = 18 }) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" {..._ic} aria-hidden="true">
      <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
function CheckIcon({ s = 16 }) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" {..._ic} aria-hidden="true">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

Object.assign(window, { ChartIcon, MailIcon, LockIcon, ArrowIcon, ShieldIcon, IEOPLogo, EyeIcon, EyeOffIcon, UserIcon, CrownIcon, ViewIcon, CheckIcon });
