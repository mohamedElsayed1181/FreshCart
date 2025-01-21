
import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../context/cartContext';
import { toast } from 'react-toastify';
import Loading from '../Loading/Loading';
import { Link } from 'react-router-dom';
import {Helmet} from "react-helmet";
export default function Cart() {
  const { getUserCart,removeCartItem,updateQty,getCartCount } = useContext(CartContext);
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  async function getCart() {
    let token = localStorage.getItem('token');
    if (token) {
      let response = await getUserCart(token);
      console.log(response);
      if (response.data && response.data.data) {
        setCart(response.data.data.products);
        setTotalPrice(response.data.data.totalCartPrice);
      }
    }
  }
  async function deleteProduct(productId) {
    let token = localStorage.getItem('token');
    if (token) {
      let response = await removeCartItem(token,productId);
      console.log(response);
      if (response.data && response.data.data) {
        setCart(response.data.data.products);
        setTotalPrice(response.data.data.totalCartPrice);
        if(response.status==200){
          const notify = (msg,type) => {
            toast[type](msg);
          };
          notify('Product deleted successfully','success')
          getCartCount()
        }

      }
    }
  }
  async function updateProductQty(productId,count) {
    let token = localStorage.getItem('token');
    if (token) {
      let response = await updateQty(token,productId,count);
      console.log(response);
      if (response.data && response.data.data) {
        setCart(response.data.data.products);
        setTotalPrice(response.data.data.totalCartPrice);
        if(response.status==200){
          const notify = (msg,type) => {
            toast[type](msg);
          };
          notify('Product Updated successfully','success')
    
        }

      }
    }
  }

  useEffect(() => {
    getCart();
  }, []);

  return (
   
    <>

<Helmet>
    <title>Cart Details </title>
</Helmet>;


     {cart.length!=0 ? <div className="container">
        <div className="bg-main-light p-3 my-4">
          <h3>Shop Cart</h3>
          <h6 className="text-main my-3">Total Cart Price: {totalPrice} EGP</h6>
          {cart.map((item) => {
            return (
              <div key={item._id} className="row border-bottom my-3">
                <div className="col-md-1">
                  <img src={item.product.imageCover} className="w-100" alt="" />
                </div>
                <div className="col-md-11 d-flex justify-content-between">
                <div>
                <h6>{item.product.title}</h6>
                  <h6 className="text-main mx-2 fw-border">{item.price} EGP</h6>
                  <button onClick={()=>deleteProduct(item.product._id)} className='text-danger btn-1'>Remove <i className="fa-solid fa-trash"></i></button>
                </div>
                <div>


  <button onClick={()=>updateProductQty(item.product._id,item.count+1)} className='btn-border'>+</button>
  <span className='mx-1'> {item.count}</span>
  <button onClick={()=>updateProductQty(item.product._id,item.count-1)} className='btn-border'>-</button> 

                </div>
                </div>
              </div>
            );
          })}
          <Link to='/checkout' className='btn bg-main text-white'>CHEKOUT</Link>
        </div>
      </div>:<Loading/>}
    </>
  );
}

