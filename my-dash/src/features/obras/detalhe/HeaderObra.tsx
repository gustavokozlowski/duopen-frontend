import { useNavigate } from "react-router-dom";
import { Badge } from "../../../components/Badge";
import { IEOPBadge } from "../../../components/IEOPBadge";
import { RiskBadge } from "../RiskBadge";
import { getIEOPColor } from "../../dashboard/ieop";
import { STATUS_LABELS } from "../../mapa/types";
import type { BadgeVariant } from "../../../components/Badge";
import type { ObraDetalhe, ObraStatus } from "./types";
import styles from "./HeaderObra.module.css";

const STATUS_VARIANT: Record<ObraStatus, BadgeVariant> = {
  em_andamento: "info",
  concluida:    "success",
  paralisada:   "warning",
  atrasada:     "danger",
  nao_iniciada: "neutral",
  cancelada:    "danger",
};

interface HeaderObraProps {
  obra: ObraDetalhe;
}

export function HeaderObra({ obra }: HeaderObraProps) {
  const navigate = useNavigate();

  return (
    <div className={styles.wrapper}>
      <button className={styles.backBtn} onClick={() => navigate("/obras")}>
        ← Obras
      </button>

      <h1 className={styles.nome}>{obra.nome}</h1>

      <div className={styles.meta}>
        <Badge
          label={STATUS_LABELS[obra.status]}
          variant={STATUS_VARIANT[obra.status] ?? "neutral"}
          dot={false}
        />
        <RiskBadge prob={obra.predicao.prob_atraso} />
        {obra.ieop_score != null && (
          <span style={{ display: "inline-flex", alignItems: "center", gap: "var(--space-2)" }}>
            <span style={{ fontWeight: 700, fontSize: "var(--text-sm)", color: getIEOPColor(obra.ieop_score) }}>
              {obra.ieop_score.toFixed(2)}
            </span>
            <IEOPBadge classe={obra.ieop_classe ?? null} size="sm" />
          </span>
        )}
        <span className={styles.divider} aria-hidden />
        <span className={styles.secretaria}>{obra.secretaria}</span>
        <span className={styles.divider} aria-hidden />
        <span className={styles.contrato}>{obra.numero_contrato}</span>
      </div>
    </div>
  );
}
