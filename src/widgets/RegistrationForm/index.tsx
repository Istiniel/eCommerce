import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useRef } from 'react';
import Button from '../../shared/ui/Button';
import AuthInput from '../../shared/ui/AuthInput';
import styles from './RegistrationForm.module.scss';
import useScrollIntoView from '../../shared/hooks/useScrollIntoView';

type SignUpFormState = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: number;
  address: number;
};

const RegistrationForm = () => {
  const { t } = useTranslation();

  const formRef = useRef<HTMLFormElement>(null);

  useScrollIntoView(formRef)

  const {
    handleSubmit,
    control,
    formState: {
      errors: { email, password, firstName, lastName, address, dateOfBirth },
    },
  } = useForm<SignUpFormState>({
    mode: 'onSubmit',
    defaultValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
    },
  });

  const onSubmit: SubmitHandler<SignUpFormState> = (data, event) => {
    event?.preventDefault();
    // eslint-disable-next-line no-console
    console.log(data);
    // eslint-disable-next-line no-console
    console.log(event);
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className={styles.form} noValidate>
      <h2 className={styles.formTitle}>{t('registration')}</h2>
      <AuthInput<SignUpFormState>
        control={control}
        name="email"
        type="email"
        error={email?.message || ''}
        rules={{
          required: 'emptyInput',
          minLength: {
            value: 5,
            message: 'minInputLength',
          },
          pattern: {
            value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
            message: 'wrongEmail',
          },
        }}
      />
      <AuthInput<SignUpFormState>
        control={control}
        name="password"
        type="password"
        error={password?.message || ''}
        rules={{
          required: 'emptyInput',
          minLength: {
            value: 5,
            message: 'minInputLength',
          },
          pattern: {
            value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{5,}$/,
            message: 'wrongPassword',
          },
        }}
      />
      <AuthInput<SignUpFormState>
        control={control}
        name="firstName"
        type="text"
        error={firstName?.message || ''}
        rules={{
          required: 'emptyInput',
          minLength: {
            value: 5,
            message: 'minInputLength',
          },
        }}
      />
      <AuthInput<SignUpFormState>
        control={control}
        name="lastName"
        type="text"
        error={lastName?.message || ''}
        rules={{
          required: 'emptyInput',
          minLength: {
            value: 5,
            message: 'minInputLength',
          },
        }}
      />
      <AuthInput<SignUpFormState>
        control={control}
        name="address"
        type="text"
        error={address?.message || ''}
        rules={{
          required: 'emptyInput',
          minLength: {
            value: 5,
            message: 'minInputLength',
          },
        }}
      />
      <AuthInput<SignUpFormState>
        control={control}
        name="dateOfBirth"
        type="date"
        error={dateOfBirth?.message || ''}
        rules={{
          required: 'emptyInput',
          minLength: {
            value: 5,
            message: 'minInputLength',
          },
        }}
      />
      <Button type="submit">{t('registration')}</Button>
    </form>
  );
};

export default RegistrationForm;
