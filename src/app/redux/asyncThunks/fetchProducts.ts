import { ProductProjection } from '@commercetools/platform-sdk';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchProductsInfo } from '../../services/commerceTools/Client';

export const fetchProducts = createAsyncThunk(
  'productsSlice/fetchProducts',
  async () => {
    let result: ProductProjection[] = [];
    result = (await fetchProductsInfo())?.body?.results;

    return result;
  },
);
