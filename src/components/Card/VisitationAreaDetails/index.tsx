import styles from './styles.module.scss';


export function VisitationAreaDetails({ visitationArea, cycle }) {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                {visitationArea?.data?.catg_localidade && (
                    <p>
                        <span className={styles.label}>Categ. Localid.:</span>{" "}
                        <b>{visitationArea.data.catg_localidade}</b>
                    </p>
                )}
                {visitationArea?.data?.nome_localidade && (
                    <p>
                        <span className={styles.label}>Nome Localid.:</span>{" "}
                        <b>{visitationArea.data.nome_localidade}</b>
                    </p>
                )}
                {visitationArea?.data?.cdg_localidade && (
                    <p>
                        <span className={styles.label}>Código:</span>{" "}
                        <b>{visitationArea.data.cdg_localidade}</b>
                    </p>
                )}
                {visitationArea?.data?.zona && (
                    <p>
                        <span className={styles.label}>Zona:</span>{" "}
                        <b>{visitationArea.data.zona}</b>
                    </p>
                )}
                {visitationArea?.data?.municipio && (
                    <p>
                        <span className={styles.label}>Município:</span>{" "}
                        <b>{visitationArea.data.municipio}</b>
                    </p>
                )}
                {visitationArea?.data?.atividade && (
                    <p>
                        <span className={styles.label}>Atividade:</span>{" "}
                        <b>{visitationArea.data.atividade}</b>
                    </p>
                )}
                {cycle?.data && (
                    <p>
                        <span className={styles.label}>Ciclo:</span>{" "}
                        <b>{cycle.data?.ciclo} / {cycle.data?.ano}</b>
                    </p>
                )}
                {visitationArea?.data && (
                    <p>
                        <span className={styles.label}>Visitas concluidas:</span>{" "}
                        <b>{visitationArea?.completed_visitations} / {visitationArea?.num_visitations}</b>
                    </p>
                )}
            </div>
        </div>
    );
}