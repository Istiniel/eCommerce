import { Dispatch, RefObject, SetStateAction, useCallback, useEffect } from "react";
import { throttle } from "../../shared/helpers/throotle";
import { useAppDispatch } from "../../app/redux/hooks";
import { fetchProductsExtra } from "../../app/redux/asyncThunks/fetchProductsExtra";
import { MAX_ITEMS_PER_PAGE } from "../../shared/static/MAX_ITEMS_PER_PAGE";


type Props = {
  loaderIconContainer: RefObject<HTMLDivElement>,
  currentSortMethod: number,
  searchString: string, page: number,
  setPage: Dispatch<SetStateAction<number>>,
  categoryId?: string
}

const useFetchItemsOnScroll = ({ loaderIconContainer, currentSortMethod, searchString, page, setPage, categoryId }: Props) => {
  const dispatch = useAppDispatch();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchOnScroll = useCallback(
    throttle(() => {
      const loaderContainer = loaderIconContainer.current;
      const boundingRect = loaderContainer?.getBoundingClientRect();

      if (boundingRect) {
        if (boundingRect.bottom < document.documentElement.clientHeight) {
          dispatch(
            fetchProductsExtra({
              sort: currentSortMethod,
              text: searchString,
              offset: page * MAX_ITEMS_PER_PAGE,
              categoryId
            }),
          );
          setPage((prevPage) => prevPage + 1);
        }
      }
    }, 1500),
    [loaderIconContainer, dispatch, currentSortMethod, searchString, page, categoryId, setPage],
  );

  useEffect(() => {
    window.addEventListener('scroll', fetchOnScroll);

    return () => {
      window.removeEventListener('scroll', fetchOnScroll);
    };
  }, [fetchOnScroll]);
}

export default useFetchItemsOnScroll