import { createAsyncThunk } from '@reduxjs/toolkit';
import { deleteCartSubject } from '../../services/commerceTools/Client';
import type { RootState } from '../store';

export const deleteCart = createAsyncThunk(
  'cartSlice/deleteCart',
  async (_, { getState }) => {
    const state = getState() as RootState;
    const currentCart = state.cartSlice.cart

    const { id, version } = currentCart!;

    await deleteCartSubject(id, version);

    return null;
  },
);
