import { useState } from 'react';
import Link from 'next/link';
import styles from './styles.module.scss';

import { SlArrowRight } from "react-icons/sl";
import { TagCompleted, TagPending } from '../../Tag';

export function VisitationCard({ href, visitation }) {
    const [hovered, setHovered] = useState(false);

    return (
        <Link href={href}
            className={`${styles.container} ${hovered ? styles.hoverLink : ''}`}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <div className={styles.row}>
                <div className={styles.content}>
                    <b>{visitation?.data?.logradouro} N° {visitation?.data?.numero}</b>
                    {visitation?.data?.complemento && (
                        <p>
                            <span className={styles.label}>Compl.:</span>{" "}
                            <b>{visitation.data.complemento}</b>
                        </p>
                    )}
                    {visitation?.data?.imovel && (
                        <p>
                            <span className={styles.label}>Tipo de imovel:</span>{" "}
                            <b>{visitation.data.imovel}</b>
                        </p>
                    )}
                    {visitation?.data && (
                        <p>
                            <span className={styles.label}>Status:</span>{" "}
                            {visitation?.is_completed ? <TagCompleted /> : <TagPending />}
                        </p>
                    )}
                </div>
                <SlArrowRight color='rgba(0, 159, 227, 1)' />
            </div>
        </Link>
    );
}