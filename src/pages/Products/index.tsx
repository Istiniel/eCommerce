import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Category } from '@commercetools/platform-sdk';
import classNames from 'classnames';
import styles from './Products.module.scss';
import ProductCard from '../../shared/ui/ProductCard';
import { useAppDispatch, useAppSelector } from '../../app/redux/hooks';
import { fetchProducts } from '../../app/redux/asyncThunks/fetchProducts';
import { selectProducts } from '../../app/redux/features/ProductsSlice/ProductsSlice';
import { Input } from '../../shared/ui/Input';
import { fetchCategories } from '../../app/services/commerceTools/Client';
import { fetchProductsExtra } from '../../app/redux/asyncThunks/fetchProductsExtra';
import { getSortMethodByKey } from '../../shared/helpers/getSortMethodByKey';

function Products() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);
  const [categories, setCategories] = useState<Category[]>([]);
  const [currentCategory, setCurrentCategory] = useState<string>('');
  const [currentSortMethod, setCurrentSortMethod] = useState(0);
  const [searchString, setSearchString] = useState('');

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    const getCategories = async () => {
      const response = await fetchCategories();

      setCategories(response.results);
    };

    getCategories();
  }, []);

  const items: MenuProps['items'] = [
    {
      label: 'Name ↑',
      key: '0',
      onClick: () => {
        setCurrentSortMethod(0);
        dispatch(fetchProductsExtra({ categoryId: currentCategory, sort: 0 }));
      },
    },
    {
      label: 'Added ↑',
      key: '1',
      onClick: () => {
        setCurrentSortMethod(1);
        dispatch(fetchProductsExtra({ categoryId: currentCategory, sort: 1 }));
      },
    },
    {
      label: 'Price ↑',
      key: '2',
      onClick: () => {
        setCurrentSortMethod(2);
        dispatch(fetchProductsExtra({ categoryId: currentCategory, sort: 2 }));
      },
    },
    {
      label: 'Price ↓',
      key: '3',
      onClick: () => {
        setCurrentSortMethod(3);
        dispatch(fetchProductsExtra({ categoryId: currentCategory, sort: 3 }));
      },
    },
  ];

  return (
    <>
      <div className={styles.filterContainer}>
        <div className={styles.filterRow}>
          <form
            className={styles.submitSearchForm}
            onSubmit={(event: React.SyntheticEvent<HTMLFormElement>) => {
              event.preventDefault();
              dispatch(
                fetchProductsExtra({
                  categoryId: currentCategory,
                  sort: currentSortMethod,
                  text: searchString,
                }),
              );
            }}
          >
            <Input
              labelClassName={styles.searchInput}
              type="text"
              name="searchFilter"
              placeholder="Search"
              error=""
              value={searchString}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setSearchString(event?.target?.value);
                dispatch(
                  fetchProductsExtra({
                    categoryId: currentCategory,
                    sort: currentSortMethod,
                    text: event?.target?.value,
                  }),
                );
              }}
              noLabel
            />
            <button className={styles.searchSubmitButton} type="submit">
              Apply
            </button>
          </form>
          <Dropdown menu={{ items }} className={styles.dropDownContainer}>
            <span>
              <Space>
                <span className={styles.sortByPrefix}>Sort by: </span>
                {getSortMethodByKey(currentSortMethod).value}
              </Space>
            </span>
          </Dropdown>
        </div>
        <div className={styles.categoriesContainer}>
          {categories.map((category) => (
            <span
              onMouseDown={() => {
                if (currentCategory !== category.id) {
                  setCurrentCategory(category.id);
                  dispatch(
                    fetchProductsExtra({ categoryId: category.id, sort: currentSortMethod }),
                  );
                } else {
                  setCurrentCategory('');
                  dispatch(fetchProductsExtra({ sort: currentSortMethod }));
                }
              }}
              key={category.id}
              className={classNames(
                { [styles.active]: currentCategory === category.id },
                styles.category,
              )}
            >
              {category.name['en-US']}
            </span>
          ))}
        </div>
      </div>
      <div className={styles.productsContainer}>
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

            {products.length === 0 && <h3 className={styles.noMatches}>No matches</h3>}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Products;
