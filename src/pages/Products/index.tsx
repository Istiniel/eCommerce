import { NavLink } from 'react-router-dom';
import styles from './Products.module.scss';

function Products() {
  const products = ['Rosy Delight', 'Snowfall', 'Pink Elegance', 'Blue Harmony'];
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Products</h1>
      {products.map((link) => (
        <NavLink key={link} to={link} className={styles.link}>
          {link}
        </NavLink>
      ))}
    </div>
  );
}

export default Products;
