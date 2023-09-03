import { createSlice } from '@reduxjs/toolkit';
import { ProductProjection } from '@commercetools/platform-sdk';
import type { RootState } from '../../store';
import { fetchProducts } from '../../asyncThunks/fetchProducts';

type ProductsState = {
  products: ProductProjection[];
  status: 'loading' | 'idle' | 'error';
  error: string | undefined;
};

const initialState: ProductsState = {
  products: [],
  status: 'idle',
  error: undefined,
};

export const productsSlice = createSlice({
  name: 'productsSlice',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.status = 'idle';
        state.error = undefined;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message;
      });
  },
});

export default productsSlice.reducer;

export const selectProducts = (state: RootState) => state.productsSlice.products;