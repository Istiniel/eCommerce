import fetch from 'node-fetch';
import {
  ClientBuilder,
  // Import middlewares
  type AuthMiddlewareOptions, // Required for auth
  type HttpMiddlewareOptions,
  TokenStore,
  TokenCache,
  PasswordAuthMiddlewareOptions,
  UserAuthOptions, // Required for sending HTTP requests
} from '@commercetools/sdk-client-v2';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

const projectKey = import.meta.env.VITE_CTP_PROJECT_KEY;
const scopes = import.meta.env.VITE_CTP_SCOPES.split(' ');

class CommerceToolsToken implements TokenCache {
  tokenStore: TokenStore = {
    token: '',
    expirationTime: 0,
    refreshToken: '',
  };

  get() {
    return this.tokenStore;
  }

  set(token: TokenStore) {
    this.tokenStore = token;
  }
}

export const token = new CommerceToolsToken();

// Configure authMiddlewareOptions
const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: import.meta.env.VITE_CTP_AUTH_URL,
  projectKey,
  credentials: {
    clientId: import.meta.env.VITE_CTP_CLIENT_ID,
    clientSecret: import.meta.env.VITE_CTP_CLIENT_SECRET,
  },
  scopes,
  fetch,
  tokenCache: token,
};

// Configure httpMiddlewareOptions
export const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: import.meta.env.VITE_CTP_API_URL,
  fetch,
};

export const anonimusClient = new ClientBuilder()
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware()
  .build();

export function getAuthApi(user: UserAuthOptions) {
  const authOptions: PasswordAuthMiddlewareOptions = {
    host: import.meta.env.VITE_CTP_AUTH_URL,
    projectKey,
    credentials: {
      clientId: import.meta.env.VITE_CTP_CLIENT_ID,
      clientSecret: import.meta.env.VITE_CTP_CLIENT_SECRET,
      user,
    },
    scopes,
    fetch,
    tokenCache: token,
  };

  const withPasswordClient = new ClientBuilder()
    .withPasswordFlow(authOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware()
    .build();

  return createApiBuilderFromCtpClient(withPasswordClient).withProjectKey({ projectKey });
}
