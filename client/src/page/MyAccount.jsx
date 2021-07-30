import React,{useEffect, useState,useRef} from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import axios from 'axios'

const MyAccount = () => {
    const [order, setOrder] = useState([])
   
    const userdatast=localStorage.getItem('EcomUser')

    const logout=()=>{
        localStorage.removeItem("Ecomtoken");
        localStorage.removeItem("Ecomlongid");
        localStorage.removeItem("EcomEmail");
        localStorage.removeItem("EcomUser");
        localStorage.removeItem("Ecompaymentmode");
        localStorage.removeItem("EcomUserId")
        window.location.reload()
       }

   const timeout = useRef(null)
   const his= useHistory()
   const checkAuth=()=>{
       axios.get("http://localhost:8000/isAuth",{
           headers:{
            "x-access-token":localStorage.getItem("Ecomtoken")
           }
       }).then((response)=>{
        //  console.log()
        if(!response.data.login)
        {
            his.push("/");
        }
       })
    
    }
   
    useEffect(()=>{
       timeout.current=setTimeout(checkAuth,10)
       return function(){
           if(timeout.current)
           {
               clearTimeout(timeout.current)
           }
       }
       
   
    },[])

    

   const getOrderDetails=async(id)=>{
        
        const res=await axios.get(`http://localhost:8000/account/${id}`)
        setOrder(res.data)
    }

    useEffect(()=>{
        const dat=localStorage.getItem('EcomUserId')
       
        getOrderDetails(dat)
    },[])
    if(!order.length)
    {
        return (
            <>
            <div className="container p-5">
            <button className="btn btn-success ml-1 mr-1" disabled>Welcome {userdatast}</button>
                    <button className="btn btn-warning ml-1 mr-1" onClick={logout}>LogOut</button>
                    <br /><br />

               <h2>You Not Yet Placed Any Order</h2>
               <button className="btn btn-info" onClick={()=>his.push('/products')}>Continue Shopping</button>
            </div>

            </>
        )
    }

    return (
        <>
         <div className="payment">
                <div className="container">
                    <button className="btn btn-success ml-1 mr-1" disabled>Welcome {userdatast}</button>
                    <button className="btn btn-warning ml-1 mr-1" onClick={logout}>LogOut</button>
                    <br /><br />
                    <div className="row">
                        <div className="table-responsive">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Order Date</th>
                                        <th>Payment Method</th>
                                        <th>Order Status</th>
                                        <th>Amount</th>
                                        <th>Operation</th>



                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        order.map((val,ind)=>{
                                            return(
                                                <>
                                                <tr key={ind}>
                                        <td>{ind+1}</td>
                                        <td >

                                            {
                                                new Date(val.timestamp).toDateString()
                                            }
                                        </td>
                                        
                                        <td>{val.paymentmode}</td>
                                        <td>
                                            {
                                                val.orderstatus
                                            }
                                        </td>
                                        <td>{val.totalprice}</td>
                                        <td>
                                            <NavLink to={`/myorder/${val.id}`} className="btn btn-info">View</NavLink>
                                        </td>



                                    </tr>

                                                </>
                                            )
                                        })

                                    }
                                    
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </div>
            
        </>
    )
}

export default MyAccount
