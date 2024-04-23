import { IoMdArrowDropdown } from 'react-icons/io';
import styles from './styles.module.scss';
import { useEffect, useState } from 'react';


type SelectOption = {
  label: string;
  value: string;
}


interface SelectProps {
  label: string;
  labelColor?: 'black' | 'white';
  value?: SelectOption;
  options: SelectOption[];
  onChange: (value: SelectOption | undefined) => void;
  disabled: boolean;
}

export function Select({ label, labelColor, value, options, onChange, disabled }: SelectProps) {
  const [isSelected, setIsSelected] = useState(false);
  const [HighlightedIndex, setHighlightedIndex] = useState(0);

  const labelStyle = labelColor === 'black' ? styles.labelBlack : styles.labelWhite;

  function selectOption(option: SelectOption) {
    onChange(option);
  }

  useEffect(() => {
    if (isSelected) setHighlightedIndex(0);
  }, [isSelected]);

  return (
      <div className={`${styles.container} ${disabled ? styles.disabled : ''}`}>
        <label className={`${styles.label} ${labelStyle}`}>{label}</label>
        <div
          className={styles.select}
          onBlur={() => setIsSelected(false)}
          onClick={() => setIsSelected(prev => !prev)}
          tabIndex={0}
        >
          <span className={styles.value}>{value?.label}</span>
          <IoMdArrowDropdown />

          <ul className={`${styles.options} ${isSelected ? styles.show : ""}`}>
            {options.map((option, index) => (
              <li
                className={`${styles.option} ${index === HighlightedIndex ? styles.highlighted : ""}`}
                key={option.value}
                onMouseEnter={() => setHighlightedIndex(index)}
                onClick={e => {
                  e.stopPropagation;
                  selectOption(option);
                  setIsSelected(true);
                }}
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
    </div>
  );
}