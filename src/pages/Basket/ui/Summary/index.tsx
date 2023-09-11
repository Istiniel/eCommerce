import Button from '../../../../shared/ui/Button';
import { Input } from '../../../../shared/ui/Input';
import styles from './Summary.module.scss';

const Summary = () => {
  return (
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
      <Button buttonType="solid" className={styles.checkoutButton}>
        Clear
      </Button>
    </div>
  );
};

export default Summary;
