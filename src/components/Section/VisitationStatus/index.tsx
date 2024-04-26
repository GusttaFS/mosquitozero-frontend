import { useContext, useState } from 'react';
import styles from './styles.module.scss';
import { AuthContext } from '@/src/contexts/AuthContext';
import { TagCompleted, TagPending } from '../../Tag';
import { MarkButton } from '../../ui/Button';


export function VisitationStatus({ visitation, visitationAreaId }) {
    const { patchVisitation } = useContext(AuthContext);

    const [completed, setCompleted] = useState(visitation?.is_completed || false);

    async function handleSetStatus() {
        try {
            const response = await patchVisitation(visitation.id, visitationAreaId);
            setCompleted(response?.is_completed);
        } catch (e) { }
    };

    return (
        <div className={styles.container}>
            <p>
                <span className={styles.label}>Status:</span>{" "}
                {completed ? <TagCompleted /> : <TagPending />}
            </p>
            <div className={styles.row}>
                <div>{completed ?
                    (<>
                        <p>Marcar visita como: </p>
                        <MarkButton
                            onClick={handleSetStatus}
                            label={"Pendente"}
                            type={"pendente"} />
                    </>) :
                    (<>
                        <p>Marcar visita como: </p>
                        <MarkButton
                            onClick={handleSetStatus}
                            label={"Concluída"}
                            type={"check"} />
                    </>)}
                </div>

            </div>
        </div>
    );
}
