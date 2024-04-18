import { ReactNode, ButtonHTMLAttributes } from 'react';
import styles from './styles.module.scss';

import Link from 'next/link';
import { FaSpinner } from 'react-icons/fa'
import { IoChevronBackOutline } from 'react-icons/io5';
import { LuPenSquare } from 'react-icons/lu';
import { VscSaveAs } from 'react-icons/vsc';
import { MdOutlineCancel } from 'react-icons/md';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean,
  children: ReactNode,
}


export function Button({ loading, children, ...rest }: ButtonProps) {
  return (
    <button
      className={styles.button}
      disabled={loading}
      {...rest}
    >
      {loading ? (
        <FaSpinner color="#262626" size={16} />
      ) : (
        <a className={styles.buttonText}>
          {children}
        </a>
      )}
    </button>
  )
}


export function BackButton({ href }) {
  return (
    <button className={styles.backButton}>
      <Link href={href} className={styles.backButtonLink}>
        <IoChevronBackOutline color="white" />
        Voltar
      </Link>
    </button>
  );
}


export function NewVisitButton({ visitationAreaId }) {
  return (
    <button className={styles.newVisitButton}>
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


export function SaveButton({ onClick }) {
  return (
    <button
      className={styles.saveButton}
      onClick={onClick}
    > Salvar <VscSaveAs color="white" />
    </button>
  );
}


export function EditButton({ onClick }) {
  return (
    <button
      className={styles.editButton}
      onClick={onClick}
    > Editar <LuPenSquare color="white" />
    </button>
  );
}


export function CanceltButton({ onClick }) {
  return (
    <button
      className={styles.cancelButton}
      onClick={onClick}
    > Cancelar <MdOutlineCancel color="white" />
    </button>
  );
}