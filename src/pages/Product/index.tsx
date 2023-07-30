import { useParams } from 'react-router-dom';

const Product = () => {
  const { productId } = useParams();

  return <div>{productId}</div>;
};

export default Product;
