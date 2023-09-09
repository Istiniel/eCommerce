import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import styles from './ProductsByCategory.module.scss';
import ProductCard from '../../shared/ui/ProductCard';
import { useAppDispatch, useAppSelector } from '../../app/redux/hooks';
import {
  selectIsLimit,
  selectProducts,
} from '../../app/redux/features/ProductsSlice/ProductsSlice';
import { Input } from '../../shared/ui/Input';
import { getSortMethodByKey } from '../../shared/helpers/getSortMethodByKey';
import ProductCardSkeleton from '../../shared/ui/ProductCard/ProductCardSkeleton';
import { MAX_ITEMS_PER_PAGE } from '../../shared/static/MAX_ITEMS_PER_PAGE';
import useFetchItemsOnScroll from '../Products/useFetchItemsOnScroll';
import LoadingSpinner from '../../shared/ui/LoadingSpinner';
import { fetchProducts } from '../../app/redux/asyncThunks/fetchProducts';
import { fetchCategories } from '../../app/redux/asyncThunks/fetchCategories';

function ProductsByCategory() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);
  const categories = useAppSelector((state) => state.productsSlice.categories);
  const isLimit = useAppSelector(selectIsLimit);
  const [currentSortMethod, setCurrentSortMethod] = useState(0);
  const [searchString, setSearchString] = useState('');
  const [searchParams] = useSearchParams();
  const { category } = useParams();
  const [showProducts, setShowProducts] = useState(false);
  const searchTimer = useRef<NodeJS.Timeout | undefined>(undefined);
  const loaderIconContainer = useRef<HTMLDivElement>(null);
  const [isPaginating, setIsPaginating] = useState(false);
  const [page, setPage] = useState(1);

  const categoryId = useMemo(() => {
    return (
      searchParams.get('id') ||
      categories.find((existedCategory) => {
        return existedCategory.name['en-US'] === category;
      })?.id ||
      ''
    );
  }, [categories, category, searchParams]);

  useEffect(() => {
    const fetchProductsIfCategoryExists = async () => {
      const timerId = searchTimer?.current;
      clearTimeout(timerId);
      setShowProducts(false);
      dispatch(fetchCategories());
      dispatch(
        fetchProducts({
          sort: currentSortMethod,
          categoryId,
        }),
      );

      const searchTimerId = setTimeout(() => {
        setShowProducts(true);
      }, 1200);

      searchTimer.current = searchTimerId;
    };

    fetchProductsIfCategoryExists();
  }, [categoryId, currentSortMethod, dispatch]);

  const handleSortProducts = useCallback(
    (sortMethod: number) => {
      setCurrentSortMethod(sortMethod);
    },
    [setCurrentSortMethod],
  );

  const handleFetchByText = useCallback(
    (event: React.SyntheticEvent<HTMLFormElement>) => {
      event.preventDefault();
      const timerId = searchTimer?.current;
      clearTimeout(timerId);
      setShowProducts(false);

      dispatch(
        fetchProducts({
          sort: currentSortMethod,
          text: searchString,
          categoryId,
        }),
      );

      const searchTimerId = setTimeout(() => {
        setShowProducts(true);
      }, 1200);
      searchTimer.current = searchTimerId;
    },
    [categoryId, currentSortMethod, dispatch, searchString],
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

  useFetchItemsOnScroll({
    loaderIconContainer,
    isPaginating,
    setIsPaginating,
    currentSortMethod,
    searchString,
    page,
    setPage,
    categoryId,
  });

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
        <div className={styles.rightColumn}>
          <div className={styles.titleWrapper}>
            <div className={styles.categoriesContainer}>
              {categories.map((existedCategory) => (
                <span
                  onMouseDown={() => {
                    navigate(`/products/${existedCategory.name['en-US']}?id=${existedCategory.id}`);
                  }}
                  key={existedCategory.id}
                  className={classNames(
                    { [styles.active]: categoryId === existedCategory.id },
                    styles.category,
                  )}
                >
                  {existedCategory.name['en-US']}
                </span>
              ))}
            </div>
            <h1 className={styles.title}>{category}</h1>
          </div>
        </div>
        <div className={styles.leftColumn}>
          <ul className={styles.cardContainer}>
            {!showProducts &&
              new Array(Math.max(products.length, MAX_ITEMS_PER_PAGE)).fill(
                <ProductCardSkeleton />,
              )}
            {showProducts && (
              <>
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
                {!isLimit && (
                  <div className={styles.loadingIconContainer} ref={loaderIconContainer}>
                    <LoadingSpinner size={62} />
                  </div>
                )}
              </>
            )}
            {products.length === 0 && <h3 className={styles.noMatches}>No matches</h3>}
          </ul>
        </div>
      </div>
    </>
  );
}

export default ProductsByCategory;
