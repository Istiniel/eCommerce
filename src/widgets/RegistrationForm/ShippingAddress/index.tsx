import { Control, Controller } from 'react-hook-form';
import { AutoComplete } from 'antd';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import AuthInput from '../../../shared/ui/AuthInput';
import { countries } from '../../../shared/static/countries';
import type { SignUpFormState } from '../index';
import styles from './ShippingAddress.module.scss';

interface ShippingAddressProps {
  control: Control<SignUpFormState>;
}

function ShippingAddress(props: ShippingAddressProps) {
  const { control } = props;
  const { t } = useTranslation();

  return (
    <>
      <div className={styles.countryContainer}>
        <span className={styles.countryTitle}>Country</span>
        <Controller
          control={control}
          name="shippingAddress.country"
          rules={{
            required: 'emptyInput',
            validate: {
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
        name="shippingAddress.city"
        control={control}
        rules={{
          required: 'emptyInput',
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
        name="shippingAddress.street"
        control={control}
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
          },
        }}
      />
      <AuthInput
        name="shippingAddress.postal"
        control={control}
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
          },
        }}
      />
    </>
  );
}

export default ShippingAddress;
