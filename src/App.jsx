import React, { Children } from 'react'
import { RouterProvider,createBrowserRouter } from 'react-router-dom'
import MainLayout from './Layout/MainLayout'
import Products from './components/Products/Products'
import HomePage from './Pages/HomePage'
import ProductDetails from './components/ProductDetails/ProductDetails'
import Rigister from './components/Rigister/Rigister'
import Login from './components/Login/Login'
import { ToastContainer} from 'react-toastify';
import CartContextProvider from './context/cartContext'
import Navbar from './components/Navbar/Navbar'
import Cart from './components/Cart/Cart'
import Checkout from './components/Checkout/Checkout'
import { Offline, Online } from "react-detect-offline";
import Category from './components/Category/Category';
import Brands from "./components/Brands/Brands"
export default function App() {

  const router = createBrowserRouter([{ path: '', element: <MainLayout/>, children: [
    {path: '/', element: <HomePage/> },
    {path: 'products', element: <Products/>},
    {path:'product-details/:id', element:<ProductDetails/>},
    {path: 'rigister', element: <Rigister/> },
    {path: 'login', element: <Login/> },
    {path: 'cart', element: <Cart/> },
    {path: 'Category', element: <Category/> },
    {path: 'Brands', element: <Brands/> },
    {path: 'checkout', element: <Checkout/> }
  ] }])



  return (
    <>
            <ToastContainer theme='colored' />
     { <CartContextProvider> 
    <Offline> <div className='network'><i class="fa-solid fa-globe"> Check your internet connection</i></div></Offline>
      <RouterProvider router={router}/>
      </CartContextProvider> }
    </>
  )
}
   
