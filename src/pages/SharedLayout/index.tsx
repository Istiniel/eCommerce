import { Outlet, useNavigation } from 'react-router-dom';

import Wrapper from '../../shared/ui/Wrapper';
import Footer from '../../widgets/Footer';
import Header from '../../widgets/Header';
import styles from './SharedLayout.module.scss';
import BreadCrumbs from '../../shared/ui/BreadCrumbs/index';

const SharedLayout = () => {
  const navigation = useNavigation();

  return (
    <>
      <Header />
      {navigation.state === 'loading' && 'loading'}
      <main className={styles.main}>
        <Wrapper>
          <div className={styles.container}>
            <BreadCrumbs />
            <Outlet />
          </div>
        </Wrapper>
      </main>
      <Footer />
    </>
  );
};

export default SharedLayout;
