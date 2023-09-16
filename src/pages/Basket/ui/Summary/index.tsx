import { useCallback } from 'react';
import {
  selectSubtotalPrice,
  selectTotalPrice,
} from '../../../../app/redux/features/CartSlice/CartSlice';
import { useAppDispatch, useAppSelector } from '../../../../app/redux/hooks';
import Button from '../../../../shared/ui/Button';
import { Input } from '../../../../shared/ui/Input';
import styles from './Summary.module.scss';
import { deleteCart } from '../../../../app/redux/asyncThunks/deleteCart';

const Summary = () => {
  const totalPrice = useAppSelector(selectTotalPrice);
  const subtotalPrice = useAppSelector(selectSubtotalPrice);
  const dispatch = useAppDispatch();

  const handleDeleteCart = useCallback(() => {
    dispatch(deleteCart());
  }, [dispatch]);

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
        <span>Subtotal:</span>
        <span>{subtotalPrice}$</span>
      </div>
      <div className={styles.totalContainer}>
        <span>Total:</span>
        <span>{totalPrice}$</span>
      </div>
      <Button buttonType="outlined" className={styles.checkoutButton}>
        Checkout
      </Button>
      <Button buttonType="solid" className={styles.checkoutButton} onClick={handleDeleteCart}>
        Clear
      </Button>
    </div>
  );
};

export default Summary;
