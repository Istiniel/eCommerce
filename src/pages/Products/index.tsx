import { NavLink } from 'react-router-dom';
import styles from './Products.module.scss';
import ProductCard from '../../shared/ui/ProductCard';

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
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
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
