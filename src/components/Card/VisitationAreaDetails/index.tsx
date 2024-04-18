import styles from './styles.module.scss';


export function VisitationAreaDetails({ visitationArea }) {
    return (
        <div className={styles.areaCardContainer}>
            <div className={styles.areaCardContent}>
                {visitationArea?.data.codLocalidade && (
                    <p>
                        <span className={styles.label}>Cód. Localid.:</span>{" "}
                        <b>{visitationArea.data.codLocalidade}</b>
                    </p>
                )}
                {visitationArea?.data.nomeLocalidade && (
                    <p>
                        <span className={styles.label}>Nome Localid.:</span>{" "}
                        <b>{visitationArea.data.nomeLocalidade}</b>
                    </p>
                )}
                {visitationArea?.data.categLocalidade && (
                    <p>
                        <span className={styles.label}>Categ. Localid.:</span>{" "}
                        <b>{visitationArea.data.categLocalidade}</b>
                    </p>
                )}
                {visitationArea?.data.zona && (
                    <p>
                        <span className={styles.label}>Zona:</span>{" "}
                        <b>{visitationArea.data.zona}</b>
                    </p>
                )}
                {visitationArea?.data.municipio && (
                    <p>
                        <span className={styles.label}>Município:</span>{" "}
                        <b>{visitationArea.data.municipio}</b>
                    </p>
                )}
                {visitationArea?.data.atividade && (
                    <p>
                        <span className={styles.label}>Atividade:</span>{" "}
                        <b>{visitationArea.data.atividade}</b>
                    </p>
                )}
                <p>
                    <span className={styles.label}>Visitas concluidas:</span>{" "}
                    <b>{visitationArea?.completed_visitations} / {visitationArea?.num_visitations}</b>
                </p>
            </div>
        </div>
    );
}