
import React,{useEffect,useRef} from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import axios from 'axios'
const Success = () => {
 const his=   useHistory()
 const loc=useLocation()
 const pid=localStorage.getItem('Ecomlongid')
 useEffect(() => {
     const paydet=async()=>{
        // console.log(loc.search)
        const str=loc.search;
        const myArr = str.split("=");
      const pyid=myArr[myArr.length-1];
    //   console.log(pyid)
    const data={
        pid:pid,
        pyid:pyid
    }
        const res=  await axios.post(`http://localhost:8000/paydetails`,data)
    //    console.log(his)
    console.log(res)
      
     }
     paydet()
    
 }, [])



 const timeout = useRef(null)
//  const his= useHistory()
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



    return (
        <>
        <div className="container p-5">
            <div className="row">
            <div className="container text-center">
                    <h2>Thank You for Buy This</h2>
                    <button className="btn btn-info" onClick={()=>his.push('/products')}>Continue Shopping</button>
                    </div>
            </div>
        </div>
            
        </>
    )
}

export default Success
