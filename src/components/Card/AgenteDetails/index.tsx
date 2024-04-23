import styles from './styles.module.scss';


export function AgenteDetails({ agente }) {
    return (
        <div className={styles.areaCardContainer}>
            <div className={styles.areaCardContent}>
                {agente?.name && (
                    <p>
                        <span className={styles.label}>Nome:</span>{" "}
                        <b>{agente.name}</b>
                    </p>
                )}
                {agente?.email && (
                    <p>
                        <span className={styles.label}>E-mail:</span>{" "}
                        <b>{agente.email}</b>
                    </p>
                )}
            </div>
        </div>
    );
}