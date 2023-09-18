import {
  Action,
  PreloadedState,
  ThunkAction,
  combineReducers,
  configureStore,
} from '@reduxjs/toolkit';
import AuthReducer from './features/AuthSlice/AuthSlice';
import ProductsReducer from './features/ProductsSlice/ProductsSlice';
import CartReducer from './features/CartSlice/CartSlice';

const rootReducer = combineReducers({
  authSlice: AuthReducer,
  productsSlice: ProductsReducer,
  cartSlice: CartReducer
});

export function setupStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    preloadedState,
  });
}

export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
