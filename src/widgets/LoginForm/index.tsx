import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Button from '../../shared/ui/Button';
import AuthInput from '../../shared/ui/AuthInput';
import { LinkButton } from '../../shared/ui/LinkButton/index';
import styles from './LoginForm.module.scss'

type SignInFormState = {
  login: string;
  password: string;
};

const LoginForm = () => {
  const {t} = useTranslation()

  const {
    handleSubmit,
    control,
    formState: {
      errors: { login, password },
    },
  } = useForm<SignInFormState>({
    mode: 'onSubmit',
    defaultValues: {
      login: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<SignInFormState> = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <h2 className={styles.formTitle}>Greetings</h2>
      <AuthInput<SignInFormState>
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
      <AuthInput<SignInFormState>
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
      <Button buttonType='outlined' type="submit">{t('login')}</Button>
      <LinkButton href="/signup">{t('register')}</LinkButton>
    </form>
  );
};

export default LoginForm;
