import { ProductProjection } from '@commercetools/platform-sdk';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchProductInfo } from '../../services/commerceTools/Client';

export const fetchProduct = createAsyncThunk(
  'productsSlice/fetchProduct',
  async (ID: string) => {
    let result: ProductProjection | null = null;

    result = (await fetchProductInfo(ID))?.body;

    return result;
  },
);
