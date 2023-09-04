import { useState } from 'react';
import classNames from 'classnames';
import styles from './ProfileMenu.module.scss';
import Button from '../../../../shared/ui/Button';
import PersonalInfo from '../PersonalInfo';
import PasswordInfo from '../PasswordInfo';
import {
  clearErrorMessage,
  selectCustomer,
} from '../../../../app/redux/features/AuthSlice/AuthSlice';
import { useAppDispatch, useAppSelector } from '../../../../app/redux/hooks';
import Address from '../Address';
import NewAddress from '../NewAddress';

type ProfileMenuVariant = 'personal' | 'addresses' | 'password' | 'addAddress';

const ProfileMenu = () => {
  const [currentTab, setCurrentTab] = useState<ProfileMenuVariant>('personal');
  const dispatch = useAppDispatch();
  const customer = useAppSelector(selectCustomer);

  return (
    <div className={styles.container}>
      <div className={styles.tabsContainer}>
        <Button
          onClick={() => {
            setCurrentTab('personal');
            dispatch(clearErrorMessage());
          }}
          className={classNames({ [styles.disabled]: currentTab === 'personal' })}
          buttonType={currentTab === 'personal' ? 'solid' : 'outlined'}
        >
          Pesonal information
        </Button>
        <Button
          onClick={() => {
            setCurrentTab('password');
            dispatch(clearErrorMessage());
          }}
          className={classNames({ [styles.disabled]: currentTab === 'password' })}
          buttonType={currentTab === 'password' ? 'solid' : 'outlined'}
        >
          Password
        </Button>
        <Button
          onClick={() => {
            setCurrentTab('addresses');
            dispatch(clearErrorMessage());
          }}
          className={classNames({ [styles.disabled]: currentTab === 'addresses' }, 'disabled')}
          buttonType={currentTab === 'addresses' ? 'solid' : 'outlined'}
        >
          Addresses
        </Button>
        <Button
          onClick={() => {
            setCurrentTab('addAddress');
            dispatch(clearErrorMessage());
          }}
          className={classNames({ [styles.disabled]: currentTab === 'addAddress' }, 'disabled')}
          buttonType={currentTab === 'addAddress' ? 'solid' : 'outlined'}
        >
          Add new address
        </Button>
      </div>
      <div className={styles.editContainer}>
        {currentTab === 'addresses' &&
          customer?.addresses.map(({ id, country, city, streetNumber, postalCode }) => {
            return (
              <Address
                id={id!}
                initialType={customer?.billingAddressIds?.includes(id!) ? 'billing' : 'shipping'}
                asDefault={
                  customer?.defaultBillingAddressId === id ||
                  customer?.defaultShippingAddressId === id
                }
                country={country}
                city={city!}
                postalCode={postalCode!}
                streetNumber={streetNumber!}
              />
            );
          })}
        {currentTab === 'personal' && <PersonalInfo />}
        {currentTab === 'password' && <PasswordInfo />}
        {currentTab === 'addAddress' && <NewAddress />}
      </div>
    </div>
  );
};

export default ProfileMenu;
