import { PreloadedState } from '@reduxjs/toolkit';
import { RenderOptions, render } from '@testing-library/react';
import React, { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import { AppStore, RootState, setupStore } from '../redux/store';
import i18n from '../services/translation';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
}

function renderTestApp(
  component: React.ReactElement,
  {
    preloadedState = {},
    store = setupStore(preloadedState),
    ...RenderingOptions
  }: ExtendedRenderOptions = {},
) {
  function Wrapper({ children }: PropsWithChildren<unknown>): JSX.Element {
    return (
      <I18nextProvider i18n={i18n}>
        <Provider store={store}>{children}</Provider>
      </I18nextProvider>
    );
  }

  return { store, ...render(component, { wrapper: Wrapper, ...RenderingOptions }) };
}

export default renderTestApp;
