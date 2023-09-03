import { Customer, MyCustomerUpdate } from '@commercetools/platform-sdk';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { updateCustomerInfo } from '../../services/commerceTools/Client';
import type { RootState } from '../store';

export const updateCustomer = createAsyncThunk(
  'authSlice/updateCustomer',
  async (customerDto: Omit<MyCustomerUpdate, 'version'> | null, { getState }) => {
    const state = getState() as RootState;
    let result: Customer | null;

    const { id, version } = state.authSlice.customer!;

    if (!id) return null;

    if (customerDto) {
      result = (await updateCustomerInfo({ ...customerDto, version }, id))?.body;
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
