import styles from './Profile.module.scss';
import useProtectedPage from '../../shared/hooks/useProtectedPage';
import ProfileMenu from './ui/ProfileMenu';

const Profile = () => {
  useProtectedPage();

  return (
    <div className={styles.container}>
      <ProfileMenu />
    </div>
  );
};

export default Profile;
