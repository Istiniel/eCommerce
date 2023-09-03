import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Customer } from '@commercetools/platform-sdk';
import type { RootState } from '../../store';
import { loginCustomer } from '../../asyncThunks/loginCustomer';
import { updateCustomer } from '../../asyncThunks/updateCustomer';
import { changePassword } from '../../asyncThunks/changePassword';

type AuthState = {
  customer: Customer | null;
  status: 'loading' | 'idle' | 'error';
  error: string | undefined;
};

const cachedCustomerInfo = localStorage.getItem('current-customer');
const customer: Customer | null = cachedCustomerInfo ? JSON.parse(cachedCustomerInfo) : null;

const initialState: AuthState = {
  customer,
  status: 'idle',
  error: undefined,
};

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setCustomer: (state, action: PayloadAction<Customer | null>) => {
      state.customer = action.payload;
    },
    clearErrorMessage: (state) => {
      state.error = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginCustomer.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginCustomer.fulfilled, (state, action) => {
        state.customer = action.payload;
        state.status = 'idle';
        state.error = undefined;
      })
      .addCase(loginCustomer.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message;
      })
      .addCase(updateCustomer.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateCustomer.fulfilled, (state, action) => {
        state.customer = action.payload;
        state.status = 'idle';
        state.error = undefined;
      })
      .addCase(updateCustomer.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message;
      })
      .addCase(changePassword.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.customer = action.payload;
        state.status = 'idle';
        state.error = undefined;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message;
      });
  },
});

export const { setCustomer, clearErrorMessage } = authSlice.actions;
export default authSlice.reducer;

export const selectCustomer = (state: RootState) => state.authSlice.customer;
export const selectSignInError = (state: RootState) => state.authSlice.error;
export const selectError = (state: RootState) => state.authSlice.error;
