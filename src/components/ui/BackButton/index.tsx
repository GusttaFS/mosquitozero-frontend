import Link from 'next/link';
import styles from './styles.module.scss';

import { IoChevronBackOutline } from 'react-icons/io5';


export function BackButton({ href }) {
  return (
    <button className={styles.button}>
      <Link href={href} className={styles.backButtonLink}>
        <IoChevronBackOutline color="white" />
        Voltar
      </Link>
    </button>
  );
}