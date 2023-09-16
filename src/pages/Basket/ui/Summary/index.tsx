import { useCallback, useState } from 'react';
import {
  selectSubtotalPrice,
  selectTotalPrice,
} from '../../../../app/redux/features/CartSlice/CartSlice';
import { useAppDispatch, useAppSelector } from '../../../../app/redux/hooks';
import Button from '../../../../shared/ui/Button';
import { Input } from '../../../../shared/ui/Input';
import styles from './Summary.module.scss';
import { deleteCart } from '../../../../app/redux/asyncThunks/deleteCart';
import { updateCart } from '../../../../app/redux/asyncThunks/updateCart';
import { showFailureMessage } from '../../../../shared/helpers/showFailureMessage';

const Summary = () => {
  const totalPrice = useAppSelector(selectTotalPrice);
  const subtotalPrice = useAppSelector(selectSubtotalPrice);
  const [promoValue, setPromoValue] = useState('');
  const dispatch = useAppDispatch();

  const handleDeleteCart = useCallback(() => {
    dispatch(deleteCart());
  }, [dispatch]);

  const applyPromoCode = useCallback(async () => {
    const updateCartBody = {
      action: 'addDiscountCode',
      code: promoValue,
    } as const;

    const result = await dispatch(updateCart({ actions: [updateCartBody] }));

    if (result.meta.requestStatus === 'rejected') {
      if ('error' in result) {
        showFailureMessage(result?.error?.message);
      }
    }
  }, [dispatch, promoValue]);

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
            value={promoValue}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setPromoValue(event.target.value);
            }}
            noLabel
          />
          <Button buttonType="solid" className={styles.promoSubmitButton} onClick={applyPromoCode}>
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
