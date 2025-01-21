import React from 'react'
import MainSlider from '../components/MainSlider/MainSlider.jsx'
import CategorySlider from '../components/CategorySlider/CategorySlider.jsx'
import Products from '../components/Products/Products.jsx'
import {Helmet} from "react-helmet";

export default function HomePage() {
  return (
    <>
    <Helmet>
    <title> Home </title>
</Helmet>

      <MainSlider/>
      <CategorySlider/>
      <Products/>
    </>
  )
}
