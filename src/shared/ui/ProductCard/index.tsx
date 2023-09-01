import styles from './ProductCard.module.scss';
import flowersBg from '../../../app/assets/images/rosy-delight-1.webp';

function ProductCard() {
  return (
    <li className={styles.card}>
      <div className={styles.cardImage}>
        <img src={flowersBg} alt="rose delight" />
      </div>
      <h3 className={styles.cardTitle}>Rosy Delight</h3>
      <p className={styles.cardPrice}>price</p>
    </li>
  );
}

export default ProductCard;
