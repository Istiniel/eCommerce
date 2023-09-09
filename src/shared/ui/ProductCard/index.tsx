import { Price, ProductProjection } from '@commercetools/platform-sdk';
import classNames from 'classnames';
import { BsCart2 } from 'react-icons/bs';
import styles from './ProductCard.module.scss';

interface Props extends ProductProjection {
  onMouseDown: VoidFunction;
}

const ProductCard: React.FC<Props> = (productInfo) => {
  const {
    name: { 'en-US': title },
    masterVariant: { images, prices },
    description,
    onMouseDown,
  } = productInfo;

  let productDescription = '';
  if (description) {
    productDescription = description['en-US'];
  }

  const [generalPrice] = prices as Price[];
  const originalPrice = generalPrice.value.centAmount;
  const discountedPrice = generalPrice.discounted?.value.centAmount;

  const addToCard = (event: React.SyntheticEvent) => {
    event.stopPropagation();
  }

  return (
    <li className={styles.card} onMouseDown={onMouseDown}>
      <div className={styles.cardImageContainer}>
        <img src={images![0].url} alt="rose delight" className={styles.cardImage} />
        <BsCart2
          className={styles.cartIcon}
          onMouseDown={addToCard}
        />
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
    </li>
  );
};

export default ProductCard;
