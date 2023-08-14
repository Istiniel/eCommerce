import { Control, Controller, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import classNames from 'classnames';
import { AutoComplete, Checkbox } from 'antd';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import AuthInput from '../../../shared/ui/AuthInput';
import { countries } from '../../../shared/static/countries';
import type { SignUpFormState } from '../index';
import styles from './BillingAddress.module.scss';

interface BillingAddressProps {
  control: Control<SignUpFormState>;
  watch: UseFormWatch<SignUpFormState>;
  setValue: UseFormSetValue<SignUpFormState>;
}

function BillingAddress(props: BillingAddressProps) {
  const { t } = useTranslation();

  const { control, watch, setValue } = props;

  const billingAsShipping = watch('billingAsShipping');
  const billingAsDefault = watch('billingAsDefault');

  useEffect(() => {
    if (billingAsShipping) {
      setValue('shippingAsBilling', false);
    }
  }, [billingAsShipping, setValue]);

  useEffect(() => {
    if (billingAsDefault) {
      setValue('shippingAsDefault', false);
    }
  }, [billingAsDefault, setValue]);

  return (
    <fieldset className={styles.container}>
      <h2 className={styles.heading}>Billing</h2>
      <div className={styles.countryContainer}>
        <span className={styles.countryTitle}>Country</span>
        <Controller
          control={control}
          name="billingAddress.country"
          rules={{
            required: billingAsShipping ? false : 'emptyInput',
            validate: billingAsShipping
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
        name="billingAddress.city"
        control={control}
        rules={{
          required: billingAsShipping ? false : 'emptyInput',
          validate: billingAsShipping
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
        name="billingAddress.street"
        control={control}
        rules={{
          required: billingAsShipping ? false : 'emptyInput',
          minLength: {
            value: 1,
            message: 'minInputLength',
          },
          validate: billingAsShipping
            ? undefined
            : {
                space: (value) => {
                  return !/\s+/g.test(String(value)) ? true : 'spaceValidation';
                },
              },
        }}
      />
      <AuthInput
        name="billingAddress.postal"
        control={control}
        rules={{
          required: billingAsShipping ? false : 'emptyInput',
          minLength: billingAsShipping
            ? undefined
            : {
                value: 1,
                message: 'minInputLength',
              },
          validate: billingAsShipping
            ? undefined
            : {
                space: (value) => {
                  return !/\s+/g.test(String(value)) ? true : 'spaceValidation';
                },
              },
        }}
      />
      <Controller
        control={control}
        name="shippingAsBilling"
        render={({ field: { onChange, value } }) => (
          <Checkbox
            checked={value}
            className={styles.checkbox}
            name="same-address"
            onChange={onChange}
          >
            {t('useForShipping')}
          </Checkbox>
        )}
      />
      <Controller
        control={control}
        name="billingAsDefault"
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

export default BillingAddress;
