import { Cart } from '@commercetools/platform-sdk';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { UpdateCartDto, updateCartSubject } from '../../services/commerceTools/Client';
import type { RootState } from '../store';

export const updateCart = createAsyncThunk(
  'cartSlice/updateCart',
  async (сartDto: Omit<UpdateCartDto, 'version'>, { getState }) => {
    const state = getState() as RootState;
    const { id, version } = state.cartSlice.cart!

    if (!id) return null;

    let result: Cart | null = null;

    result = (await updateCartSubject(id, { ...сartDto, version }))

    return result;
  },
);
