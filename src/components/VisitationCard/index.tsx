import { useState } from 'react';
import Link from 'next/link';
import styles from './styles.module.scss';

import { SlArrowRight } from "react-icons/sl";

export function VisitationCard({ visitation, visitation_area_id }) {
    const [hovered, setHovered] = useState(false);

    const getStatusTagStyle = () => {
        return visitation.is_completed ? styles.completedTag : styles.pendingTag;
    };

    return (
        <Link href={{
            pathname: '/visitation/form',
            query: {
                visitation_area_id: visitation_area_id,
                visitation_id: visitation.id
            },

        }}
            className={`${styles.containerCenter} ${hovered ? styles.hoverLink : ''}`}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <div className={styles.rowContent}>
                <div className={styles.content}>
                    <b>{visitation?.data.logradouro} N° {visitation?.data.numero}</b>
                    {visitation?.data.complemento && (
                        <p>
                            <span className={styles.label}>Compl.:</span>{" "}
                            <b>{visitation.data.complemento}</b>
                        </p>
                    )}
                    {visitation?.data.imovel && (
                        <p>
                            <span className={styles.label}>Tipo de imovel:</span>{" "}
                            <b>{visitation.data.imovel}</b>
                        </p>
                    )}
                    <p>
                        <span className={`${styles.label} ${getStatusTagStyle()}`}>
                            {visitation.is_completed ? "Concluída" : "Pendente"}
                        </span>
                    </p>
                </div>
                <SlArrowRight color='rgba(0, 159, 227, 1)' />
            </div>
        </Link>
    );
}