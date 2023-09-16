import { useEffect, useState } from 'react';
import { selectLineItems } from '../../app/redux/features/CartSlice/CartSlice';
import { useAppDispatch, useAppSelector } from '../../app/redux/hooks';
import LoadingSpinner from '../../shared/ui/LoadingSpinner';
import styles from './Basket.module.scss';
import BasketCard from './ui/BasketCard';
import Summary from './ui/Summary';
import { createCart } from '../../app/redux/asyncThunks/createCart';
import { LinkButton } from '../../shared/ui/LinkButton/index';

const Basket = () => {
  const cartItems = useAppSelector(selectLineItems);
  const [loadingThreshold, setLoadingThreshold] = useState(true);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(createCart());
  }, [dispatch]);

  useEffect(() => {
    setLoadingThreshold(true);
    const timeriD = setTimeout(() => {
      setLoadingThreshold(false);
    }, 1000);

    return () => {
      clearTimeout(timeriD);
    };
  }, []);

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Order Summary</h2>
      <div className={styles.container}>
        <div className={styles.leftColumn}>
          <div className={styles.basketCardContainer}>
            {!loadingThreshold &&
              cartItems?.length !== 0 &&
              cartItems?.map((item) => {
                return <BasketCard key={item.id} {...item} />;
              })}
            {!loadingThreshold && !cartItems?.length && (
              <>
                <h3 className={styles.emptyBasket}>Pick pretty flowers</h3>
                <LinkButton href="/products">back to shop</LinkButton>
              </>
            )}
            {loadingThreshold && <LoadingSpinner size={75} />}
          </div>
        </div>
        <div className={styles.rightColumn}>
          <Summary />
        </div>
      </div>
    </section>
  );
};

export default Basket;
