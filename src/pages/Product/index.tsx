import { Image } from 'antd';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Price } from '@commercetools/platform-sdk';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import styles from './Product.module.scss';
import Button from '../../shared/ui/Button';
import ProductCounter from '../../shared/ui/ProductCounter';
import Slider from '../../shared/ui/Slider';
import { useAppDispatch, useAppSelector } from '../../app/redux/hooks';
import { fetchProduct } from '../../app/redux/asyncThunks/fetchProduct';
import { createCart } from '../../app/redux/asyncThunks/createCart';
import { updateCart } from '../../app/redux/asyncThunks/updateCart';
import {
  selectCart,
  selectCartItem,
  selectIsItemInCart,
} from '../../app/redux/features/CartSlice/CartSlice';
import LoadingSpinner from '../../shared/ui/LoadingSpinner';

const Product = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const cart = useAppSelector(selectCart);
  const product = useAppSelector((state) =>
    state.productsSlice.products.find((productInfo) => productInfo.id === searchParams.get('id')),
  );
  const cartItem = useAppSelector((state) => selectCartItem(state, searchParams.get('id') || ''));
  const loadingStatus = useAppSelector((state) => state.cartSlice.status);
  const isItemInCart = useAppSelector((state) =>
    selectIsItemInCart(state, searchParams.get('id') || ''),
  );
  const [productCount, setProductCount] = useState(1);

  useEffect(() => {
    dispatch(fetchProduct(searchParams.get('id')!));
  }, [dispatch, searchParams]);

  if (!product) {
    navigate('/', { replace: true });
    return null;
  }

  const {
    name: { 'en-US': title },
    masterVariant: { images, prices },
    description,
    id,
  } = product;

  let productDescription = '';
  if (description) {
    productDescription = description['en-US'];
  }

  const [generalPrice] = prices as Price[];
  const originalPrice = generalPrice.value.centAmount;
  const discountedPrice = generalPrice.discounted?.value.centAmount;

  const addToCartHandler = async () => {
    const requestBody = {
      action: 'addLineItem',
      productId: id,
      quantity: productCount,
    } as const;

    if (!cart) {
      await dispatch(createCart());
    }

    await dispatch(updateCart({ actions: [requestBody] }));
  };

  const removeFromCartHandler = async () => {
    const requestBody = {
      action: 'removeLineItem',
      lineItemId: cartItem?.id,
    } as const;

    dispatch(updateCart({ actions: [requestBody] }));
  };

  return (
    <div className={styles.productContainer}>
      <div className={styles.imgBox}>
        <Slider>
          {images!.map((item) => {
            return (
              <Image
                src={item.url}
                className={styles.img}
                key={item.label}
                alt={item.label}
                preview={{ mask: false }}
                loading="lazy"
                height="100%"
                width="100%"
              />
            );
          })}
        </Slider>
      </div>
      <div className={styles.contentBox}>
        <h1 className={styles.header}>
          {title} -{' '}
          <span className={styles.pricesContainer}>
            <p
              className={classNames(
                { [styles.withDiscount]: discountedPrice },
                styles.cardPrice,
                styles.originalPrice,
              )}
            >
              {`${originalPrice / 100}$`}
            </p>
            {discountedPrice && (
              <p className={classNames(styles.cardPrice, styles.discountedPrice)}>{`${
                discountedPrice / 100
              }$`}</p>
            )}
          </span>
        </h1>
        <p className={styles.description}>{productDescription}</p>
        <div className={styles.quantityBox}>
          <p className={styles.quantity}>Quantity:</p>
          <ProductCounter counter={productCount} setCounter={setProductCount} />
        </div>
        <div className={styles.button}>
          {!isItemInCart && (
            <Button type="button" onClick={addToCartHandler} className={styles.cartButton}>
              {loadingStatus !== 'loading' && 'ADD TO CART'}
              {loadingStatus === 'loading' && <LoadingSpinner size={30} type="white" />}
            </Button>
          )}
          {isItemInCart && (
            <Button type="button" onClick={removeFromCartHandler} className={styles.cartButton}>
              {loadingStatus !== 'loading' && 'REMOVE'}
              {loadingStatus === 'loading' && <LoadingSpinner size={30} type="white" />}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;
