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
import AboutUs from './AboutUs';
import Profile from './Profile';
import ProductsByCategory from './ProductsByCategory';

export function getRoutes() {
  return (
    <>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<Main />} />
        <Route path="products">
          <Route index element={<Products />} />
          <Route path=":category" >
            <Route index element={<ProductsByCategory />} />
            <Route path=":productId" element={<Product />} />
          </Route>
        </Route>
        <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="about" element={<AboutUs />} />
        <Route path="profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="/products/:productId/comments" element={<h1>Comments</h1>} />
    </>
  );
}

function AppRouter() {
  const routes = createRoutesFromElements(getRoutes());
  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
}

export default AppRouter;
