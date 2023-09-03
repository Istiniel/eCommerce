import { useState } from 'react';
import classNames from 'classnames';
import styles from './ProfileMenu.module.scss';
import Button from '../../../../shared/ui/Button';
import AddressesInfo from '../AddressesInfo';
import PersonalInfo from '../PersonalInfo';

type ProfileMenuVariant = 'personal' | 'addresses';

const ProfileMenu = () => {
  const [currentTab, setCurrentTab] = useState<ProfileMenuVariant>('personal');

  return (
    <div className={styles.container}>
      <div className={styles.tabsContainer}>
        <Button
          onClick={() => {
            setCurrentTab('personal');
          }}
          className={classNames({[styles.disabled]: currentTab === 'personal'})}
          buttonType={currentTab === 'personal' ? 'solid' : 'outlined'}
        >
          Pesonal information
        </Button>
        <Button
          onClick={() => {
            setCurrentTab('addresses');
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
      </div>
    </div>
  );
};

export default ProfileMenu;
