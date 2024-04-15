import { MouseEventHandler, useContext, useState } from 'react';
import styles from './styles.module.scss';

import { SlArrowDown } from "react-icons/sl";
import { SlArrowUp } from "react-icons/sl";
import { AuthContext } from '@/src/contexts/AuthContext';
import { VisitationAreaCard } from '../VisitationAreaCard';


export function CycleCard({ cycle, cycleId }) {
    const { getVisitationAreas } = useContext(AuthContext);

    const [expandedIndex, setExpandedIndex] = useState(null);
    const [visitationAreas, setVisitationAreas] = useState([]);

    const handleItemClick: MouseEventHandler<HTMLDivElement> = async () => {
        if (expandedIndex === cycleId) {
            setExpandedIndex(null);
        } else {
            const response = await getVisitationAreas(cycleId);
            setVisitationAreas(response);
            setExpandedIndex(cycleId);
        }
    };

    return (
        <div
            className={`${styles.cycleItem} ${expandedIndex === cycleId ? styles.expanded : ''}`}
            onClick={handleItemClick}
        >
            <div className={`${styles.cycleContent} ${expandedIndex === cycleId ? styles.cycleContentExp : ''}`}>
                <div className={styles.cycleInfo}>
                    <p>Ciclo: </p>
                    <b>{cycle.data.ciclo} / {cycle.data.ano}</b>
                </div>
                {expandedIndex === cycleId ? (<SlArrowUp />) : (<SlArrowDown />)}
            </div>

            {expandedIndex === cycleId && (
                <div className={styles.visitationAreasList}>
                    {visitationAreas.map((visitationArea) => (
                        <VisitationAreaCard visitationArea={visitationArea} progress={100} />
                    ))}
                </div>
            )}
        </div>
    );
}