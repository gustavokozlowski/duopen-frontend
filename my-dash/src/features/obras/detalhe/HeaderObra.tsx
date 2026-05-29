import { useNavigate } from "react-router-dom";
import { Badge } from "../../../components/Badge";
import { RiskBadge } from "../RiskBadge";
import { STATUS_LABELS } from "../../mapa/types";
import type { BadgeVariant } from "../../../components/Badge";
import type { ObraDetalhe, ObraStatus } from "./types";
import styles from "./HeaderObra.module.css";

const STATUS_VARIANT: Record<ObraStatus, BadgeVariant> = {
  em_andamento: "success",
  concluida:    "neutral",
  paralisada:   "warning",
  atrasada:     "danger",
  nao_iniciada: "neutral",
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
        <span className={styles.divider} aria-hidden />
        <span className={styles.secretaria}>{obra.secretaria}</span>
        <span className={styles.divider} aria-hidden />
        <span className={styles.contrato}>{obra.numero_contrato}</span>
      </div>
    </div>
  );
}
