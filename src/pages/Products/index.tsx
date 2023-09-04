import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, message, Space } from 'antd';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Products.module.scss';
import ProductCard from '../../shared/ui/ProductCard';
import { useAppDispatch, useAppSelector } from '../../app/redux/hooks';
import { fetchProducts } from '../../app/redux/asyncThunks/fetchProducts';
import { selectProducts } from '../../app/redux/features/ProductsSlice/ProductsSlice';
import { Input } from '../../shared/ui/Input';
import Button from '../../shared/ui/Button';

const onClick: MenuProps['onClick'] = ({ key }) => {
  message.info(`Click on item ${key}`);
};

const items: MenuProps['items'] = [
  {
    label: 'None',
    key: '0',
  },
  {
    label: 'ASC',
    key: '1',
  },
  {
    label: 'DSC',
    key: '2',
  },
  {
    label: 'Name',
    key: '3',
  },
];

function Products() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <>
      <div className={styles.filterRow}>
        <div className={styles.inputRow}>
          <div className={styles.inputWrapper}>
            <Input
              type="text"
              name="Filter"
              placeholder="Search"
              error=""
              value=""
              onChange={() => {}}
            />
          </div>
          <div className={styles.btnWrapper}>
            <button className={styles.btn}>Apply</button>
          </div>
        </div>
        <Dropdown menu={{ items, onClick }}>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              Sort
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
      </div>
      <div className={styles.container}>
        <div className={styles.rightColumn}>
          <div className={styles.titleWrapper}>
            <h1 className={styles.title}>Fresh Flowers</h1>
          </div>
        </div>
        <div className={styles.leftColumn}>
          <ul className={styles.cardContainer}>
            {products.map((product) => {
              return (
                <ProductCard
                  {...product}
                  key={product.id}
                  onMouseDown={() => {
                    navigate(`/products/${product.name['en-US']}?id=${product.id}`);
                  }}
                />
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Products;
