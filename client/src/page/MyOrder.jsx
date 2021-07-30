import axios from 'axios'
import React, { useEffect, useState,useRef } from 'react'
import { NavLink, useParams ,useHistory} from 'react-router-dom'

const MyOrder = () => {
   const [data,setData]= useState([])
   const {id}=useParams()


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
       timeout.current=setTimeout(checkAuth,100)
       return function(){
           if(timeout.current)
           {
               clearTimeout(timeout.current)
           }
       }
       
   
    },[])


   const getData=async()=>{
     const {data}=  await axios.get(`http://localhost:8000/myorder/${id}`)
     setData(data)
   }
   useEffect(()=>{
    getData()
   },[])
    return (
        <>
         <div className="payment">
                <div className="container">
                    <div className="row">
                        <div className="table-responsive">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Order Details</th>
                                        <th>Price</th>
                                        <th>Qty</th>
                                        <th>Amount</th>
                                       



                                    </tr>
                                </thead>
                                <tbody>
                                   {
                                       data.map((val,ind)=>{
                                           return(
                                               <>
                                               <tr key={ind}>
                                                   <td>{ind+1}</td>
                                                   <td className="tb-or">
                                                       <NavLink to={`/details/${val.productid}`}>
                                                       <img src={`../img/${val.plant_image}`} alt={val.plant_image} className="img-fluid or-img" />
                                                       <p>{val.name}</p>
                                                       </NavLink>
                                                   </td>
                                                   <td>
                                                       {val.price}

                                                   </td>
                                                   <td>{val.productqty}</td>
                                                   <td>
                                                       {val.price*val.productqty}
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

export default MyOrder
