import { useState } from 'react';
import Link from 'next/link';
import styles from './styles.module.scss';

import { SlArrowRight } from "react-icons/sl";
import { Button } from '../ui/Button';

export function VisitationCard({ visitation }) {
    const [hovered, setHovered] = useState(false);

    return (
        <Link href={{
            pathname: '/visitation/details',
            query: { visitation_id: visitation.id },

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
                </div>
                <SlArrowRight color='rgba(0, 159, 227, 1)' />
            </div>
        </Link>
    );
}