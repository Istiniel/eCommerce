import React, { InputHTMLAttributes, useState } from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { Checkbox } from 'antd';
import styles from './Input.module.scss';

interface Props {
  type: InputHTMLAttributes<HTMLInputElement>['type'];
  name: string;
  error: string;
  placeholder?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  invalid?: boolean;
  nativeValidation?: boolean;
  disabled?: boolean;
  defaultValue?: string;
  showPasswordToggler?: boolean;
  noLabel?: boolean;
  labelClassName?: string;
}

type InputRef = HTMLInputElement;

export const Input = React.forwardRef<InputRef, Props>((props, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    type,
    name,
    error,
    placeholder,
    value,
    onChange,
    invalid = false,
    nativeValidation = true,
    disabled = false,
    defaultValue,
    showPasswordToggler = true,
    noLabel = false,
    labelClassName,
  } = props;
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <label
        htmlFor={name}
        className={classNames(labelClassName || labelClassName, styles.label)}
      >
        {!noLabel && <span className={styles.title}>{t(name)}</span>}
        <input
          className={classNames(
            { [styles.invalid]: invalid, [styles.active]: isFocused, [styles.disabled]: disabled },
            styles.input,
          )}
          formNoValidate={nativeValidation}
          name={name}
          type={type === 'password' && showPassword ? 'text' : type}
          placeholder={placeholder || t(name)}
          ref={ref}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          disabled={disabled}
          defaultValue={defaultValue}
        />
        <p className={styles.errorMessage}>{t(error)}</p>
      </label>
      {type === 'password' && showPasswordToggler && (
        <Checkbox
          className={styles.showPassword}
          onChange={() => {
            setShowPassword((prevState) => !prevState);
          }}
        >
          {t('showPassword')}
        </Checkbox>
      )}
    </div>
  );
});
