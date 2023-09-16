import { createAsyncThunk } from '@reduxjs/toolkit';
import { getDiscountCodes } from '../../services/commerceTools/Client';

export const fetchDiscountCodes = createAsyncThunk(
  'cartSlice/getDiscountCodes',
  async () => {
    const discounts = (await getDiscountCodes()).results;
    return discounts;
  },
);
