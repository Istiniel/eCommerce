import { HTMLInputTypeAttribute } from 'react';
import { UseControllerProps, useController, FieldValues } from 'react-hook-form';
import { Input } from '../Input/index';

interface AuthInputProps<T extends FieldValues> extends UseControllerProps<T> {
  type?: HTMLInputTypeAttribute;
  disabled?: boolean;
}

function AuthInput<T extends FieldValues>(props: AuthInputProps<T>) {
  const { type, disabled } = props;

  const {
    field: { onChange, value, ref, name },
    fieldState: { invalid, error },
  } = useController(props);

  return (
    <Input
      disabled={disabled}
      value={value}
      onChange={onChange}
      invalid={invalid}
      name={name}
      type={type}
      error={error?.message || ''}
      ref={ref}
      nativeValidation={type !== 'email'}
    />
  );
}

export default AuthInput;
