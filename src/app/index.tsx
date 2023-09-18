import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppRouter from '../pages';
import AppProvider from './providers';
import './styles/App.scss';

function App() {

  return (
    <AppProvider>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{ fontSize: 16 }}
      />
      <AppRouter />
    </AppProvider>
  );
}

export default App;
