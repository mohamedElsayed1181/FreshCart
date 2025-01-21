import React, { useEffect } from "react";
import axios from "axios";
import Slider from "react-slick";
// import baseUrl from"../utilits/baseUrl.js"
import { useState } from "react";
export default function CategorySlider() {
  const [Categories, setCategories] = useState([]);
  const getAllCategories = async () => {
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/categories`
    );
    setCategories(data.data);
  };
  useEffect(() => {
    getAllCategories();
  }, []);

  var settings = {
    //dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    arrows: false,
    autoplay: true,
  };

  return (
    <>
      <div className="my-5 container">
        <h3 className="text-main">shop popular Categories</h3>
        <Slider {...settings} autoplaySpeed={3000}>
          {Categories.map((item) => {
            return (
              <div key={item._id}>
                <img className="w-100" height={200} src={item.image} alt="" />

                <h6 className="text-main">{item.name}</h6>
              </div>
            );
          })}
        </Slider>
      </div>
    </>
  );
}
