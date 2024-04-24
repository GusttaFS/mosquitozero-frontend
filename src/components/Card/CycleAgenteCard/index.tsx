import { MouseEventHandler, useContext, useState } from 'react';
import styles from './styles.module.scss';
import { SlArrowDown } from "react-icons/sl";
import { SlArrowUp } from "react-icons/sl";
import { AuthContext } from '@/src/contexts/AuthContext';
import { VisitationAreaCard } from '../VisitationAreaCard';


export function CycleAgenteCard({ cycle, user }) {
    const { getVisitationAreas } = useContext(AuthContext);

    const [expandedIndex, setExpandedIndex] = useState(null);
    const [visitationAreas, setVisitationAreas] = useState([]);

    const handleItemClick: MouseEventHandler<HTMLDivElement> = async () => {
        if (expandedIndex === cycle.id) {
            setExpandedIndex(null);
        } else {
            try {
                if (user && cycle) {
                    const response = await getVisitationAreas(user.id, cycle.id);
                    setVisitationAreas(response);
                }
                setExpandedIndex(cycle.id);
            } catch (e) { }
        }
    };

    return (
        <div className={styles.container}>
            <div
                className={`${styles.content} ${expandedIndex === cycle.id ? styles.contentExp : ''}`}
                onClick={handleItemClick}
            >
                <div className={styles.info}>
                    <p>Ciclo: </p>
                    <b>{cycle.data.ciclo} / {cycle.data.ano}</b>
                </div>
                {expandedIndex === cycle.id ? (<SlArrowUp />) : (<SlArrowDown />)}
            </div>

            {expandedIndex === cycle.id && (
                <div className={styles.visitationAreasList}>
                    {visitationAreas && visitationAreas.length > 0 ? (
                        visitationAreas.map((visitationArea) => (
                            <VisitationAreaCard
                                href={{
                                    pathname: "/agente/visitation/list",
                                    query: {
                                        cycle_id: cycle.id,
                                        visitation_area_id: visitationArea.id
                                    },
                                }}
                                key={visitationArea.id}
                                visitationArea={visitationArea}
                            />
                        ))
                    ) : (
                        <p className={styles.message}>Sem áreas de visita</p>
                    )}
                </div>
            )}
        </div>
    );
}