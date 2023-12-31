import { Cart } from '@commercetools/platform-sdk';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { createCartSubject } from '../../services/commerceTools/Client';
import type { RootState } from '../store';

export const createCart = createAsyncThunk(
  'cartSlice/createCart',
  async (_, { getState }) => {
    const state = getState() as RootState;
    const currentCart = state.cartSlice.cart

    if (currentCart !== null) return currentCart;

    let result: Cart | null = null;

    result = await createCartSubject();
    return result;
  },
);
