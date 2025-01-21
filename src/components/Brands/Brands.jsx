import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading";
import { Helmet } from "react-helmet";

export default function Brands() {
  const [Brands, setBrands] = useState([]);
  const getBrands = async () => {
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/brands`
    );
    setBrands(data.data);
  };
  useEffect(() => {
    getBrands();
  }, []);

  return (
    <>
      <Helmet>
        <title>Brands </title>
      </Helmet>
      {Brands.length != 0 ? (
        <div className="container">
          <div className="row my-2 align-items-center">
            <h2 className="text-main">Our Brands</h2>
            <p className="text-main">
              You can see our brands and each brand products
            </p>
            {Brands.map((item) => (
              <div key={item._id} className="col-md-3">
                <Link>
                  {" "}
                  <img className="w-100" height={200} src={item.image} alt="" />
                  <h6 className="text-center text-main">{item.name}</h6>
                </Link>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
