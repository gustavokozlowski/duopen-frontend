import type { ReactNode } from "react";
import styles from "./Card.module.css";

type CardVariant = "default" | "success" | "warning" | "danger";
type TrendDirection = "up" | "down" | "flat";

interface CardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  variant?: CardVariant;
  trend?: number;
  trendLabel?: string;
  footer?: ReactNode;
}

export function Card({
  title,
  value,
  icon,
  variant = "default",
  trend,
  trendLabel,
  footer,
}: CardProps) {
  const trendDir: TrendDirection =
    trend === undefined || trend === 0 ? "flat" : trend > 0 ? "up" : "down";
  const trendSign = trend !== undefined && trend > 0 ? "+" : "";

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.title}>{title}</span>
        {icon && (
          <span
            className={`${styles.icon} ${variant !== "default" ? styles[variant] : ""}`}
            aria-hidden
          >
            {icon}
          </span>
        )}
      </div>

      <span className={styles.value}>{value}</span>

      {(trend !== undefined || footer) && (
        <div className={styles.footer}>
          {trend !== undefined && (
            <span className={`${styles.trend} ${styles[trendDir]}`}>
              {trendSign}{trend}%
            </span>
          )}
          {trendLabel && <span>{trendLabel}</span>}
          {footer}
        </div>
      )}
    </div>
  );
}
