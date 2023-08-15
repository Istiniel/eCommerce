import {
  CustomerSignin,
  MyCustomerDraft,
  createApiBuilderFromCtpClient,
} from '@commercetools/platform-sdk';
import { anonimusClient } from './BuildClient';

// Create apiRoot from the imported ClientBuilder and include your Project key
export const apiRoot = createApiBuilderFromCtpClient(anonimusClient)
  .withProjectKey({ projectKey: import.meta.env.VITE_CTP_PROJECT_KEY });

export const signUp = async (newClient: MyCustomerDraft) => {
  const response = await apiRoot.customers().post({ body: newClient }).execute()
  return response.body.customer
}

export const signIn = async (newClient: CustomerSignin) => {
  const response = await apiRoot.login().post({ body: newClient }).execute()
  return response.body.customer
}
