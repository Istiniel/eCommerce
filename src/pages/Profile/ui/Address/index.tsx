import { useRef, useState } from 'react';
import classNames from 'classnames';
import { SubmitHandler, useForm } from 'react-hook-form';
import { MyCustomerUpdate } from '@commercetools/platform-sdk';
import styles from './Address.module.scss';
import { useAppDispatch } from '../../../../app/redux/hooks';
import Button from '../../../../shared/ui/Button';
import { getCountryCode, getCountryName } from '../../../../shared/static/countries';
import ErrorMessage from '../../../../shared/ui/ErrorMessage';
import { showSuccessMessage } from '../../../../shared/helpers/showSuccessMessage';
import { updateCustomer } from '../../../../app/redux/asyncThunks/updateCustomer';
import AddressInfo from '../AddressInfo';

export type AddressState = {
  asDefault: boolean;
  country: string;
  city: string;
  postalCode: string;
  streetNumber: string;
};

interface AddressProps extends AddressState {
  id: string;
  type: 'shipping' | 'billing';
}

const Address: React.FC<AddressProps> = (props) => {
  const { asDefault, city, country, postalCode, streetNumber, id, type } = props;
  const dispatch = useAppDispatch();

  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  const { handleSubmit, control, watch, reset } = useForm<AddressState>({
    mode: 'onChange',
    defaultValues: {
      asDefault,
      country: getCountryName(country),
      city,
      postalCode,
      streetNumber,
    },
  });

  const onSubmit: SubmitHandler<AddressState> = async (data, event) => {
    event?.preventDefault();

    const countryCode = getCountryCode(data.country);
    const addressWithCode = { ...data, country: countryCode };

    const requestBody: Omit<MyCustomerUpdate, 'version'> = {
      actions: [
        {
          action: 'changeAddress',
          addressId: id,
          address: addressWithCode,
        },
        ...(data.asDefault && type === 'shipping'
          ? [
              {
                action: 'setDefaultShippingAddress',
                addressId: id,
              } as const,
            ]
          : []),
        ...(!data.asDefault && type === 'shipping'
          ? [
              {
                action: 'removeShippingAddressId',
                addressId: id,
              } as const,
              {
                action: 'addShippingAddressId',
                addressId: id,
              } as const,
            ]
          : []),
        ...(data.asDefault && type === 'billing'
          ? [
              {
                action: 'setDefaultBillingAddress',
                addressId: id,
              } as const,
            ]
          : []),
        ...(!data.asDefault && type === 'billing'
          ? [
              {
                action: 'removeBillingAddressId',
                addressId: id,
              } as const,
              {
                action: 'addBillingAddressId',
                addressId: id,
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

    setEditMode(false);
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className={styles.form} noValidate>
      <div className={styles.addressContainer}>
        <AddressInfo control={control} watch={watch} disabled={!editMode} type={type} />
      </div>
      <div className={styles.controlButtonsContainer}>
        <Button
          className={classNames({ [styles.disabled]: editMode })}
          type="button"
          onClick={() => setEditMode(true)}
        >
          Edit
        </Button>
        <Button className={classNames({ [styles.disabled]: !editMode })} type="submit">
          Apply
        </Button>
        <Button
          className={classNames({ [styles.disabled]: !editMode })}
          type="button"
          onClick={() => {
            setEditMode(false);
            reset();
          }}
        >
          Dismiss
        </Button>
      </div>
      {!!error && <ErrorMessage message={error} />}
    </form>
  );
};

export default Address;
