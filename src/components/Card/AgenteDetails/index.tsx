import { calculateAreasProgress } from '@/src/utils/calculateProgress';
import styles from './styles.module.scss';
import { VscAccount } from 'react-icons/vsc';


export function AgenteDetails({ agente, cycle, visitationAreas }) {

    const progress = calculateAreasProgress(visitationAreas || []);

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.userInfo}>
                    <VscAccount size={34} color='#757575'/>
                    <div>
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