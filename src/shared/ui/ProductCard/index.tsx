import { Price, ProductProjection } from '@commercetools/platform-sdk';
import classNames from 'classnames';
import { AiOutlinePlus, AiOutlineCheck } from 'react-icons/ai';
import { useState } from 'react';
import styles from './ProductCard.module.scss';
import { useAppDispatch, useAppSelector } from '../../../app/redux/hooks';
import { createCart } from '../../../app/redux/asyncThunks/createCart';
import {
  selectAcativeLineItem,
  selectCart,
  selectIsItemInCart,
  setActiveCartItem,
} from '../../../app/redux/features/CartSlice/CartSlice';
import { updateCart } from '../../../app/redux/asyncThunks/updateCart';
import LoadingSpinner from '../LoadingSpinner';

interface Props extends ProductProjection {
  onMouseDown: VoidFunction;
}

const ProductCard: React.FC<Props> = (productInfo) => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector(selectCart);
  const addToCardLoading = useAppSelector((state) => state.cartSlice.status);
  const activeLineItemId = useAppSelector(selectAcativeLineItem);
  const [loadingThreshold, setLoadingThreshold] = useState(false);

  const {
    name: { 'en-US': title },
    masterVariant: { images, prices },
    description,
    onMouseDown,
    id,
  } = productInfo;

  const isProductInCard = useAppSelector((state) => {
    return selectIsItemInCart(state, id);
  });


  let productDescription = '';
  if (description) {
    productDescription = description['en-US'];
  }

  const [generalPrice] = prices as Price[];
  const originalPrice = generalPrice.value.centAmount;
  const discountedPrice = generalPrice.discounted?.value.centAmount;

  const addToCard = async (event: React.SyntheticEvent) => {
    event.stopPropagation();
    const requestBody = {
      action: 'addLineItem',
      productId: id,
    } as const;
    setLoadingThreshold(true);
    dispatch(setActiveCartItem(id));
    setTimeout(() => {
      setLoadingThreshold(false);
    }, 1000);

    if (!cart) {
      await dispatch(createCart());
    }

    await dispatch(updateCart({ actions: [requestBody] }));
  };

  return (
    <div className={styles.card} onMouseDown={onMouseDown}>
      <div className={styles.cardImageContainer}>
        <img src={images![0].url} alt="rose delight" className={styles.cardImage} />
        <div className={styles.cartIconContainer}>
          {!loadingThreshold && !isProductInCard && addToCardLoading !== 'loading' && (
            <AiOutlinePlus className={styles.cartIcon} onMouseDown={addToCard} />
          )}
          {!isProductInCard && addToCardLoading === 'loading' && activeLineItemId !== id && (
            <AiOutlinePlus className={styles.cartIcon} onMouseDown={addToCard} />
          )}
          {(loadingThreshold || addToCardLoading === 'loading') && activeLineItemId === id && (
            <LoadingSpinner size={41} type="white" />
          )}
          {!loadingThreshold && isProductInCard && <AiOutlineCheck className={styles.cartIcon} />}
        </div>
      </div>
      <h3 className={styles.cardTitle}>{title}</h3>
      <span className={styles.pricesContainer}>
        price:
        <p
          className={classNames(
            { [styles.withDiscount]: discountedPrice },
            styles.cardPrice,
            styles.originalPrice,
          )}
        >
          {originalPrice / 100}$
        </p>
        {discountedPrice && (
          <p className={classNames(styles.cardPrice, styles.discountedPrice)}>{`(${
            discountedPrice / 100
          }$)`}</p>
        )}
      </span>
      <p className={styles.cardDescription}>{productDescription}</p>
    </div>
  );
};

export default ProductCard;
