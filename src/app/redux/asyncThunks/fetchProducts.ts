import { createAsyncThunk } from '@reduxjs/toolkit';
import { FetchProductsInfo, fetchProductsInfoExtra } from '../../services/commerceTools/Client';

export const fetchProducts = createAsyncThunk(
  'productsSlice/fetchProducts',
  async (searchInfo: FetchProductsInfo) => {
    return (await fetchProductsInfoExtra(searchInfo))?.body;
  },
);
