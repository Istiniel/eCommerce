import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import Main from './Main';
import NotFound from './NotFound';
import Product from './Product';
import Products from './Products';
import SharedLayout from './SharedLayout';
import SignIn from './SignIn';
import SignUp from './SignUp';

export function Routes() {
  return (
    <>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<Main />} />
        <Route path="products">
          <Route index element={<Products />} />
          <Route path=":productId" element={<Product />} />
        </Route>
        <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="/products/:productId/comments" element={<h1>Comments</h1>} />
    </>
  );
}

function AppRouter() {
  const router = createBrowserRouter(createRoutesFromElements(<Routes />));

  return <RouterProvider router={router} />;
}

export default AppRouter;
