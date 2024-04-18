import { useState } from 'react';
import Link from 'next/link';
import styles from './styles.module.scss';

import { SlArrowRight } from "react-icons/sl";
import { calculateProgress } from '@/src/scripts/calculateProgress';


export function VisitationAreaCard({ visitationArea }) {
    const [hovered, setHovered] = useState(false);

    const progress = calculateProgress(visitationArea.completed_visitations, visitationArea.num_visitations);

    return (
        <Link href={{
            pathname: "/visitation/list",
            query: { visitation_area_id: visitationArea.id },
        }}
            className={`${styles.areaCardContainer} ${hovered ? styles.hoverLink : ''}`}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <div className={styles.areaCardRowContent}>
                <div className={styles.areaCardContent}>
                    {visitationArea?.data.codLocalidade && (
                        <p>
                            <span className={styles.label}>Cód. Localid.:</span>{" "}
                            <b>{visitationArea.data.codLocalidade}</b>
                        </p>
                    )}
                    {visitationArea?.data.nomeLocalidade && (
                        <p>
                            <span className={styles.label}>Nome Localid.:</span>{" "}
                            <b>{visitationArea.data.nomeLocalidade}</b>
                        </p>
                    )}
                    {visitationArea?.data.categLocalidade && (
                        <p>
                            <span className={styles.label}>Categ. Localid.:</span>{" "}
                            <b>{visitationArea.data.categLocalidade}</b>
                        </p>
                    )}
                    {visitationArea?.data.zona && (
                        <p>
                            <span className={styles.label}>Zona:</span>{" "}
                            <b>{visitationArea.data.zona}</b>
                        </p>
                    )}
                    {visitationArea?.data.municipio && (
                        <p>
                            <span className={styles.label}>Município:</span>{" "}
                            <b>{visitationArea.data.municipio}</b>
                        </p>
                    )}
                    {visitationArea?.data.atividade && (
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