import NavLink from '../../shared/ui/NavLink';
import Wrapper from '../../shared/ui/Wrapper';
import styles from './Header.module.scss';

const Header = () => {
  return (
    <header className={styles.header}>
      <Wrapper>
        <div className={styles.container}>
            <div className={styles.leftContainer}>
              <NavLink href='/products' content='Shop' />
              <NavLink href='/#contacts' content='Contacts' />
            </div>
            <div className={styles.rightContainer}>
              <NavLink href='/signin' content='Sign in' />
              <NavLink href='/cart' content='Cart' />
            </div>
        </div>
      </Wrapper>
    </header>
  );
};

export default Header;
