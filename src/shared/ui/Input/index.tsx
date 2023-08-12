import React, { InputHTMLAttributes, useState } from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import styles from './Input.module.scss';

interface Props {
  type: InputHTMLAttributes<HTMLInputElement>['type'];
  name: string;
  error: string;
  placeholder?: string;
  value: string;
  onChange: VoidFunction;
  invalid: boolean;
  nativeValidation?: boolean;
}

type InputRef = HTMLInputElement;

export const Input = React.forwardRef<InputRef, Props>((props, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  const {
    type,
    name,
    error,
    placeholder,
    value,
    onChange,
    invalid = false,
    nativeValidation = true,
  } = props;
  const { t } = useTranslation();

  return (
    <label htmlFor={name} className={styles.label}>
      <input
        className={classNames(
          { [styles.invalid]: invalid, [styles.active]: isFocused },
          styles.input,
        )}
        formNoValidate={nativeValidation}
        name={name}
        type={type}
        placeholder={placeholder || t(name)}
        ref={ref}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <p className={styles.errorMessage}>{t(error)}</p>
    </label>
  );
});
