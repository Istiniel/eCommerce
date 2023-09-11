import styles from './Basket.module.scss';
import BasketCard from '../../shared/ui/BasketCard';
import { Input } from '../../shared/ui/Input';
import Button from '../../shared/ui/Button';

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
          <div className={styles.orderSummaryContainer}>
            <div className={styles.promoContainer}>
              <form className={styles.submitPromoForm}>
                <Input
                  labelClassName={styles.promoInput}
                  type="text"
                  name="searchFilter"
                  placeholder="Promo code"
                  error=""
                  value=""
                  onChange={() => {}}
                  noLabel
                />
                <Button buttonType="solid" className={styles.promoSubmitButton}>
                  Apply
                </Button>
              </form>
            </div>
            <div className={styles.subTotalContainer}>
              <span>Subtotal</span>
              <span>100$</span>
            </div>
            <div className={styles.totalContainer}>
              <span>Total</span>
              <span>100$</span>
            </div>
            <Button buttonType="outlined" className={styles.checkoutButton}>
              Checkout
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Basket;
