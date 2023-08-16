import { Customer, CustomerSignin } from "@commercetools/platform-sdk";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { signIn } from "../../services/commerceTools/Client";
import { token } from "../../services/commerceTools/BuildClient";

export const loginCustomer = createAsyncThunk('authSlice/loginCustomer', async (customerDto?: CustomerSignin | null) => {
  let result: Customer | null;

  if (customerDto) {
    result = await signIn(customerDto);
    localStorage.setItem('current-customer', JSON.stringify(result))
  } else if (customerDto === null) {
    result = null
    localStorage.removeItem('current-customer')
    token.set({ token: '', expirationTime: 0, refreshToken: '' });
  } else {
    const customerInfo = localStorage.getItem('current-customer')
    result = customerInfo ? JSON.parse(customerInfo) : null
  }


  return result
})