import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useRef, useState } from 'react';
import Button from '../../shared/ui/Button';
import AuthInput from '../../shared/ui/AuthInput';
import { LinkButton } from '../../shared/ui/LinkButton/index';
import styles from './LoginForm.module.scss';
import useScrollIntoView from '../../shared/hooks/useScrollIntoView';
import { apiRoot } from '../../app/services/commerceTools/Client';
import ErrorMessage from '../../shared/ui/ErrorMessage';

type SignInFormState = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const [signInError, setSignInError] = useState('');
  const { t } = useTranslation();

  const formRef = useRef<HTMLFormElement>(null);

  useScrollIntoView(formRef);

  const { handleSubmit, control } = useForm<SignInFormState>({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<SignInFormState> = async (data, event) => {
    event?.preventDefault();

    try {
      await apiRoot.me().login().post({ body: data }).execute();
      setSignInError('');
    } catch (error) {
      if (error instanceof Error && 'message' in error) {
        setSignInError(error.message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form} noValidate ref={formRef}>
      <h2 className={styles.formTitle}>{t('greetings')}</h2>
      <AuthInput<SignInFormState>
        control={control}
        name="email"
        type="text"
        rules={{
          required: 'emptyInput',
          minLength: {
            value: 5,
            message: 'minInputLength',
          },
          validate: {
            space: (value) => {
              return !/\s+/g.test(value) ? true : 'spaceValidation';
            },
            emailPattern: (value) => {
              const pattern = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
              return pattern.test(value) ? true : 'wrongEmail';
            },
          },
        }}
      />
      <AuthInput<SignInFormState>
        control={control}
        name="password"
        type="password"
        rules={{
          required: 'emptyInput',
          minLength: {
            value: 8,
            message: 'minInputLength',
          },
          validate: {
            space: (value) => {
              return !/\s+/g.test(value) ? true : 'spaceValidation';
            },
            uppercase: (value) => {
              return /[A-Z]/.test(value) ? true : 'uppercaseValidation';
            },
            lowercase: (value) => {
              return /[a-z]/.test(value) ? true : 'lowercaseValidation';
            },
            numbers: (value) => {
              return /[0-9]/.test(value) ? true : 'numberValidation';
            },
            special: (value) => {
              return /[!-/:-@[-`{-~]/.test(value) ? true : 'specialValidation';
            },
          },
        }}
      />
      <Button buttonType="outlined" type="submit">
        {t('login')}
      </Button>
      <LinkButton href="/signup">{t('register')}</LinkButton>
      {!!signInError && <ErrorMessage message={signInError} />}
    </form>
  );
};

export default LoginForm;
