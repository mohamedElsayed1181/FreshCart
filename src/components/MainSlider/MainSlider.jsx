import React from 'react'
import Slider from "react-slick";
import slider1 from"../../images/slider/slider-image-1.jpeg";
import slider2 from"../../images/slider/slider-image-2.jpeg";
import slider3 from"../../images/slider/slider-image-3.jpeg";

export default function MainSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,  
    arrows:false,
    autoplay:true,
    
  };

  return (
    <>
    <div className='my-2'>

    <Slider  {...settings} autoplaySpeed={5000} >
  <img height={410} src={slider1} alt="" />
  <img height={410} src={slider2} alt="" />
  <img height={410} src={slider3} alt="" />
 

    </Slider>
    </div>
    </>
  )
}
