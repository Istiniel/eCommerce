import {
  Control,
  Controller,
  UseFormWatch,
} from 'react-hook-form';
import classNames from 'classnames';
import { AutoComplete, Checkbox } from 'antd';
import { useTranslation } from 'react-i18next';
import styles from './BillingAddressInfo.module.scss';
import type { AddressesInfoState } from '../AddressesInfo';
import { countries, getPostalCodePattern } from '../../../../shared/static/countries';
import AuthInput from '../../../../shared/ui/AuthInput';

interface BillingAddressProps {
  control: Control<AddressesInfoState>;
  watch: UseFormWatch<AddressesInfoState>;
  disabled?: boolean;
}

function BillingAddress(props: BillingAddressProps) {
  const { t } = useTranslation();

  const { control, watch, disabled = false } = props;


  const {
    billingAddress: { country: billingCountry },
  } = watch();


  return (
    <fieldset className={styles.container}>
      <h2 className={styles.heading}>Billing</h2>
      <div className={styles.countryContainer}>
        <span className={styles.countryTitle}>Country</span>
        <Controller
          control={control}
          name="billingAddress.country"
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
        name="billingAddress.city"
        control={control}
        disabled={disabled}
        rules={{
          required: 'emptyInput',
          validate:{
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
        name="billingAddress.streetNumber"
        control={control}
        disabled={disabled}
        rules={{
          required: 'emptyInput',
          minLength: {
            value: 1,
            message: 'minInputLength',
          },
          validate:{
                space: (value) => {
                  return !/\s+/g.test(String(value)) ? true : 'spaceValidation';
                },
              },
        }}
      />
      <AuthInput
        name="billingAddress.postalCode"
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
                  const pattern = getPostalCodePattern(billingCountry);
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
        name="billingAsDefault"
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

export default BillingAddress;
