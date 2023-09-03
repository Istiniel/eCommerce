import {
  Action,
  PreloadedState,
  ThunkAction,
  combineReducers,
  configureStore,
} from '@reduxjs/toolkit';
import AuthReducer from './features/AuthSlice/AuthSlice';
import ProductsReducer from './features/ProductsSlice/ProductsSlice';

const rootReducer = combineReducers({
  authSlice: AuthReducer,
  productsSlice: ProductsReducer
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
