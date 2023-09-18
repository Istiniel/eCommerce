import { PreloadedState } from '@reduxjs/toolkit';
import { RenderOptions, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { RouterProvider, createMemoryRouter, createRoutesFromElements } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import { getRoutes } from '../../pages';
import { AppStore, RootState, setupStore } from '../redux/store';
import i18n from '../services/translation';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  initialRoute?: string;
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
}

function renderTestApp({
  initialRoute = '/',
  preloadedState = {},
  store = setupStore(preloadedState),
  ...RenderingOptions
}: ExtendedRenderOptions = {}) {
  const routes = createRoutesFromElements(getRoutes());
  const router = createMemoryRouter(routes, {
    initialEntries: [initialRoute],
    initialIndex: 0,
  });

  function testApp() {
    return (
      <I18nextProvider i18n={i18n}>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </I18nextProvider>
    );
  }

  return { store, ...render(testApp(), { wrapper: undefined, ...RenderingOptions }) };
}

export default renderTestApp;
