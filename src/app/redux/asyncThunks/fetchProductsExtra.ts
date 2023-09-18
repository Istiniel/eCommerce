import { createAsyncThunk } from '@reduxjs/toolkit';
import { FetchProductsInfo, fetchProductsInfoExtra } from '../../services/commerceTools/Client';

interface FetchProductsExtraProps extends FetchProductsInfo {
  replace?: boolean
}

export const fetchProductsExtra = createAsyncThunk(
  'productsSlice/fetchProductsExtra',
  async (searchInfo: FetchProductsExtraProps) => {
    return { ...(await fetchProductsInfoExtra(searchInfo))?.body, replace: searchInfo.replace };
  },
);
