import { Provider } from 'react-redux';

import { setupStore } from './store';

function StoreProvider({ children }: { children?: React.ReactNode }) {
  return <Provider store={setupStore()}>{children}</Provider>;
}

export default StoreProvider;
