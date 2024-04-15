import React, { SelectHTMLAttributes } from 'react';
import styles from './styles.module.scss';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { value: string; label: string }[];
}


export function Select({ label, options, ...rest }: SelectProps) {
  return (
    <div className={styles.selectContainer}>
      <label className={styles.label}>{label}</label>
      <select className={styles.select} {...rest}>
        <option value="" disabled selected>
          Selecione...
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}