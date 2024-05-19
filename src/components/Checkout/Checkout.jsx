import { useFormik } from 'formik'
import React, { useContext } from 'react'
import { CartContext } from '../../context/cartContext';

export default function Checkout() {
let{onlinePayment}=useContext(CartContext)

async function handleSubmit(values){
  
  let response=await onlinePayment('642c067c7e8abe57d5254f57',values);
  if(response?.data?.status==='success')
  console.log(response.data.session.url)
  window.location.href=response.data.session.url;
console.log(response)

}

let formik=useFormik({
initialValues:{
details:'',
phone:'',
city:'',
},
onSubmit:handleSubmit
// onSubmit:(values)=>{
// console.log(values);

// }
})
return (

    <>
    <div className="w-50 m-auto">

<form onSubmit={formik.handleSubmit} >
<label htmlFor="details">Details</label>
<input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.details} type="text"name='details' id='details' className='form-control my-3' />

<label htmlFor="phone">Phone</label>
<input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone} type="tel"name='phone' id='phone' className='form-control my-3' />

<label htmlFor="city">City</label>
<input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.city}  type="text"name='city' id='city' className='form-control my-3' />

<button onClick={()=>onlinePayment()} type='submit' className=' btn bg-main text-white w-100 '>Pay</button>

</form>

    </div>
    </>
  )
}




