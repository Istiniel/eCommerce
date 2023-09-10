import styles from './BasketCard.module.scss';
import image from '../../../app/assets/images/rosy-delight-1.webp';
import ProductCounter from '../ProductCounter';

const BasketCard = () => {
  return (
    <div className={styles.card}>
      <div className={styles.cardImageContainer}>
        <img src={image} alt="pic" />
      </div>
      <div className={styles.infoRow}>
        <div className={styles.infoContainer}>
          <p className={styles.title}>Snowfall</p>
          <div className={styles.quantity}>Quantity:</div>
          <ProductCounter />
        </div>
        <div className={styles.priceContainer}>
          <span className={styles.price}>100$</span>
        </div>
      </div>
    </div>
  );
};

export default BasketCard;
