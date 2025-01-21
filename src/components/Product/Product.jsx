import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/cartContext.js";
import { Helmet } from "react-helmet";

import { toast } from "react-toastify";
export default function Product({ Products }) {
  let { addToCart, getCartCount } = useContext(CartContext);

  async function addPrpduct(productId) {
    let token = localStorage.getItem("token");
    if (token) {
      let response = await addToCart(token, productId);
      if (response.status == 200) {
        getCartCount();
        const notify = (msg, type) => {
          toast[type](msg);
        };
        notify("Product added successfully", "success");
      }
      console.log(response);
    } else {
      alert("you are not logged in");
    }
  }

  return (
    <>
      <Helmet>
        <title>Products </title>
      </Helmet>

      {Products.map((item) => {
        return (
          <div key={item._id} className="col-md-2">
            <div className="product">
              <Link to={"/product-details/" + item._id}>
                <img src={item.imageCover} className="w-100" alt="" />
                <h6 className="text-main">{item.category.name}</h6>
                {item.title.split(" ").slice(0, 2).join(" ")} 

                <div className="d-flex justify-content-between align-items-between my-3">
                  <span>{item.price} EGP</span>
                  <div>
                    <i className="fas fa-star rating-color"></i>
                    {item.ratingsAverage}
                  </div>
                </div>
              </Link>

              <button
                onClick={() => addPrpduct(item._id)}
                className="btn bg-main text -white w-100"
              >
                Add To Cart
              </button>
            </div>
          </div>
        );
      })}
    </>
  );
}
