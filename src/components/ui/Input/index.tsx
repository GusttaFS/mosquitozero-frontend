import React, { InputHTMLAttributes } from 'react';
import styles from './styles.module.scss';


interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  labelColor?: 'black' | 'white';
}


export function Input({ label, labelColor = 'white', ...rest }: InputProps) {
  const labelStyle = labelColor === 'black' ? styles.labelBlack : styles.labelWhite;
  return (
    <div className={styles.inputContainer}>
      <label className={`${styles.label} ${labelStyle}`}>{label}</label>
      <input className={styles.input} {...rest} />
    </div>
  )
}