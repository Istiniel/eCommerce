import { Image } from 'antd';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Price } from '@commercetools/platform-sdk';
import classNames from 'classnames';
import { useEffect } from 'react';
import styles from './Product.module.scss';
import Button from '../../shared/ui/Button';
import ProductCounter from '../../shared/ui/ProductCounter';
import Slider from '../../shared/ui/Slider';
import { useAppDispatch, useAppSelector } from '../../app/redux/hooks';
import { fetchProduct } from '../../app/redux/asyncThunks/fetchProduct';

const Product = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const product = useAppSelector((state) =>
    state.productsSlice.products.find((productInfo) => productInfo.id === searchParams.get('id')),
  );

  useEffect(() => {
    dispatch(fetchProduct(searchParams.get('id')!))
  }, [dispatch, searchParams]);

  if (!product) {
    navigate('/', { replace: true });
    return null
  }

  const {
    name: { 'en-US': title },
    masterVariant: { images, prices },
    description,
  } = product;

  let productDescription = '';
  if (description) {
    productDescription = description['en-US'];
  }

  const [generalPrice] = prices as Price[];
  const originalPrice = generalPrice.value.centAmount;
  const discountedPrice = generalPrice.discounted?.value.centAmount;

  const addToCartHandler = () => {
    //
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
        {/* <div>{productId}</div> */}
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
              {originalPrice}
            </p>
            {discountedPrice && (
              <p
                className={classNames(styles.cardPrice, styles.discountedPrice)}
              >{`(${discountedPrice})`}</p>
            )}
          </span>
        </h1>
        <p className={styles.description}>{productDescription}</p>
        <div className={styles.quantityBox}>
          <p className={styles.quantity}>Quantity:</p>
          <ProductCounter />
        </div>
        <div className={styles.button}>
          <Button type="button" onClick={addToCartHandler}>
            ADD TO CART
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Product;
