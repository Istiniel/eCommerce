import styles from './ProductCardSkeleton.module.scss';

const ProductCardSkeleton = () => {
  return (
    <div className={styles.card}>
      <div className={styles.cardImageContainer}>
        <div className={styles.imageSkeleton} />
      </div>
      <div className={styles.skeletonBar} />
      <div className={styles.skeletonBar} />
      <div className={styles.skeletonBar} />
    </div>
  );
};

export default ProductCardSkeleton;
