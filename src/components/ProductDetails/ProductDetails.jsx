import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../Loading/Loading";

export default function ProductDetails() {
  let { id } = useParams();

  const [Product, setProduct] = useState([]);
  const getProduct = async () => {
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`
    );
    console.log(data.data);
    setProduct(data.data);
  };
  useEffect(() => {
    getProduct();
  }, []);

  return (
    <>
      {Product.length != 0 ? (
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <img src={Product.imageCover} className="w-100 my-3" alt="" />
            </div>
            <div className="col-md-9 my-5">
              <h3>{Product.title}</h3>
              <p>{Product.description}</p>

              <div className="d-flex justify-content-between align-items-between my-3">
                <span> Price:{Product.price}EGP</span>
                <div>
                  <i className="fas fa-star rating-color my-3"></i>
                  {Product.ratingsAverage}
                </div>
              </div>
            </div>

            <button className="bg-main form-control text-white">
              <p>Click here To Check More Details</p>{" "}
            </button>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
