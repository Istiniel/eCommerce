import { Customer, CustomerChangePassword } from '@commercetools/platform-sdk';
import { createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { changePasswordInfo } from '../../services/commerceTools/Client';


export const changePassword = createAsyncThunk(
  'authSlice/changePassword',
  async (customerDto: CustomerChangePassword | null, { getState }) => {
    const state = getState() as RootState;
    let result: Customer | null;

    const { id } = state.authSlice.customer!;

    if (!id) return null;

    if (customerDto) {
      result = (await changePasswordInfo(customerDto))?.body;
      localStorage.setItem('current-customer', JSON.stringify(result));
    } else if (customerDto === null) {
      result = null;
    } else {
      const customerInfo = localStorage.getItem('current-customer');
      result = customerInfo ? JSON.parse(customerInfo) : null;
    }

    return result;
  },
);
