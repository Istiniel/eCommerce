import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useEffect, useRef, useState } from 'react';
import { MyCustomerDraft } from '@commercetools/platform-sdk';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from '../../shared/ui/Button';
import AuthInput from '../../shared/ui/AuthInput';
import styles from './RegistrationForm.module.scss';
import ShippingAddress from './ShippingAddress';
import BillingAddress from './BillingAddress';
import './Autocomplete.scss';
import { signUp } from '../../app/services/commerceTools/Client';
import { getCountryCode } from '../../shared/static/countries';
import ErrorMessage from '../../shared/ui/ErrorMessage';
import { useAppDispatch, useAppSelector } from '../../app/redux/hooks';
import { selectCustomer } from '../../app/redux/features/AuthSlice/AuthSlice';
import { loginCustomer } from '../../app/redux/asyncThunks/loginCustomer';
import useScrollIntoView from '../../shared/hooks/useScrollIntoView';

export type SignUpFormState = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
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
  const [signUpError, setSignUpError] = useState('');
  const { t } = useTranslation();
  const formRef = useRef<HTMLFormElement>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const customer = useAppSelector(selectCustomer);

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
      shippingAsBilling: false,
      billingAsShipping: true,
      shippingAsDefault: true,
      billingAsDefault: true,
    },
  });

  const onSubmit: SubmitHandler<SignUpFormState> = async (data, event) => {
    event?.preventDefault();

    const {
      email,
      password,
      firstName,
      lastName,
      dateOfBirth,
      shippingAddress: shipping,
      billingAddress: billing,
      shippingAsBilling,
      billingAsShipping,
      shippingAsDefault,
      billingAsDefault,
    } = data;

    const billingCountry = getCountryCode(billing.country);
    const billingAddress = { ...billing, country: billingCountry };

    const shippingCountry = getCountryCode(shipping.country);
    const shippingAddress = { ...shipping, country: shippingCountry };

    const resultingShippingAddress = shippingAsBilling ? billingAddress : shippingAddress;
    const resultingBillingAddress = billingAsShipping ? shippingAddress : billingAddress;

    const newClient: MyCustomerDraft = {
      email,
      password,
      firstName,
      lastName,
      dateOfBirth,
      addresses: [resultingShippingAddress, resultingBillingAddress],
      defaultShippingAddress: shippingAsDefault ? 0 : undefined,
      defaultBillingAddress: billingAsDefault ? 1 : undefined,
    };

    try {
      await signUp(newClient);
      setSignUpError('');

      const result = await dispatch(
        loginCustomer({ email: newClient.email, password: newClient.password }),
      );
      if (result.meta.requestStatus !== 'rejected') {
        navigate('/');
        toast.success('Success', {
          position: 'top-right',
          autoClose: 3500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      }
    } catch (error) {
      if (error instanceof Error && 'message' in error) {
        setSignUpError(error.message);
      }
    }
  };

  useEffect(() => {
    if (customer) {
      navigate('/', { replace: true });
    }
  }, [customer, navigate]);

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
      {!!signUpError && <ErrorMessage message={signUpError} />}
    </form>
  );
};

export default RegistrationForm;
