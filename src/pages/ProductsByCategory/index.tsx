import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import styles from './ProductsByCategory.module.scss';
import ProductCard from '../../shared/ui/ProductCard';
import { useAppDispatch, useAppSelector } from '../../app/redux/hooks';
import { selectProducts } from '../../app/redux/features/ProductsSlice/ProductsSlice';
import { Input } from '../../shared/ui/Input';
import { fetchProductsExtra } from '../../app/redux/asyncThunks/fetchProductsExtra';
import { getSortMethodByKey } from '../../shared/helpers/getSortMethodByKey';
import { fetchCategories } from '../../app/services/commerceTools/Client';

function ProductsByCategory() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);
  const [currentSortMethod, setCurrentSortMethod] = useState(0);
  const [searchString, setSearchString] = useState('');
  const [searchParams] = useSearchParams();
  const { category } = useParams();

  useEffect(() => {
    const checkIfCategoryExists = async () => {
      const response = await fetchCategories();

      if (
        !response.results.some((existedCategory) => {
          return existedCategory.id === searchParams.get('id');
        })
      ) {
        return;
      }

      dispatch(fetchProductsExtra({ categoryId: searchParams.get('id') || '', sort: 1 }));
    };

    checkIfCategoryExists();
  }, [dispatch, searchParams]);

  const items: MenuProps['items'] = [
    {
      label: 'Name ↑',
      key: '0',
      onClick: () => {
        setCurrentSortMethod(0);
        dispatch(fetchProductsExtra({ sort: 0, text: searchString }));
      },
    },
    {
      label: 'Added ↑',
      key: '1',
      onClick: () => {
        setCurrentSortMethod(1);
        dispatch(fetchProductsExtra({ sort: 1, text: searchString }));
      },
    },
    {
      label: 'Price ↑',
      key: '2',
      onClick: () => {
        setCurrentSortMethod(2);
        dispatch(fetchProductsExtra({ sort: 2, text: searchString }));
      },
    },
    {
      label: 'Price ↓',
      key: '3',
      onClick: () => {
        setCurrentSortMethod(3);
        dispatch(fetchProductsExtra({ sort: 3, text: searchString }));
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
      </div>
      <div className={styles.productsContainer}>
        <div className={styles.rightColumn}>
          <div className={styles.titleWrapper}>
            <h1 className={styles.title}>{category}</h1>
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
                    navigate(`/products/${category}/${product.name['en-US']}?id=${product.id}`);
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

export default ProductsByCategory;
