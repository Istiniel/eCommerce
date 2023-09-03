import { useNavigate } from 'react-router-dom';
import { selectCustomer } from '../../app/redux/features/AuthSlice/AuthSlice';
import { useAppDispatch, useAppSelector } from '../../app/redux/hooks';
import NavButton from '../../shared/ui/NavButton';
import NavLink from '../../shared/ui/NavLink';
import Wrapper from '../../shared/ui/Wrapper';
import styles from './Header.module.scss';
import { loginCustomer } from '../../app/redux/asyncThunks/loginCustomer';

const Header = () => {
  const dispatch = useAppDispatch();
  const customer = useAppSelector(selectCustomer);
  const navigate = useNavigate();
  return (
    <header className={styles.header}>
      <Wrapper>
        <div className={styles.container}>
          <div className={styles.leftContainer}>
            <NavLink href="/" content="Home" />
            <NavLink href="/#contacts" content="Contacts" />
            <NavLink href="/about" content="About us" />
          </div>
          <div className={styles.rightContainer}>
            {!customer && <NavLink href="/signin" content="Sign in" />}
            {customer && (
              <NavButton
                callback={async () => {
                  await dispatch(loginCustomer(null));
                  navigate('/signin', { replace: true });
                }}
                content="Sign out"
              />
            )}
            <NavLink href="/products" content="Shop" />
            <NavLink href="/profile" content="Profile" />
          </div>
        </div>
      </Wrapper>
    </header>
  );
};

export default Header;
