import Wrapper from '../../shared/ui/Wrapper';
import styles from './Footer.module.scss';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Wrapper>
        <div className={styles.container}>
          <h2>Footer</h2>
        </div>
      </Wrapper>
    </footer>
  );
};

export default Footer;
