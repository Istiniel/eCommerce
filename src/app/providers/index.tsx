import StoreProvider from '../redux/StoreProvider';
import AntdProvider from './AntdProvider';

type WithChildren = { children?: React.ReactNode };

type Provider = ({ children }: WithChildren) => React.ReactElement;

const compose = (...providers: Provider[]) =>
  function ({ children }: WithChildren) {
    return (
      <>
        {providers.reduce(
          (childrenInContext, Element) => (
            <Element>{childrenInContext}</Element>
          ),
          children,
        )}
      </>
    );
  };

const AppProvider = compose(StoreProvider, AntdProvider);
export default AppProvider;
