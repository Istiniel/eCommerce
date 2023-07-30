import StoreProvider from '../redux/StoreProvider';

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

const AppProvider = compose(StoreProvider);
export default AppProvider;
