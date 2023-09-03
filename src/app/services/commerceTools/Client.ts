import {
  CustomerChangePassword,
  CustomerDraft,
  CustomerSignin,
  MyCustomerUpdate,
  createApiBuilderFromCtpClient,
} from '@commercetools/platform-sdk';
import { anonimusClient, getAuthApi } from './BuildClient';

export const apiRoot = createApiBuilderFromCtpClient(anonimusClient).withProjectKey({
  projectKey: import.meta.env.VITE_CTP_PROJECT_KEY,
});

export const signUp = async (newClient: CustomerDraft) => {
  const response = await apiRoot.customers().post({ body: newClient }).execute();
  return response.body.customer;
};

export const signIn = async (newClient: CustomerSignin) => {
  const authAPI = getAuthApi({ username: newClient.email, password: newClient.password });
  const response = await authAPI.login().post({ body: newClient }).execute()
  return response.body.customer;
};

export const updateCustomerInfo = async (newClient: MyCustomerUpdate, ID: string) => {
  const response = await apiRoot.customers().withId({ ID }).post({ body: newClient }).execute();
  return response;
};

export const changePasswordInfo = async (changePasswordDto: CustomerChangePassword) => {
  const response = await apiRoot.customers().password().post({body: changePasswordDto}).execute();
  const newCustomerData = response.body;
  if (newCustomerData) {
    getAuthApi({ username: newCustomerData.email, password: changePasswordDto.newPassword })
  }
  return response;
};