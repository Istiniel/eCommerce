// import { useParams } from 'react-router-dom';
import styles from './Product.module.scss';
import Button from '../../shared/ui/Button';
import ProductCounter from '../../shared/ui/ProductCounter';

const data = {
  itemName: 'Rosy Delight',
  price: '100$',
  description:
    'Large exceptional bouquet composed of a selection of David Austin roses, known for their beauty and subtle fragrance. The bouquet is accompanied by seasonal foliage which will enhance these sublime flowers even',
  img: '/rosy_delight.jpg',
};

// interface Props {
//   itemName: string,
//   price: string,
//   description: string,
//   img: string
// }

const Product = () => {
  // const { productId } = useParams();
  const { itemName, price, description, img } = data;

  const addToCartHandler = () => {
    //
  };

  return (
    <div className={styles.productContainer}>
      <div className={styles.imgBox}>
        <img src={img} alt={itemName} className={styles.img} />
      </div>
      <div className={styles.contentBox}>
        {/* <div>{productId}</div> */}
        <h1 className={styles.header}>
          {itemName} - <span>{price}</span>
        </h1>
        <p className={styles.description}>{description}</p>
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
