import NavDrop from '../../shared/ui/NavDrop';
import ToMainPageButton from '../../shared/ui/ToMainButton';
import Wrapper from '../../shared/ui/Wrapper';
import styles from './Header.module.scss';

const Header = () => {
  return (
    <header className={styles.header}>
      <Wrapper>
        <div className={styles.container}>
          <ToMainPageButton />
          <NavDrop />
          <h1>Shop</h1>
        </div>
      </Wrapper>
    </header>
  );
};

export default Header;
