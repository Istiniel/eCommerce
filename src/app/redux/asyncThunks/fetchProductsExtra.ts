import { ProductProjection } from '@commercetools/platform-sdk';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { FetchProductsInfo, fetchProductsInfoExtra } from '../../services/commerceTools/Client';

export const fetchProductsExtra = createAsyncThunk(
  'productsSlice/fetchProducts',
  async (searchInfo: FetchProductsInfo) => {
    let result: ProductProjection[] = [];

    result = (await fetchProductsInfoExtra(searchInfo))?.body?.results;

    return result;
  },
);
