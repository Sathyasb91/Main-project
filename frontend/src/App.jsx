import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter,Route, Routes} from 'react-router-dom'
import Landing from '../components/landing'
import Buyer from '../components/buyer'
import Profile from '../components/profile'
import Login from '../components/login'
import Signup from '../components/signup'
import Admin from '../components/admin'
import Dashboard from '../components/dashboard'
import Products from '../components/products'
import ViewProduct from '../components/productlist'
import EditProduct from '../components/editproduct'
import Edituser from '../components/userdetails-edit'
import UserList from '../components/user-list'
import Aboutus from '../components/aboutus'
import Wishlist from '../components/wishlist'
import ProfileEdit from '../components/profileedit'
import Cart from '../components/cart'
import Checkout from '../components/checkout'
import Orders from '../components/orderhistory'
import Category from '../components/category'


function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/buyer" element={<Buyer />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/products" element={<Products />} />
      <Route path="/productlist" element={<ViewProduct />} />
      <Route path="/editproduct/:id" element={<EditProduct />} />
      <Route path="/userslist" element={<UserList/>} />
      <Route path="/editusers/:id" element={<Edituser />} />
      <Route path="/aboutus" element={<Aboutus />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/wishlist/:id" element={<Wishlist />} />
      <Route path="/profileedit/:id" element={<ProfileEdit />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/orders" element={<Orders />}/>
      <Route path="/category/:category" element={<Category />} />

    </Routes>
    </BrowserRouter>
     
    
  )
}

export default App
