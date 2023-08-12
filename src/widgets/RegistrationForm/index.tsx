import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Button from '../../shared/ui/Button';
import AuthInput from '../../shared/ui/AuthInput';
import styles from './RegistrationForm.module.scss'

type SignUpFormState = {
  login: string;
  password: string;
};

const RegistrationForm = () => {
  const {t} = useTranslation()

  const {
    handleSubmit,
    control,
    formState: {
      errors: { login, password },
    },
  } = useForm<SignUpFormState>({
    mode: 'onSubmit',
    defaultValues: {
      login: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<SignUpFormState> = (data) => {
    // eslint-disable-next-line no-console
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <h2 className={styles.formTitle}>{t('registration')}</h2>
      <AuthInput<SignUpFormState>
        control={control}
        name="login"
        type="text"
        error={login?.message || ''}
        rules={{
          required: 'emptyLoginInput',
          minLength: {
            value: 5,
            message: 'minInputLength',
          },
        }}
      />
      <AuthInput<SignUpFormState>
        control={control}
        name="password"
        type="password"
        error={password?.message || ''}
        rules={{
          required: 'emptyPasswordInput',
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
      <Button type="submit">{t('registration')}</Button>
    </form>
  );
};

export default RegistrationForm;
