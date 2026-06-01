/* IEOP Dashboard — real nav + UI icons (stroke = currentColor) */
const di = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" };

const DashIcons = {
  // brand emblem (filled)
  Logo: ({ s = 34 }) =>
  <svg width={s} height={s} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <rect width="40" height="40" rx="11" fill="url(#dlg)" />
      <rect x="0.5" y="0.5" width="39" height="39" rx="10.5" fill="none" stroke="#fff" strokeOpacity="0.1" />
      <path d="M9 27.5 L16.5 20 L23 24 L31 12" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="31" cy="12" r="2.7" fill="#fff" />
      <circle cx="9" cy="27.5" r="1.8" fill="#fff" fillOpacity="0.55" />
      <defs><linearGradient id="dlg" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse"><stop stopColor="#2FBE90" /><stop offset="1" stopColor="#168A63" /></linearGradient></defs>
    </svg>,

  // nav: dashboard (grid)
  Dashboard: () => <svg viewBox="0 0 24 24" {...di} aria-hidden="true"><rect x="3" y="3" width="7" height="9" rx="1.5" /><rect x="14" y="3" width="7" height="5" rx="1.5" /><rect x="14" y="12" width="7" height="9" rx="1.5" /><rect x="3" y="16" width="7" height="5" rx="1.5" /></svg>,
  // nav: obras (hard hat / construction)
  Obras: () => <svg viewBox="0 0 24 24" {...di} aria-hidden="true"><path d="M3 18h18" /><path d="M5 18v-7a7 7 0 0 1 14 0v7" /><path d="M12 4v4" /><path d="M2 18h20v2H2z" /></svg>,
  // nav: fornecedores (briefcase)
  Fornecedores: () => <svg viewBox="0 0 24 24" {...di} aria-hidden="true"><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /><path d="M3 13h18" /></svg>,
  // nav: agente IA (sparkle)
  IA: () => <svg viewBox="0 0 24 24" {...di} aria-hidden="true"><path d="M12 3l1.8 4.8L18.6 9.6 13.8 11.4 12 16.2 10.2 11.4 5.4 9.6 10.2 7.8z" /><path d="M19 14l.7 1.9 1.9.7-1.9.7-.7 1.9-.7-1.9-1.9-.7 1.9-.7z" /></svg>,
  // nav: mapa (pin)
  Mapa: () => <svg viewBox="0 0 24 24" {...di} aria-hidden="true"><path d="M12 21s-7-5.2-7-11a7 7 0 0 1 14 0c0 5.8-7 11-7 11z" /><circle cx="12" cy="10" r="2.5" /></svg>,
  // nav: mapa 3d (cube)
  Mapa3D: () => <svg viewBox="0 0 24 24" {...di} aria-hidden="true"><path d="M12 2l9 5v10l-9 5-9-5V7z" /><path d="M12 12l9-5M12 12v10M12 12L3 7" /></svg>,
  // ui
  Search: () => <svg viewBox="0 0 24 24" {...di} aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.2-3.2" /></svg>,
  Bell: () => <svg viewBox="0 0 24 24" {...di} aria-hidden="true"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.7 21a2 2 0 0 1-3.4 0" /></svg>,
  Logout: () => <svg viewBox="0 0 24 24" {...di} aria-hidden="true"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><path d="m16 17 5-5-5-5" /><path d="M21 12H9" /></svg>,
  Building: () => <svg viewBox="0 0 24 24" {...di} aria-hidden="true"><rect x="4" y="3" width="16" height="18" rx="1.5" /><path d="M9 8h2M13 8h2M9 12h2M13 12h2M9 16h2M13 16h2" /></svg>,
  Activity: () => <svg viewBox="0 0 24 24" {...di} aria-hidden="true"><path d="M3 12h4l3 8 4-16 3 8h4" /></svg>,
  Money: () => <svg viewBox="0 0 24 24" {...di} aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M14.5 9a2.5 2.5 0 0 0-2.5-1.5c-1.4 0-2.5.8-2.5 2s1.1 1.8 2.5 2 2.5.8 2.5 2-1.1 2-2.5 2A2.5 2.5 0 0 1 9.5 16M12 6v1.5M12 16.5V18" /></svg>,
  Gauge: () => <svg viewBox="0 0 24 24" {...di} aria-hidden="true"><path d="M12 14a8 8 0 1 0-8-8" transform="rotate(45 12 12)" /><path d="M4 18a8 8 0 0 1 16 0" /><path d="m12 13 4-4" /><circle cx="12" cy="14" r="1.4" /></svg>,
  ArrowUp: () => <svg viewBox="0 0 24 24" {...di} aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7" /></svg>,
  ArrowDown: () => <svg viewBox="0 0 24 24" {...di} aria-hidden="true"><path d="M12 5v14M5 12l7 7 7-7" /></svg>,
  Download: () => <svg viewBox="0 0 24 24" {...di} aria-hidden="true"><path d="M12 3v12M7 10l5 5 5-5M5 21h14" /></svg>,
  ArrowLeft: () => <svg viewBox="0 0 24 24" {...di} aria-hidden="true"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>,
  ArrowRight: () => <svg viewBox="0 0 24 24" {...di} aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
};

window.DashIcons = DashIcons;