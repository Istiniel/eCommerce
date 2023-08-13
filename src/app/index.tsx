import AppRouter from '../pages';
import AppProvider from './providers';
import './styles/App.scss';

function App() {
  return (
      <AppProvider>
        <AppRouter />
      </AppProvider>
  );
}

export default App;
