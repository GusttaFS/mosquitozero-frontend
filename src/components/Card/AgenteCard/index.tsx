import { useState } from 'react';
import Link from 'next/link';
import styles from './styles.module.scss';

import { SlArrowRight } from "react-icons/sl";


export function AgenteCard({ agente, cycleId }) {
    const [hovered, setHovered] = useState(false);

    return (
        <Link href={{
            pathname: "/supervisor/area/list",
            query: { cycle_id: cycleId, user_id: agente.id },
        }}
            className={`${styles.containerCenter} ${hovered ? styles.hoverLink : ''}`}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <div className={styles.rowContent}>
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
                </div>
                <SlArrowRight color='rgba(0, 159, 227, 1)' />
            </div>
        </Link>
    );
}