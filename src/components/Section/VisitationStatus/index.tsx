import { useContext, useState } from 'react';
import styles from './styles.module.scss';
import { AuthContext } from '@/src/contexts/AuthContext';
import { TagCompleted, TagPending } from '../../Tag';


export function VisitationStatus({ visitation, visitationAreaId }) {
    const { patchVisitation } = useContext(AuthContext);

    const [completed, setCompleted] = useState(visitation?.is_completed || false);

    async function handleSetStatus() {
        try {
            const response = await patchVisitation(visitation.id, visitationAreaId);
            setCompleted(response?.is_completed);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div className={styles.container}>
            <p>
                <span className={styles.label}>Status:</span>{" "}
                {completed ? <TagCompleted /> : <TagPending />}
            </p>
            <div className={styles.row}>
                <p>{completed ? 'Marcar como pendente?' : 'Marcar como concluída?'}</p>
                <button className={styles.button} onClick={handleSetStatus}>
                    Sim
                </button>
            </div>
        </div>
    );
}
