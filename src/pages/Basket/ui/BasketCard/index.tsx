import { RiDeleteBinLine } from 'react-icons/ri';
import styles from './BasketCard.module.scss';
import image from '../../../../app/assets/images/rosy-delight-1.webp';
import ProductCounter from '../../../../shared/ui/ProductCounter';

const BasketCard = () => {
  return (
    <div className={styles.card}>
      <div className={styles.cardImageContainer}>
        <img src={image} alt="pic" />
      </div>
      <div className={styles.infoContainer}>
        <div className={styles.titleContainer}>
          <p className={styles.title}>Snowfall</p>
          <span className={styles.price}>100$</span>
        </div>
        <div className={styles.priceContainer}>
          <div className={styles.quantityContainer}>
            <div className={styles.quantity}>Quantity:</div>
            <ProductCounter />
          </div>
          <RiDeleteBinLine className={styles.deleteIcon} />
        </div>
      </div>
    </div>
  );
};

export default BasketCard;
