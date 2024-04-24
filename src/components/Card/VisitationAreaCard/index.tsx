import { useState } from 'react';
import Link from 'next/link';
import styles from './styles.module.scss';

import { SlArrowRight } from "react-icons/sl";
import { calculateProgress } from '@/src/utils/calculateProgress';


export function VisitationAreaCard({ href, visitationArea }) {
    const [hovered, setHovered] = useState(false);

    const progress = calculateProgress(visitationArea.completed_visitations, visitationArea.num_visitations);

    return (
        <Link href={href}
            className={`${styles.container} ${hovered ? styles.hoverLink : ''}`}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <div className={styles.row}>
                <div className={styles.content}>
                    {visitationArea?.data?.catg_localidade && (
                        <p>
                            <span className={styles.label}>Categ. Localid.:</span>{" "}
                            <b>{visitationArea.data.catg_localidade}</b>
                        </p>
                    )}
                    {visitationArea?.data?.nome_localidade && (
                        <p>
                            <span className={styles.label}>Nome Localid.:</span>{" "}
                            <b>{visitationArea.data.nome_localidade}</b>
                        </p>
                    )}
                    {visitationArea?.data?.cdg_localidade && (
                        <p>
                            <span className={styles.label}>Código:</span>{" "}
                            <b>{visitationArea.data.cdg_localidade}</b>
                        </p>
                    )}
                    {visitationArea?.data?.zona && (
                        <p>
                            <span className={styles.label}>Zona:</span>{" "}
                            <b>{visitationArea.data.zona}</b>
                        </p>
                    )}
                    {visitationArea?.data?.municipio && (
                        <p>
                            <span className={styles.label}>Município:</span>{" "}
                            <b>{visitationArea.data.municipio}</b>
                        </p>
                    )}
                    {visitationArea?.data?.atividade && (
                        <p>
                            <span className={styles.label}>Atividade:</span>{" "}
                            <b>{visitationArea.data.atividade}</b>
                        </p>
                    )}
                </div>

                <SlArrowRight color="rgba(0, 159, 227, 1)" />
            </div>

            <div className={styles.progressBarContainer}>
                <div className={styles.progressBar}>
                    <div className={styles.progress} style={{ width: `${progress}%` }}>
                    </div>
                </div>
                <p>{progress}%</p>
            </div>
        </Link>
    );
}