import type { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import styles from "./PageLayout.module.css";

export interface NavItem {
  path: string;
  label: string;
  icon?: ReactNode;
}

interface NavGroup {
  label?: string;
  items: NavItem[];
}

interface PageLayoutProps {
  children: ReactNode;
  nav?: NavGroup[];
  pageTitle?: string;
  headerRight?: ReactNode;
}

export function PageLayout({ children, nav = [], pageTitle, headerRight }: PageLayoutProps) {
  return (
    <div className={styles.root}>
      <aside className={styles.sidebar} aria-label="Navegação principal">
        <div className={styles.logo}>
          Duo<span>Open</span>
        </div>

        <nav className={styles.nav}>
          {nav.map((group, gi) => (
            <div key={gi}>
              {group.label && (
                <p className={styles.navLabel}>{group.label}</p>
              )}
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
          <span className={styles.pageTitle}>{pageTitle}</span>
          <div className={styles.headerRight}>{headerRight}</div>
        </header>

        <main className={styles.content}>{children}</main>
      </div>
    </div>
  );
}
