import {
  Control,
  Controller,
  UseFormClearErrors,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import { AutoComplete, Checkbox } from 'antd';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import AuthInput from '../../../shared/ui/AuthInput';
import { countries, getPostalCodePattern } from '../../../shared/static/countries';
import type { SignUpFormState } from '../index';
import styles from './ShippingAddress.module.scss';

interface ShippingAddressProps {
  control: Control<SignUpFormState>;
  watch: UseFormWatch<SignUpFormState>;
  setValue: UseFormSetValue<SignUpFormState>;
  clearErrors: UseFormClearErrors<SignUpFormState>;
}

function ShippingAddress(props: ShippingAddressProps) {
  const { control, watch, setValue, clearErrors } = props;
  const { t } = useTranslation();

  const shippingAsBilling = watch('shippingAsBilling');

  const {
    shippingAddress: { country: shippingCountry },
  } = watch();

  useEffect(() => {
    if (shippingAsBilling) {
      clearErrors('shippingAddress');
      setValue('billingAsShipping', false);
    }
  }, [shippingAsBilling, setValue, clearErrors]);

  return (
    <fieldset className={styles.container}>
      <h2 className={styles.heading}>Shipping</h2>
      <div className={styles.countryContainer}>
        <span className={styles.countryTitle}>Country</span>
        <Controller
          control={control}
          name="shippingAddress.country"
          rules={{
            required: shippingAsBilling ? false : 'emptyInput',
            validate: shippingAsBilling
              ? undefined
              : {
                  country: (value) => {
                    const isCountryExisted = countries.some((country) => country.value === value);
                    return isCountryExisted ? true : 'noCountry';
                  },
                },
          }}
          render={({ field: { onChange, onBlur, value, ref }, fieldState: { invalid, error } }) => (
            <>
              <AutoComplete
                className={classNames({ invalid }, 'autocomplete-container')}
                aria-invalid={invalid}
                value={value}
                ref={ref}
                disabled={shippingAsBilling}
                onChange={onChange}
                onBlur={onBlur}
                style={{ width: '100%' }}
                options={countries}
                placeholder="Select country"
              />
              <p className={styles.countryError}>{t(error?.message || '')}</p>
            </>
          )}
        />
      </div>
      <AuthInput
        name="shippingAddress.city"
        control={control}
        disabled={shippingAsBilling}
        rules={{
          required: shippingAsBilling ? false : 'emptyInput',
          validate: shippingAsBilling
            ? undefined
            : {
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
        name="shippingAddress.streetNumber"
        control={control}
        disabled={shippingAsBilling}
        rules={{
          required: shippingAsBilling ? false : 'emptyInput',
          minLength: shippingAsBilling
            ? undefined
            : {
                value: 1,
                message: 'minInputLength',
              },
          validate: shippingAsBilling
            ? undefined
            : {
                space: (value) => {
                  return !/\s+/g.test(String(value)) ? true : 'spaceValidation';
                },
              },
        }}
      />
      <AuthInput
        name="shippingAddress.postalCode"
        control={control}
        disabled={shippingAsBilling}
        rules={{
          required: shippingAsBilling ? false : 'emptyInput',
          minLength: shippingAsBilling
            ? undefined
            : {
                value: 1,
                message: 'minInputLength',
              },
          validate: shippingAsBilling
            ? undefined
            : {
                space: (value) => {
                  return !/\s+/g.test(String(value)) ? true : 'spaceValidation';
                },
                rule: (value) => {
                  const pattern = getPostalCodePattern(shippingCountry);
                  if (pattern) {
                    return pattern.test(String(value)) ? true : 'invalidPostalCode';
                  }
                  return true;
                },
              },
        }}
      />
      <Controller
        control={control}
        name="billingAsShipping"
        render={({ field: { onChange, value } }) => (
          <Checkbox
            checked={value}
            className={styles.checkbox}
            name="same-address"
            onClick={(e) => {
              onChange(e);
            }}
          >
            {t('useForBilling')}
          </Checkbox>
        )}
      />
      <Controller
        control={control}
        name="shippingAsDefault"
        render={({ field: { onChange, value } }) => (
          <Checkbox
            checked={value}
            className={styles.checkbox}
            name="same-address"
            onChange={onChange}
          >
            {t('asDefaultAddress')}
          </Checkbox>
        )}
      />
    </fieldset>
  );
}

export default ShippingAddress;
