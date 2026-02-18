import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Layout from './components/layout/Layout'
import Products from './pages/Products'
import { productsLoader } from './services/loader/loader'
import Profile from './pages/profile/Profile'
import Cart from './pages/cart/Cart'
import Category from './pages/Category'


const router = createBrowserRouter((createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route index element={<Home />} />
    <Route path="category/:categoryName" element={<Category />} />
    <Route path='signin' element={<SignIn />} />
    <Route path='signup' element={<SignUp />} />
    <Route path='cart/*' element={<Cart />} />
    {/* <Route path='profile' element={<Profile />} /> */}
    <Route path="/profile/*" element={<Profile />} />
    <Route
      path='products'
      element={<Products />}
      loader={productsLoader}
    />
  </Route>
)))

const App = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default App