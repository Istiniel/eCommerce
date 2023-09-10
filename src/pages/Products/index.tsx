import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import styles from './Products.module.scss';
import ProductCard from '../../shared/ui/ProductCard';
import { useAppDispatch, useAppSelector } from '../../app/redux/hooks';
import {
  selectIsLimit,
  selectProducts,
} from '../../app/redux/features/ProductsSlice/ProductsSlice';
import { Input } from '../../shared/ui/Input';
import { getSortMethodByKey } from '../../shared/helpers/getSortMethodByKey';
import ProductCardSkeleton from '../../shared/ui/ProductCard/ProductCardSkeleton';
import LoadingSpinner from '../../shared/ui/LoadingSpinner';
import useFetchItemsOnScroll from './useFetchItemsOnScroll';
import { MAX_ITEMS_PER_PAGE } from '../../shared/static/MAX_ITEMS_PER_PAGE';
import { fetchProducts } from '../../app/redux/asyncThunks/fetchProducts';
import { fetchCategories } from '../../app/redux/asyncThunks/fetchCategories';

function Products() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);
  const categories = useAppSelector((state) => state.productsSlice.categories);
  const isLimit = useAppSelector(selectIsLimit);
  const [currentSortMethod, setCurrentSortMethod] = useState(0);
  const [searchString, setSearchString] = useState('');
  const [showProducts, setShowProducts] = useState(false);
  const searchTimer = useRef<NodeJS.Timeout | undefined>(undefined);
  const loaderIconContainer = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const timerId = searchTimer?.current;
    clearTimeout(timerId);
    setShowProducts(false);
    setPage(1);
    dispatch(fetchProducts({ sort: 0, text: '' }));

    const searchTimerId = setTimeout(() => {
      setShowProducts(true);
    }, 850);
    searchTimer.current = searchTimerId;
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useFetchItemsOnScroll({
    loaderIconContainer,
    currentSortMethod,
    searchString,
    page,
    setPage,
  });

  const handleSortProducts = useCallback(
    (sortMethod: number) => {
      const timerId = searchTimer?.current;
      clearTimeout(timerId);
      setShowProducts(false);

      setPage(1);
      setCurrentSortMethod(sortMethod);
      dispatch(fetchProducts({ text: searchString, sort: sortMethod }));

      const searchTimerId = setTimeout(() => {
        setShowProducts(true);
      }, 1200);
      searchTimer.current = searchTimerId;
    },
    [dispatch, searchString],
  );

  const handleFetchByText = useCallback(
    (event: React.SyntheticEvent<HTMLFormElement>) => {
      event.preventDefault();
      const timerId = searchTimer?.current;
      clearTimeout(timerId);
      setShowProducts(false);
      setPage(1);
      dispatch(fetchProducts({ sort: currentSortMethod, text: searchString }));

      const searchTimerId = setTimeout(() => {
        setShowProducts(true);
      }, 1200);
      searchTimer.current = searchTimerId;
    },
    [currentSortMethod, dispatch, searchString],
  );

  const items: MenuProps['items'] = [
    {
      label: 'Name ↑',
      key: '0',
      onClick: () => {
        handleSortProducts(0);
      },
    },
    {
      label: 'Added ↑',
      key: '1',
      onClick: () => {
        handleSortProducts(1);
      },
    },
    {
      label: 'Price ↑',
      key: '2',
      onClick: () => {
        handleSortProducts(2);
      },
    },
    {
      label: 'Price ↓',
      key: '3',
      onClick: () => {
        handleSortProducts(3);
      },
    },
  ];

  const onSearchHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchString(event?.target?.value);
  };

  return (
    <>
      <div className={styles.filterContainer}>
        <div className={styles.filterRow}>
          <form className={styles.submitSearchForm} onSubmit={handleFetchByText}>
            <Input
              labelClassName={styles.searchInput}
              type="text"
              name="searchFilter"
              placeholder="Search"
              error=""
              value={searchString}
              onChange={onSearchHandle}
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
        <div className={styles.leftColumn}>
          <div className={styles.titleWrapper}>
            <div className={styles.categoriesContainer}>
              {categories.map((category) => (
                <span
                  onMouseDown={() => {
                    navigate(`/products/${category.name['en-US']}?id=${category.id}`);
                  }}
                  key={category.id}
                  className={classNames(styles.category)}
                >
                  {category.name['en-US']}
                </span>
              ))}
            </div>
            <h1 className={styles.title}>Fresh Flowers</h1>
          </div>
        </div>
        <div className={styles.rightColumn}>
          {!showProducts &&
            new Array(Math.max(products.length, MAX_ITEMS_PER_PAGE))
              .fill(undefined)
              .map((_, index) => {
                return <ProductCardSkeleton key={index} />;
              })}
          {showProducts && (
            <>
              {products.map((product) => {
                return (
                  <ProductCard
                    {...product}
                    key={`${product.id}-${product.name['en-US']}`}
                    onMouseDown={() => {
                      navigate(
                        `/products/${
                          categories.find((category) => category.id === product.categories[0]?.id)
                            ?.name['en-US'] ?? 'no category'
                        }/${product.name['en-US']}?id=${product.id}`,
                      );
                    }}
                  />
                );
              })}
              {!isLimit && (
                <div className={styles.loadingIconContainer} ref={loaderIconContainer}>
                  <LoadingSpinner size={62} />
                </div>
              )}
            </>
          )}
          {products.length === 0 && <h3 className={styles.noMatches}>No matches</h3>}
        </div>
      </div>
    </>
  );
}

export default Products;
