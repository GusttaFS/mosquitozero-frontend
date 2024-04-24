import styles from './styles.module.scss';


export function AgenteDetails({ agente, cycle, visitationAreas }) {

    const progress = 100;

    return (
        <div className={styles.container}>
            <div className={styles.content}>
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
                {cycle?.data && (
                    <p>
                        <span className={styles.label}>Ciclo:</span>{" "}
                        <b>{cycle.data?.ciclo} / {cycle.data?.ano}</b>
                    </p>
                )}

                {visitationAreas && (
                    <div className={styles.progressBarContainer}>
                        <div className={styles.progressBar}>
                            <div className={styles.progress} style={{ width: `${progress}%` }}>
                            </div>
                        </div>
                        <p>{progress}%</p>
                    </div>
                )}
            </div>
        </div>
    );
}