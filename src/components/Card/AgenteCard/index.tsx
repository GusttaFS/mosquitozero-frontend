import { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './styles.module.scss';
import { SlArrowRight } from "react-icons/sl";
import { AuthContext } from '@/src/contexts/AuthContext';


export function AgenteCard({ agente, cycleId }) {
    const { getVisitationAreas } = useContext(AuthContext);
    const [hovered, setHovered] = useState(false);
    const [totalAreas, setTotalAreas] = useState(null);

    useEffect(() => {
        async function getTotalVisitationAreas() {
            try {
                const response = await getVisitationAreas(agente.id, cycleId);
                const totalAreasFromResponse = response.length;
                setTotalAreas(totalAreasFromResponse);
            } catch (error) {
                console.error('Erro ao obter o total de áreas de visitação:', error);
                setTotalAreas(0);
            }
        }
        getTotalVisitationAreas();
    }, [getVisitationAreas, agente.id, cycleId]);

    return (
        <Link href={{
            pathname: "/supervisor/area/list",
            query: { cycle_id: cycleId, user_id: agente.id },
        }}
            className={`${styles.container} ${hovered ? styles.hoverLink : ''}`}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <div className={styles.row}>
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

                    {totalAreas !== null && (
                        <p>
                            <span className={styles.label}>Áreas atribuídas:</span>{" "}
                            <b>{totalAreas}</b>
                        </p>
                    )}
                </div>
                <SlArrowRight color='rgba(0, 159, 227, 1)' />
            </div>
        </Link>
    );
}