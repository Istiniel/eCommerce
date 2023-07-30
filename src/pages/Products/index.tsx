import { NavLink } from 'react-router-dom';
import styles from './Products.module.scss';

function Products() {
  const products = ['123', '1234', '12345', '123456', '12'];
  return (
    <div className={styles.container}>
      {products.map((link) => (
        <NavLink key={link} to={link} className={styles.link}>
          {link}
        </NavLink>
      ))}
    </div>
  );
}

export default Products;
