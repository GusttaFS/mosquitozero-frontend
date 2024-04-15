import { useState } from 'react';
import Link from 'next/link';
import styles from './styles.module.scss';

import { SlArrowRight } from "react-icons/sl";

export function VisitationCard({ visitation }) {
    const [hovered, setHovered] = useState(false);

    return (
        <Link href={{
            pathname: '/visitation-details',
            query: { visitation_id: visitation.id },
        }}>
            <div className={`${styles.containerCenter} ${hovered ? styles.hoverLink : ''}`}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}>
                <div className={styles.content}>
                    <p>{visitation.data.logradouro} N° {visitation.data.numero}</p>
                    <div className={styles.rowContent}>
                        <p>Criada em: {new Date(visitation.created_at).toLocaleDateString('pt-BR')}</p>
                    </div>
                </div>
                <SlArrowRight color='rgba(0, 159, 227, 1)' />
            </div>
        </Link>
    );
}