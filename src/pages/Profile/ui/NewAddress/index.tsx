import { useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { MyCustomerUpdate } from '@commercetools/platform-sdk';
import styles from './NewAddress.module.scss';
import { useAppDispatch } from '../../../../app/redux/hooks';
import Button from '../../../../shared/ui/Button';
import { getCountryCode } from '../../../../shared/static/countries';
import ErrorMessage from '../../../../shared/ui/ErrorMessage';
import { showSuccessMessage } from '../../../../shared/helpers/showSuccessMessage';
import { updateCustomer } from '../../../../app/redux/asyncThunks/updateCustomer';
import AddressInfo from '../AddressInfo';
import { AddressState } from '../Address';

const NewAddress = () => {
  const dispatch = useAppDispatch();

  const [error, setError] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  const { handleSubmit, control, watch } = useForm<AddressState>({
    mode: 'onChange',
    defaultValues: {
      asDefault: false,
      country: "",
      city: "",
      postalCode: "",
      streetNumber: "",
      type: false
    },
  });

  const onSubmit: SubmitHandler<AddressState> = async (data, event) => {
    event?.preventDefault();

    const countryCode = getCountryCode(data.country);

    const requestBody: Omit<MyCustomerUpdate, 'version'> = {
      actions: [
        {
          action: 'addAddress',
          address: {
            key: `${countryCode}-${data.city}`,
            country: countryCode,
            city: data.city,
            postalCode: data.postalCode,
            streetNumber: data.streetNumber,
          },
        },
        ...(data.asDefault && !data.type
          ? [
              {
                action: 'setDefaultShippingAddress',
                addressKey: `${countryCode}-${data.city}`
              } as const,
            ]
          : []),
        ...(!data.asDefault && !data.type
          ? [
              {
                action: 'removeShippingAddressId',
                addressKey: `${countryCode}-${data.city}`
              } as const,
              {
                action: 'addShippingAddressId',
                addressKey: `${countryCode}-${data.city}`
              } as const,
            ]
          : []),
        ...(data.asDefault && data.type
          ? [
              {
                action: 'setDefaultBillingAddress',
                addressKey: `${countryCode}-${data.city}`
              } as const,
            ]
          : []),
        ...(!data.asDefault && data.type
          ? [
              {
                action: 'removeBillingAddressId',
                addressKey: `${countryCode}-${data.city}`
              } as const,
              {
                action: 'addBillingAddressId',
                addressKey: `${countryCode}-${data.city}`
              } as const,
            ]
          : []),
      ],
    };

    try {
      setError('');

      const result = await dispatch(updateCustomer(requestBody));

      if (result.meta.requestStatus !== 'rejected') {
        showSuccessMessage();
      }
    } catch (requestError) {
      if (requestError instanceof Error && 'message' in requestError) {
        setError(requestError.message);
      }
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className={styles.form} noValidate>
      <div className={styles.addressContainer}>
        <AddressInfo control={control} watch={watch} type='new' />
      </div>
      <div className={styles.controlButtonsContainer}>
        <Button type="submit">
          Apply
        </Button>
      </div>
      {!!error && <ErrorMessage message={error} />}
    </form>
  );
};

export default NewAddress;
