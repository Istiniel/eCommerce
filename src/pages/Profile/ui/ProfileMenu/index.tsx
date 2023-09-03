import { useState } from 'react';
import classNames from 'classnames';
import styles from './ProfileMenu.module.scss';
import Button from '../../../../shared/ui/Button';
import AddressesInfo from '../AddressesInfo';
import PersonalInfo from '../PersonalInfo';
import PasswordInfo from '../PasswordInfo';
import { clearErrorMessage } from '../../../../app/redux/features/AuthSlice/AuthSlice';
import { useAppDispatch } from '../../../../app/redux/hooks';

type ProfileMenuVariant = 'personal' | 'addresses' | 'password';

const ProfileMenu = () => {
  const [currentTab, setCurrentTab] = useState<ProfileMenuVariant>('personal');
  const dispatch = useAppDispatch();

  return (
    <div className={styles.container}>
      <div className={styles.tabsContainer}>
        <Button
          onClick={() => {
            setCurrentTab('personal');
            dispatch(clearErrorMessage());
          }}
          className={classNames({[styles.disabled]: currentTab === 'personal'})}
          buttonType={currentTab === 'personal' ? 'solid' : 'outlined'}
        >
          Pesonal information
        </Button>
        <Button
          onClick={() => {
            setCurrentTab('password');
            dispatch(clearErrorMessage());
          }}
          className={classNames({[styles.disabled]: currentTab === 'password'})}
          buttonType={currentTab === 'password' ? 'solid' : 'outlined'}
        >
          Password
        </Button>
        <Button
          onClick={() => {
            setCurrentTab('addresses');
            dispatch(clearErrorMessage());
          }}
          className={classNames({[styles.disabled]: currentTab === 'addresses'}, 'disabled')}
          buttonType={currentTab === 'addresses' ? 'solid' : 'outlined'}
        >
          Addresses
        </Button>
      </div>
      <div className={styles.editContainer}>
        {currentTab === 'addresses' && <AddressesInfo />}
        {currentTab === 'personal' && <PersonalInfo />}
        {currentTab === 'password' && <PasswordInfo />}
      </div>
    </div>
  );
};

export default ProfileMenu;
