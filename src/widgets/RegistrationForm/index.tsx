import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useRef } from 'react';
import Button from '../../shared/ui/Button';
import AuthInput from '../../shared/ui/AuthInput';
import styles from './RegistrationForm.module.scss';
import useScrollIntoView from '../../shared/hooks/useScrollIntoView';
import ShippingAddress from './ShippingAddress';
import BillingAddress from './BillingAddress';
import './Autocomplete.scss';

export type SignUpFormState = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: number;
  shippingAsBilling: boolean;
  billingAsShipping: boolean;
  shippingAsDefault: boolean;
  billingAsDefault: boolean;
  shippingAddress: {
    country: string;
    city: string;
    postal: string;
    street: string;
  };
  billingAddress: {
    country: string;
    city: string;
    postal: string;
    street: string;
  };
};

const RegistrationForm = () => {
  const { t } = useTranslation();
  const formRef = useRef<HTMLFormElement>(null);

  useScrollIntoView(formRef);

  const { handleSubmit, control, watch, setValue } = useForm<SignUpFormState>({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      shippingAddress: {
        country: '',
        city: '',
        postal: '',
        street: '',
      },
      billingAddress: {
        country: '',
        city: '',
        postal: '',
        street: '',
      },
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
      <AuthInput
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
              return !/\s+/g.test(String(value)) ? true : 'spaceValidation';
            },
            emailPattern: (value) => {
              const pattern = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
              return pattern.test(String(value)) ? true : 'wrongEmail';
            },
          },
        }}
      />
      <AuthInput
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
              return !/\s+/g.test(String(value)) ? true : 'spaceValidation';
            },
            uppercase: (value) => {
              return /[A-Z]/.test(String(value)) ? true : 'uppercaseValidation';
            },
            lowercase: (value) => {
              return /[a-z]/.test(String(value)) ? true : 'lowercaseValidation';
            },
            numbers: (value) => {
              return /[0-9]/.test(String(value)) ? true : 'numberValidation';
            },
            special: (value) => {
              return /[!-/:-@[-`{-~]/.test(String(value)) ? true : 'specialValidation';
            },
          },
        }}
      />
      <AuthInput
        control={control}
        name="firstName"
        type="text"
        rules={{
          required: 'emptyInput',
          minLength: {
            value: 1,
            message: 'minInputLength',
          },
          validate: {
            space: (value) => {
              return !/\s+/g.test(String(value)) ? true : 'spaceValidation';
            },
            special: (value) => {
              return !/[!-/:-@[-`{-~]/.test(String(value)) ? true : 'noSpecialSymbols';
            },
            numbers: (value) => {
              return !/[0-9]/.test(String(value)) ? true : 'noNumbers';
            },
          },
        }}
      />
      <AuthInput
        control={control}
        name="lastName"
        type="text"
        rules={{
          required: 'emptyInput',
          minLength: {
            value: 1,
            message: 'minInputLength',
          },
          validate: {
            space: (value) => {
              return !/\s+/g.test(String(value)) ? true : 'spaceValidation';
            },
            special: (value) => {
              return !/[!-/:-@[-`{-~]/.test(String(value)) ? true : 'noSpecialSymbols';
            },
            numbers: (value) => {
              return !/[0-9]/.test(String(value)) ? true : 'noNumbers';
            },
          },
        }}
      />
      <AuthInput
        control={control}
        name="dateOfBirth"
        type="date"
        rules={{
          required: 'emptyInput',
          validate: {
            birthDate: (value) => {
              const date = new Date(String(value));
              const age = new Date().getFullYear() - date.getFullYear();
              return age >= 13 ? true : 'ageValidation';
            },
          },
        }}
      />
      <h2 className={styles.addressTitle}>Address</h2>
      <div className={styles.addressContainer}>
        <ShippingAddress control={control} watch={watch} setValue={setValue} />
        <BillingAddress control={control} watch={watch} setValue={setValue} />
      </div>
      <Button type="submit">{t('registration')}</Button>
    </form>
  );
};

export default RegistrationForm;
