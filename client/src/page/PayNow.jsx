import React,{useContext,useState, useEffect} from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { DataContext } from '../context/DataContext'
import axios from 'axios'
const PayNow = () => {
  const {pid}=  useParams()
  const urll=localStorage.getItem('Ecomlongurl')
  const dat=localStorage.getItem('EcomUserId')
  const Ecompaymentmode=localStorage.getItem('Ecompaymentmode')
  const [total, setTotal] = useState("")
  const {cart,setCart}=useContext(DataContext)

  useEffect(()=>{
    //    console.log()
       let totamo=0;
       for(let i=0;i<cart.length;i++)
       {
           totamo += cart[i].price*cart[i].qty;
           
       }
       totamo +=50;
       setTotal(totamo)
    },[])

  const onPay=()=>{
    // let str = urll;
    // const myArr = str.split("/");
    // const pyid=myArr[myArr.length-1];
    // console.log(pyid )
    // console.log(urll)
    // const data={
    //     userid:dat,
    //     totalprice:total,
    //     orderstatus:"order done",
    //     paymentmode:Ecompaymentmode,
    //     payId:pyid,
    //     cart:cart
    // }
    // window.location.href=urll
    // const res= await axios.post(`http://localhost:8000/paydetails`,data)
     console.log("hi")

      

  }
    return (
        <>
        <div className="container p-5">
            <div className="text-center">
                {/* <NavLink to={{ pathname: urll }} target="_blank" className="btn btn-info">Pay Now</NavLink> */}
                <button className="btn btn-info" onClick={onPay}>Pay Now</button>
            </div>
        </div>
            
        </>
    )
}

export default PayNow
