import fetch from 'node-fetch';
import {
  ClientBuilder,
  // Import middlewares
  type AuthMiddlewareOptions, // Required for auth
  type HttpMiddlewareOptions,
  TokenStore,
  TokenCache, // Required for sending HTTP requests
} from '@commercetools/sdk-client-v2';

const projectKey = import.meta.env.VITE_CTP_PROJECT_KEY;
const scopes = import.meta.env.VITE_CTP_SCOPES.split(' ');


class CommerceToolsToken implements TokenCache {
  tokenStore: TokenStore = {
    token: '',
    expirationTime: 0,
    refreshToken: ''
  };

  get() {
    return this.tokenStore
  }

  set(token: TokenStore) {
    this.tokenStore = token
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
  tokenCache: token
};

// Configure httpMiddlewareOptions
const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: import.meta.env.VITE_CTP_API_URL,
  fetch,
};

export const anonimusClient = new ClientBuilder()
  .withAnonymousSessionFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware()
  .build();

// export const anonimusClient = new ClientBuilder()
//   .withAnonymousSessionFlow(authMiddlewareOptions)
//   .build();

// export const authorizedClient = new ClientBuilder()
//   .withExistingTokenFlow(token.get().token, { force: true })
//   .withHttpMiddleware(httpMiddlewareOptions)
//   .build();

// export const ctpClient = new ClientBuilder()
//   .withProjectKey(projectKey) // .withProjectKey() is not required if the projectKey is included in authMiddlewareOptions
//   .withClientCredentialsFlow(authMiddlewareOptions)
//   .withHttpMiddleware(httpMiddlewareOptions)
//   .withLoggerMiddleware() // Include middleware for logging
//   .build();
