import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Product from '../Product/Product'
import Loading from '../Loading/Loading'

export default function Products() {
  const[Products,setProducts]=useState([])
  const getAllProducts=async()=>{
let{data}=await axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
console.log(data.data);
setProducts(data.data)

  }
  useEffect(() => {
    getAllProducts();
  }, []);


  return (
    <>
    <div className="container">
{Products.length!=0? <div className="row">
      <Product Products={Products}/>
  </div> :<Loading/>}
      </div>
    </>
  )
}
