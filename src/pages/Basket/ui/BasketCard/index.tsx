import { RiDeleteBinLine } from 'react-icons/ri';
import { LineItem, Price } from '@commercetools/platform-sdk';
import { useCallback, useState } from 'react';
import styles from './BasketCard.module.scss';
import ProductCounter from '../../../../shared/ui/ProductCounter';
import { updateCart } from '../../../../app/redux/asyncThunks/updateCart';
import { useAppDispatch } from '../../../../app/redux/hooks';

const BasketCard = (itemInfo: LineItem) => {
  const dispatch = useAppDispatch();

  const {
    name,
    variant: { images, prices },
    id,
    quantity,
  } = itemInfo;

  const [generalPrice] = prices as Price[];
  const originalPrice = generalPrice.value.centAmount;
  const discountedPrice = generalPrice.discounted?.value.centAmount;
  const priceInDollars = (discountedPrice || originalPrice) / 100;

  const [productCount, setProductCount] = useState(quantity);

  const handleDeleteCartItem = useCallback(() => {
    const requestBody = {
      action: 'removeLineItem',
      lineItemId: id,
    } as const;

    dispatch(updateCart({ actions: [requestBody] }));
  }, [dispatch, id]);

  const handleChangeItemQuantity = useCallback((count: number) => {
    const requestBody = {
      action: 'changeLineItemQuantity',
      lineItemId: id,
      quantity: count,
    } as const;

    dispatch(updateCart({ actions: [requestBody] }));
  }, [dispatch, id]);

  return (
    <div className={styles.card}>
      <div className={styles.cardImageContainer}>
        <img src={images![0].url} alt="pic" className={styles.productImage} />
      </div>
      <div className={styles.infoContainer}>
        <div className={styles.titleContainer}>
          <p className={styles.title}>{`${name['en-US']} - ${priceInDollars}$`}</p>
          <span className={styles.price}>{priceInDollars * productCount}$</span>
        </div>
        <div className={styles.priceContainer}>
          <div className={styles.quantityContainer}>
            <div className={styles.quantity}>Quantity:</div>
            <ProductCounter
              onChange={handleChangeItemQuantity}
              counter={productCount}
              setCounter={setProductCount}
            />
          </div>
          <RiDeleteBinLine className={styles.deleteIcon} onMouseDown={handleDeleteCartItem} />
        </div>
      </div>
    </div>
  );
};

export default BasketCard;
