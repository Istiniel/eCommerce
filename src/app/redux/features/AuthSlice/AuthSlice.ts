import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Customer } from '@commercetools/platform-sdk';
import type { RootState } from '../../store';

type AuthState = {
  customer: Customer | null;
};

const initialState: AuthState = {
  customer: null,
};

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setCustomer: (state, action: PayloadAction<Customer | null>) => {
      state.customer = action.payload;
    },
  },
});

export const { setCustomer } = authSlice.actions;
export default authSlice.reducer;

export const selectCustomer = (state: RootState) => state.authSlice.customer;
