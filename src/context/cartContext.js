import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let CartContext = createContext(0);

export default function CartContextProvider({ children }) {
  let [count, setCount] = useState(0);

  function addToCart(token, productId) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        { productId },
        { headers: { token } }
      )
      .then((data) => data)
      .catch((error) => error);
  }

  function getUserCart(token) {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers: { token },
      })
      .then((data) => data)
      .catch((error) => error);
  }

  function removeCartItem(token, productId) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId} `, {
        headers: { token },
      })
      .then((data) => data)
      .catch((error) => error);
  }

  function updateQty(token, productId, count) {
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId} `,
        { count },
        { headers: { token } }
      )
      .then((data) => data)
      .catch((error) => error);
  }

  function getCartCount() {
    let token = localStorage.getItem("token");
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers: { token },
      })
      .then((data) => {
        setCount(data.data.numOfCartItems);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getCartCount();
  }, []);

  function onlinePayment(cartId, shippingAddress) {
    return axios
      .post(
        ` https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,
        {
          shippingAddress: shippingAddress,
        },
        {
          // headers:token
        }
      )
      .then((response) => response)
      .catch((error) => error);
  }

  return (
    <CartContext.Provider
      value={{
        onlinePayment,
        addToCart,
        getCartCount,
        getUserCart,
        removeCartItem,
        updateQty,
        count,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
