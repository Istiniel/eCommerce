import { Control, Controller, UseFormWatch } from 'react-hook-form';
import classNames from 'classnames';
import { AutoComplete, Checkbox } from 'antd';
import { useTranslation } from 'react-i18next';
import styles from './AddressInfo.module.scss';
import type { AddressState } from '../Address';
import { countries, getPostalCodePattern } from '../../../../shared/static/countries';
import AuthInput from '../../../../shared/ui/AuthInput';

interface AddressProps {
  control: Control<AddressState>;
  watch: UseFormWatch<AddressState>;
  disabled?: boolean;
  type: 'billing' | 'shipping'
}

function AddressInfo(props: AddressProps) {
  const { t } = useTranslation();

  const { control, watch, disabled = false, type } = props;

  const { country } = watch();

  return (
    <fieldset className={styles.container}>
      <h2 className={styles.heading}>{type === 'billing' ? 'Billing address' : 'Shipping address'}</h2>
      <div className={styles.countryContainer}>
        <span className={styles.countryTitle}>Country</span>
        <Controller
          control={control}
          name="country"
          rules={{
            required: 'emptyInput',
            validate: {
              country: (value) => {
                const isCountryExisted = countries.some((existedCountry) => existedCountry.value === value);
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
                disabled={disabled}
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
        name="city"
        control={control}
        disabled={disabled}
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
        name="streetNumber"
        control={control}
        disabled={disabled}
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
        name="postalCode"
        control={control}
        disabled={disabled}
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
            rule: (value) => {
              const pattern = getPostalCodePattern(country);
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
        name="asDefault"
        render={({ field: { onChange, value } }) => (
          <Checkbox
            checked={value}
            className={styles.checkbox}
            name="same-address"
            onChange={onChange}
            disabled={disabled}
          >
            {t('defaultAddress')}
          </Checkbox>
        )}
      />
    </fieldset>
  );
}

export default AddressInfo;
