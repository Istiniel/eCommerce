import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useRef } from 'react';
import Button from '../../shared/ui/Button';
import AuthInput from '../../shared/ui/AuthInput';
import { LinkButton } from '../../shared/ui/LinkButton/index';
import styles from './LoginForm.module.scss';
import useScrollIntoView from '../../shared/hooks/useScrollIntoView';

type SignInFormState = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const { t } = useTranslation();

  const formRef = useRef<HTMLFormElement>(null);

  useScrollIntoView(formRef);

  const {
    handleSubmit,
    control,
    formState: {
      errors: { email, password },
    },
  } = useForm<SignInFormState>({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<SignInFormState> = (data, event) => {
    event?.preventDefault();
    // eslint-disable-next-line no-console
    console.log(data);
    // eslint-disable-next-line no-console
    console.log(event);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form} noValidate ref={formRef}>
      <h2 className={styles.formTitle}>{t('greetings')}</h2>
      <AuthInput<SignInFormState>
        control={control}
        name="email"
        type="text"
        error={email?.message || ''}
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
        error={password?.message || ''}
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
    </form>
  );
};

export default LoginForm;
