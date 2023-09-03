import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Products.module.scss';
import ProductCard from '../../shared/ui/ProductCard';
import { useAppDispatch, useAppSelector } from '../../app/redux/hooks';
import { fetchProducts } from '../../app/redux/asyncThunks/fetchProducts';
import { selectProducts } from '../../app/redux/features/ProductsSlice/ProductsSlice';

function Products() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts)

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <div className={styles.rightColumn}>
        <div className={styles.titleWrapper}>
          <h1 className={styles.title}>Fresh Flowers</h1>
        </div>
      </div>
      <div className={styles.leftColumn}>
        <ul className={styles.cardContainer}>
          {products.map((product) => {
            return <ProductCard {...product} key={product.id} onMouseDown={() => {
              navigate(`/products/${product.id}`)
            }} />;
          })}
        </ul>
      </div>
    </div>
  );
}

export default Products;
