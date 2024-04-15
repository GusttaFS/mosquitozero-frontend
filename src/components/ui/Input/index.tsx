import React, { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react';
import styles from './styles.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
  label: string;
  labelColor?: 'black' | 'white';
}

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>{
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { value: string; label: string }[];
}

export function Input({ label, labelColor = 'white', ...rest }: InputProps){
  const labelStyle = labelColor === 'black' ? styles.labelBlack : styles.labelWhite;
  return(
    <div className={styles.inputWrapper}>
      <label className={`${styles.label} ${labelStyle}`}>{label}</label>
      <input className={styles.input} {...rest} />
    </div>
  )
}

export function TextArea({ label, ...rest }: TextAreaProps){
  return(
    <div className={styles.inputWrapper}>
      <label className={styles.label}>{label}</label>
      <textarea className={styles.input} {...rest}></textarea>
    </div>
  )
}

export function Select({ label, options, ...rest }: SelectProps) {
  return (
    <div className={styles.inputWrapper}>
      <label className={styles.label}>{label}</label>
      <select className={styles.input} {...rest}>
        <option value="">Selecione...</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
