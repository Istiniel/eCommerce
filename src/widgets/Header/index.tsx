import { useNavigate } from 'react-router-dom';
import { selectCustomer, setCustomer } from '../../app/redux/features/AuthSlice/AuthSlice';
import { useAppDispatch, useAppSelector } from '../../app/redux/hooks';
import NavButton from '../../shared/ui/NavButton';
import NavLink from '../../shared/ui/NavLink';
import Wrapper from '../../shared/ui/Wrapper';
import styles from './Header.module.scss';

const Header = () => {
  const dispatch = useAppDispatch();
  const customer = useAppSelector(selectCustomer);
  const navigate = useNavigate();
  return (
    <header className={styles.header}>
      <Wrapper>
        <div className={styles.container}>
          <div className={styles.leftContainer}>
            <NavLink href="/products" content="Shop" />
            <NavLink href="/#contacts" content="Contacts" />
          </div>
          <div className={styles.rightContainer}>
            {!customer && <NavLink href="/signin" content="Sign in" />}
            {customer && (
              <NavButton
                callback={() => {
                  dispatch(setCustomer(null));
                  navigate('/signin', { replace: true });
                }}
                content="Sign out"
              />
            )}
            <NavLink href="/cart" content="Cart" />
          </div>
        </div>
      </Wrapper>
    </header>
  );
};

export default Header;
