import Link from 'next/link';
import styles from './styles.module.scss';

import { LuPenSquare } from 'react-icons/lu';


export function NewVisitButton({ visitationAreaId }) {
  return (
    <button className={styles.button}>
      <Link href={{
        pathname: '/visitation/form',
        query: { visitation_area_id: visitationAreaId },
      }}
        className={styles.newVisitButtonLink}
      >
        Nova Visita
        <LuPenSquare color="white" />
      </Link>
    </button>
  );
}