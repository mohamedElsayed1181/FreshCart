import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading";
import { Helmet } from "react-helmet";

export default function Category() {
  const [Categories, setCategories] = useState([]);
  const getCategories = async () => {
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/categories`
    );
    setCategories(data.data);
  };
  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <Helmet>
        <title>Category</title>
      </Helmet>
      {Categories.length != 0 ? (
        <div className="container">
          <div className="row my-2 align-items-center">
            <h2 className="text-main">Our Catigories</h2>
            <p className="text-main">
              You can see our Categories and each Category products
            </p>
            {Categories.map((item) => (
              <div key={item._id} className="col-md-3">
                <Link>
                  {" "}
                  <img className="w-100" height={200} src={item.image} alt="" />
                  <h6 className="text-center">{item.name}</h6>
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
