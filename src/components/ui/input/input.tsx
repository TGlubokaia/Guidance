import { ComponentProps } from "react";

import clsx from "clsx";

import styles from './styles.module.scss';

type Props = {
  label?: string;
  isMulti?: boolean;
  isSearchable?: boolean;
  error?: string;
  // eslint-disable-next-line no-unused-vars
  onChange: (newValue: string) => void;
  defaultValue?: string;
} & ComponentProps<"input">;

export default function Input(props: Props) {
  const {
    label,
    error,
    onChange,
    defaultValue,
    ...rest
  } = props;

  return (
    <div className={styles.container}>
      {label && <label className={styles.label}>{label}</label>}
      <input
        className={clsx(styles.input, {
          [styles.input__error]: !!error,
        })}
        defaultValue={defaultValue}
        onChange={onChange}
        {...rest}
      />
      <div className={styles.error}>{error}</div>
    </div>
  )
}
