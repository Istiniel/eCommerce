import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useEffect, useRef, useState } from 'react';
import { CustomerDraft } from '@commercetools/platform-sdk';
import { useNavigate } from 'react-router-dom';
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
import { showSuccessMessage } from '../../shared/helpers/showSuccessMessage';

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
    postalCode: string;
    streetNumber: string;
  };
  billingAddress: {
    country: string;
    city: string;
    postalCode: string;
    streetNumber: string;
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

  const { handleSubmit, control, watch, setValue, clearErrors } = useForm<SignUpFormState>({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      shippingAddress: {
        country: '',
        city: '',
        postalCode: '',
        streetNumber: '',
      },
      billingAddress: {
        country: '',
        city: '',
        postalCode: '',
        streetNumber: '',
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

    let addresses: SignUpFormState['shippingAddress' | 'billingAddress'][] = [];
    const defaultShippingAddressIndex: number = 0;
    let defaultBillingAddressIndex: number = 0;

    if (!shippingAsBilling && !billingAsShipping) {
      addresses = [shippingAddress, billingAddress];
      defaultBillingAddressIndex = 1;
    }

    if (shippingAsBilling) {
      addresses = [billingAddress];
    }

    if (billingAsShipping) {
      addresses = [shippingAddress];
    }

    const newClient: CustomerDraft = {
      email,
      password,
      firstName,
      lastName,
      dateOfBirth,
      addresses,
      defaultShippingAddress: shippingAsDefault ? defaultShippingAddressIndex : undefined,
      defaultBillingAddress: billingAsDefault ? defaultBillingAddressIndex : undefined,
      shippingAddresses: [defaultShippingAddressIndex],
      billingAddresses: [defaultBillingAddressIndex],
    };

    try {
      await signUp(newClient);
      setSignUpError('');

      const result = await dispatch(
        loginCustomer({ email: newClient.email, password: newClient.password! }),
      );

      if (result.meta.requestStatus !== 'rejected') {
        navigate('/');
        showSuccessMessage();
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
        <ShippingAddress
          clearErrors={clearErrors}
          control={control}
          watch={watch}
          setValue={setValue}
        />
        <BillingAddress
          clearErrors={clearErrors}
          control={control}
          watch={watch}
          setValue={setValue}
        />
      </div>
      <Button type="submit">{t('registration')}</Button>
      {!!signUpError && <ErrorMessage message={signUpError} />}
    </form>
  );
};

export default RegistrationForm;
