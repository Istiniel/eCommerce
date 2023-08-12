import React, { HTMLInputTypeAttribute } from 'react';
import { Control, Controller, FieldValues, Path, RegisterOptions } from 'react-hook-form';
import styles from './AuthInput.module.scss';
import { Input } from '../Input';

interface AuthInputProps<T extends FieldValues> {
  name: Path<T>;
  type?: HTMLInputTypeAttribute;
  rules:
    | Omit<RegisterOptions<T, Path<T>>, 'setValueAs' | 'disabled' | 'valueAsNumber' | 'valueAsDate'>
    | undefined;
  control: Control<T>;
  error: string;
}

function AuthInput<T extends FieldValues>({
  name,
  type,
  control,
  rules,
  error
}: React.PropsWithChildren<AuthInputProps<T>>) {
  return (
    <div className={styles.input}>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { onChange, value, ref }, fieldState: { invalid } }) => (
          <Input
            value={value}
            onChange={onChange}
            placeholder={name[0].toUpperCase() + name.slice(1)}
            type={type}
            invalid={invalid}
            name={name}
            error={error}
            ref={ref}
          />
        )}
      />
    </div>
  );
}

export default AuthInput;
