import { NavLink } from 'react-router-dom';
import styles from './Products.module.scss';
import flowersBg from '../../app/assets/images/rosy-delight-1.webp';

function Products() {
  const products = ['Rosy Delight', 'Snowfall', 'Pink Elegance', 'Blue Harmony'];
  return (
    <div className={styles.container}>
      <div className={styles.rightColumn}>
        <div className={styles.titleWrapper}>
          <h1 className={styles.title}>Fresh Flowers</h1>
        </div>
      </div>
      <div className={styles.leftColumn}>
        <ul className={styles.cardContainer}>
          <li className={styles.card}>
            <div className={styles.cardImage}>
              <img src={flowersBg} alt="rose delight" />
            </div>
            <h3 className={styles.cardTitle}>Rosy Delight</h3>
            <p className={styles.cardPrice}>price</p>
          </li>
          <li className={styles.card}>
            <div className={styles.cardImage}>
              <img src={flowersBg} alt="rose delight" />
            </div>
            <h3 className={styles.cardTitle}>Rosy Delight</h3>
            <p className={styles.cardPrice}>price</p>
          </li>
          <li className={styles.card}>
            <div className={styles.cardImage}>
              <img src={flowersBg} alt="rose delight" />
            </div>
            <h3 className={styles.cardTitle}>Rosy Delight</h3>
            <p className={styles.cardPrice}>price</p>
          </li>
          <li className={styles.card}>
            <div className={styles.cardImage}>
              <img src={flowersBg} alt="rose delight" />
            </div>
            <h3 className={styles.cardTitle}>Rosy Delight</h3>
            <p className={styles.cardPrice}>price</p>
          </li>
          <li className={styles.card}>
            <div className={styles.cardImage}>
              <img src={flowersBg} alt="rose delight" />
            </div>
            <h3 className={styles.cardTitle}>Rosy Delight</h3>
            <p className={styles.cardPrice}>price</p>
          </li>
          <li className={styles.card}>
            <div className={styles.cardImage}>
              <img src={flowersBg} alt="rose delight" />
            </div>
            <h3 className={styles.cardTitle}>Rosy Delight</h3>
            <p className={styles.cardPrice}>price</p>
          </li>
          <li className={styles.card}>
            <div className={styles.cardImage}>
              <img src={flowersBg} alt="rose delight" />
            </div>
            <h3 className={styles.cardTitle}>Rosy Delight</h3>
            <p className={styles.cardPrice}>price</p>
          </li>
          <li className={styles.card}>
            <div className={styles.cardImage}>
              <img src={flowersBg} alt="rose delight" />
            </div>
            <h3 className={styles.cardTitle}>Rosy Delight</h3>
            <p className={styles.cardPrice}>price</p>
          </li>
        </ul>
        {products.map((link) => (
          <NavLink key={link} to={link} className={styles.link}>
            {link}
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default Products;
