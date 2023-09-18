import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCategoriesInfo } from '../../services/commerceTools/Client';

export const fetchCategories = createAsyncThunk(
  'productsSlice/fetchCategories',
  async () => {
    const result = await fetchCategoriesInfo();
    return result.results
  },
);
