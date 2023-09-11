import styles from './Basket.module.scss';
import BasketCard from './ui/BasketCard';
import Summary from './ui/Summary';

const Basket = () => {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Order Summary</h2>
      <div className={styles.container}>
        <div className={styles.leftColumn}>
          <div className={styles.basketCardContainer}>
            <BasketCard />
            <BasketCard />
            <BasketCard />
            <BasketCard />
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
