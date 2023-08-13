import { ConfigProvider } from 'antd';
import AppRouter from '../pages';
import AppProvider from './providers';
import './styles/App.scss';

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#000000',
          colorErrorOutline: 'tomato',
          borderRadius: 0,
          colorBorder: 'hsl(0, 0%, 17.5%);',

        },
      }}
    >
      <AppProvider>
        <AppRouter />
      </AppProvider>
    </ConfigProvider>
  );
}

export default App;
