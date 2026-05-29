import { useEffect, useState, type ReactNode } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAuthContext } from "../auth/AuthContext";
import { buildNav, type NavGroup } from "./nav";
import styles from "./PageLayout.module.css";

export type { NavItem } from "./nav";

interface PageLayoutProps {
  children: ReactNode;
  nav?: NavGroup[];
  pageTitle?: string;
  headerRight?: ReactNode;
}

export function PageLayout({ children, nav, pageTitle, headerRight }: PageLayoutProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuthContext();

  // Nav canônico, filtrado por perfil (ex.: readonly não vê o Agente IA).
  // A prop `nav` permite override pontual, mas o padrão vem do perfil.
  const groups = nav ?? buildNav(user?.perfil);

  // Fecha o drawer ao navegar (mobile)
  useEffect(() => {
    setDrawerOpen(false);
  }, [location.pathname]);

  return (
    <div className={styles.root}>
      {/* Overlay — só visível no mobile com drawer aberto */}
      <div
        className={`${styles.overlay} ${drawerOpen ? styles.overlayVisible : ""}`}
        onClick={() => setDrawerOpen(false)}
        aria-hidden
      />

      <aside
        className={`${styles.sidebar} ${drawerOpen ? styles.sidebarOpen : ""}`}
        aria-label="Navegação principal"
      >
        <div className={styles.logo}>
          IE<span>OP</span>
        </div>

        <nav className={styles.nav}>
          {groups.map((group, gi) => (
            <div key={gi}>
              {group.label && <p className={styles.navLabel}>{group.label}</p>}
              {group.items.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end
                  className={({ isActive }) =>
                    `${styles.navItem} ${isActive ? styles.active : ""}`
                  }
                >
                  {item.icon && (
                    <span className={styles.navIcon} aria-hidden>
                      {item.icon}
                    </span>
                  )}
                  {item.label}
                </NavLink>
              ))}
            </div>
          ))}
        </nav>
      </aside>

      <div className={styles.main}>
        <header className={styles.header}>
          <div className={styles.headerLeft}>
            <button
              className={styles.hamburger}
              onClick={() => setDrawerOpen((o) => !o)}
              aria-label={drawerOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={drawerOpen}
            >
              {drawerOpen ? "✕" : "☰"}
            </button>
            <span className={styles.pageTitle}>{pageTitle}</span>
          </div>
          <div className={styles.headerRight}>{headerRight}</div>
        </header>

        <main className={styles.content}>{children}</main>
      </div>
    </div>
  );
}
