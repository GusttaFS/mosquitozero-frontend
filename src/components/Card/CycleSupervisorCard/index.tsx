import { useContext, useState } from 'react';
import styles from './styles.module.scss';
import { SlArrowDown } from "react-icons/sl";
import { SlArrowUp } from "react-icons/sl";
import { AuthContext } from '@/src/contexts/AuthContext';
import { VisitationAreaCard } from '../VisitationAreaCard';


export function CycleSupervisorCard({ cycle }) {
    const { getAgentes, getVisitationAreas } = useContext(AuthContext);

    const [expandedCycleId, setExpandedCycleId] = useState(null);
    const [expandedAgenteId, setExpandedAgenteId] = useState(null);

    const [agentes, setAgents] = useState([]);
    const [visitationAreas, setVisitationAreas] = useState([]);

    const handleCycleClick = async () => {
        if (expandedCycleId === cycle.id) {
            setExpandedCycleId(null);
            setAgents([]);
        } else {
            try {
                const response = await getAgentes();
                setAgents(response);
                setExpandedCycleId(cycle.id);
            } catch (e) { }
        }
    };

    const handleAgentClick = async (agentId: string) => {
        if (expandedAgenteId === agentId) {
            setExpandedAgenteId(null);
            setVisitationAreas([]);
        } else {
            try {
                if (agentId && cycle.id) {
                    const response = await getVisitationAreas(agentId, cycle.id);
                    setVisitationAreas(response);
                }
                setExpandedAgenteId(agentId);
            } catch (e) { }
        }
    };

    return (
        <div className={styles.container}>
            <div
                className={`${styles.content} ${expandedCycleId === cycle.id ? styles.contentExp : ''}`}
                onClick={handleCycleClick}
            >
                <div className={styles.info}>
                    <p>Ciclo: </p>
                    <b>{cycle.data.ciclo} / {cycle.data.ano}</b>
                </div>
                {expandedCycleId === cycle.id ? (<SlArrowUp />) : (<SlArrowDown />)}
            </div>

            {expandedCycleId === cycle.id && (
                <div className={styles.agentesList}>
                    {agentes && agentes.length > 0 ? (
                        agentes.map((agente) => (
                            <div
                                className={styles.container}
                                onClick={() => handleAgentClick(agente.id)}
                                key={agente.id}
                            >
                                <div className={`${styles.content} ${expandedAgenteId === agente.id ? styles.contentExp : ''}`}>
                                    <div className={styles.info}>
                                        <p>Nome: </p>
                                        <b>{agente.name}</b>
                                    </div>
                                    {expandedAgenteId === agente.id ? (<SlArrowUp />) : (<SlArrowDown />)}
                                </div>

                                {expandedAgenteId === agente.id && (
                                    <div className={styles.visitationAreasList}>
                                        {visitationAreas && visitationAreas.length > 0 ? (
                                            visitationAreas.map((visitationArea) => (
                                                <VisitationAreaCard
                                                    href={{
                                                        pathname: "/supervisor/visitation/list",
                                                        query: {
                                                            cycle_id: cycle.id,
                                                            user_id: agente.id,
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
                        ))
                    ) : (
                        <p className={styles.message}>Sem agentes</p>
                    )}
                </div>
            )}
        </div>
    );
}


