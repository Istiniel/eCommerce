import { createSlice } from '@reduxjs/toolkit';
import { Category, ProductProjection } from '@commercetools/platform-sdk';
import type { RootState } from '../../store';
import { fetchProductsExtra } from '../../asyncThunks/fetchProductsExtra';
import { fetchProduct } from '../../asyncThunks/fetchProduct';
import { fetchProducts } from '../../asyncThunks/fetchProducts';
import { fetchCategories } from '../../asyncThunks/fetchCategories';

type ProductsState = {
  products: ProductProjection[];
  categories: Category[];
  status: 'loading' | 'idle' | 'error';
  error: string | undefined;
  isLimit: boolean
};

const initialState: ProductsState = {
  products: [],
  categories: [],
  status: 'idle',
  error: undefined,
  isLimit: false
};

export const productsSlice = createSlice({
  name: 'productsSlice',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        const { payload: newProduct } = action;
        let newProductAdded: boolean = false;

        state.products = state.products.map(product => {
          if (product.id === newProduct.id) {
            newProductAdded = true;
            return newProduct
          }

          return product
        });

        if (!newProductAdded) {
          state.products.push(newProduct)
        }

        state.status = 'idle';
        state.error = undefined;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message;
      })
      .addCase(fetchProductsExtra.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductsExtra.fulfilled, (state, action) => {
        const response = action.payload;
        const products = response.results;

        state.products.push(...products);

        state.status = 'idle';
        state.error = undefined;

        if (response.total) {
          if (response.total <= response.offset + response.count) {
            state.isLimit = true
          } else {
            state.isLimit = false
          }
        } else {
          state.isLimit = true
        }
      })
      .addCase(fetchProductsExtra.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message;
      })
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        const response = action.payload;
        const products = response.results;

        state.products = products;

        state.status = 'idle';
        state.error = undefined;

        if (response.total) {
          if (response.total <= response.offset + response.count) {
            state.isLimit = true
          } else {
            state.isLimit = false
          }
        } else {
          state.isLimit = true
        }
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message;
      })
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        const categories = action.payload;
        state.categories = categories;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message;
      })
  },
});

export default productsSlice.reducer;

export const selectProducts = (state: RootState) => state.productsSlice.products;
export const selectLoadingStatus = (state: RootState) => state.productsSlice.status;
export const selectIsLimit = (state: RootState) => state.productsSlice.isLimit;