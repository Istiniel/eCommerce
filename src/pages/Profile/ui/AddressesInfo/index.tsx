import { useRef, useState } from 'react';
import classNames from 'classnames';
import { SubmitHandler, useForm } from 'react-hook-form';
import styles from './AddressesInfo.module.scss';
import { useAppSelector } from '../../../../app/redux/hooks';
import { selectCustomer } from '../../../../app/redux/features/AuthSlice/AuthSlice';
import Button from '../../../../shared/ui/Button';
import { getCountryName } from '../../../../shared/static/countries';
import ErrorMessage from '../../../../shared/ui/ErrorMessage';
import ShippingAddressInfo from '../ShippingAddressInfo';
import BillingAddressInfo from '../BillingAddressInfo';


export type AddressesInfoState = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
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

const AddressesInfo = () => {
  const [editMode, setEditMode] = useState(false);
  const [error] = useState('');
  const formRef = useRef<HTMLFormElement>(null);
  // const dispatch = useAppDispatch();
  const customer = useAppSelector(selectCustomer);
  const { addresses, defaultBillingAddressId, defaultShippingAddressId } = customer!;
  const {
    country: shippingCountryCode,
    city: shippingCity,
    postalCode: shippingPostalCode,
    streetNumber: shippingStreetNumber,
    id: shippingAddressId,
  } = addresses[0];
  const {
    country: billingCountryCode,
    city: billingCity,
    postalCode: billingPostalCode,
    streetNumber: billingStreetNumber,
    id: billingAddressId,
  } = addresses[1];

  const { handleSubmit, control, watch, reset } =
    useForm<AddressesInfoState>({
      mode: 'onChange',
      defaultValues: {
        shippingAddress: {
          country: getCountryName(shippingCountryCode),
          city: shippingCity,
          postalCode: shippingPostalCode,
          streetNumber: shippingStreetNumber,
        },
        billingAddress: {
          country: getCountryName(billingCountryCode),
          city: billingCity,
          postalCode: billingPostalCode,
          streetNumber: billingStreetNumber,
        },
        shippingAsDefault: defaultShippingAddressId === shippingAddressId,
        billingAsDefault: defaultBillingAddressId === billingAddressId,
      },
    });

  const onSubmit: SubmitHandler<AddressesInfoState> = async (data, event) => {
    event?.preventDefault();

    const {
      shippingAddress: shipping,
      billingAddress: billing,
      shippingAsDefault,
      billingAsDefault,
    } = data;

    // const billingCountry = getCountryCode(billing.country);
    // const billingAddress = { ...billing, country: billingCountry };

    // const shippingCountry = getCountryCode(shipping.country);
    // const shippingAddress = { ...shipping, country: shippingCountry };

    // let addresses: AddressesInfoState['shippingAddress' | 'billingAddress'][] = [];
    // const defaultShippingAddressIndex: number = 0;
    // let defaultBillingAddressIndex: number = 0;

    // if (!shippingAsBilling && !billingAsShipping) {
    //   addresses = [shippingAddress, billingAddress];
    //   defaultBillingAddressIndex = 1;
    // }

    // if (shippingAsBilling) {
    //   addresses = [billingAddress];
    // }

    // if (billingAsShipping) {
    //   addresses = [shippingAddress];
    // }

    // const newClient: Partial<CustomerDraft> = {
    //   addresses,
    //   defaultShippingAddress: shippingAsDefault ? defaultShippingAddressIndex : undefined,
    //   defaultBillingAddress: billingAsDefault ? defaultBillingAddressIndex : undefined,
    //   shippingAddresses: [defaultShippingAddressIndex],
    //   billingAddresses: [defaultBillingAddressIndex],
    // };

    // try {
    //   await signUp(newClient);
    //   setSignUpError('');

    //   const result = await dispatch(
    //     loginCustomer({ email: newClient.email, password: newClient.password! }),
    //   );

    //   if (result.meta.requestStatus !== 'rejected') {
    //     navigate('/');
    //     showSuccessMessage();
    //   }
    // } catch (error) {
    //   if (error instanceof Error && 'message' in error) {
    //     setSignUpError(error.message);
    //   }
    // }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className={styles.form} noValidate>
      <div className={styles.addressContainer}>
        <ShippingAddressInfo
          control={control}
          watch={watch}
          disabled={!editMode}
        />
        <BillingAddressInfo
          control={control}
          watch={watch}
          disabled={!editMode}
        />
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

export default AddressesInfo;
