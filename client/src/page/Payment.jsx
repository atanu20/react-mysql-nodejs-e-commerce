import React, { useContext ,useEffect,useState,useRef} from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { DataContext } from '../context/DataContext'
import axios from 'axios'
const Payment = () => {
    const his = useHistory()
    const datemail=localStorage.getItem('EcomEmail')
    const [name, setName] = useState("")
    const [email, setEmail] = useState(datemail)
    const [phone, setPhone] = useState("")
    const [addr, setAddr] = useState("")
    const [yourAddress, setYourAddress] = useState([])
    const [inputAddres, setInputAddres] = useState("")
    const [showaddress,setShowaddress]=useState(false)
    const [payment, setPayment] = useState("")
   const [UserId,setUserId]= useState("")

    const {cart,setCart}=useContext(DataContext)
    const [total, setTotal] = useState("")
    var tot=0;
    


    const timeout = useRef(null)
   
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
        timeout.current=setTimeout(checkAuth,1000)
        return function(){
            if(timeout.current)
            {
                clearTimeout(timeout.current)
            }
        }
        
    
     },[])


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

       


   const getaddress=async ()=>{
    const dat=localStorage.getItem('EcomUserId')
   
    
       const res=await axios.get(`http://localhost:8000/getaddress/${dat}`)
    //   
       setYourAddress(res.data)

    }

    
const onSub=(e)=>{
e.preventDefault()
const dat=localStorage.getItem('EcomUserId')
const adddata={
    name:name,
    email:email,
    phone:phone,
    address:addr,
    userId:dat
}
const sendData=async ()=>{
    const res=await axios.post(`http://localhost:8000/addaddress`,adddata)
    // console.log(res)
    setShowaddress(false)

}
sendData()
getaddress()
// console.log(data)
}

useEffect(()=>{
    getaddress()
},[])

useEffect(()=>{
    getaddress()
},[yourAddress])



const OnBuyNow=async (e)=>{
e.preventDefault()
//  console.log(inputAddres + payment)
const dat=localStorage.getItem('EcomUserId')
const datemail=localStorage.getItem('EcomEmail')
const datname=localStorage.getItem('EcomUser')
localStorage.setItem('Ecompaymentmode',payment)


const data={
    userid:dat,
    totalprice:total,
    // orderstatus:"order Not Done",
    paymentmode:payment,
    paymentemail:datemail,
    name:datname,
    cart:cart
}
// console.log(data)
 
  const res=await axios.post(`http://localhost:8000/buynow`,data)
//   console.log(res.data.payment_request.longurl)

  if(res.data.success)
  {
     setCart([])
    localStorage.setItem('Ecomlongid',res.data.payment_request.id)
   
     his.push(`/myaccount`)
  }else{
      console.log("order not placed")
  }
  window.open(res.data.payment_request.longurl,'_self')
//   window.close('http://localhost:3000/payment')
}

useEffect(()=>{
    const dat=localStorage.getItem('EcomUserId')
    setUserId(dat)
},[])




    if(!cart.length)
    {
        return (
            <>
            <div className="container p-5">
            <h2>There is No cart items</h2>
            </div>

            </>
        )
    }
    
    

    
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
                                        <th>Product</th>
                                        <th>Price</th>
                                        <th>Qty</th>
                                        <th>Amount</th>



                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        
                                        cart.map((val,ind)=>{
                                            tot=tot+val.price*val.qty
                                            
                                                // tot >0 ? setTotal(tot) :null
                                            
                                            // console.log(tot)
                                            return(
                                                <>
                                                <tr key={ind}>
                                        <td>{ind+1}</td>
                                        <td className="tab-box">

                                            <NavLink to={`/details/${val.id}`}>

                                                <img src={`../img/${val.image}`} alt={`../img/${val.image}`} className="img-fluid t-img" />
                                                <p >{val.name}</p>
                                            </NavLink>
                                        </td>
                                        <td>{val.price}.00</td>
                                        <td>{val.qty}</td>
                                        <td>{val.price*val.qty}.00</td>



                                    </tr>
                                                </>
                                            )
                                        })
                                    }
                                    <div className="pay p-3">
                                    <h2>Sub Total : {tot}.00</h2>
                                    <h2>Delivery Fees: 50.00</h2>
                                    <h2>Total Amount : {tot+50}.00</h2>
                                  
                                    </div>

                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </div>
            <div className="address">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 col-12 mx-auto mb-3">
                            {
                                showaddress && (
                                    <>
                                    <div className="card">
                                <form onSubmit={onSub}>
                                    <div class="form-group">
                                        <label >Name:</label>
                                        <input type="text" class="form-control" name='name' placeholder="Enter name" value={name}  onChange={(e)=>setName(e.target.value)} required />
                                    </div>
                                    <div class="form-group">
                                        <label >Email:</label>
                                        <input type="text" class="form-control" name='email' placeholder="Enter Email" readOnly value={email}  onChange={(e)=>setEmail(e.target.value)} required />
                                    </div>
                                    <div class="form-group">
                                        <label >Phone:</label>
                                        <input type="tel" class="form-control" name='phone' placeholder="Enter Phone" value={phone}  onChange={(e)=>setPhone(e.target.value)} required />
                                    </div>

                                    <div class="form-group">
                                        <label >Full Address:</label>

                                        <textarea name="address" id="" class="form-control" rows="3" placeholder="Enter Full Address" value={addr}  onChange={(e)=>setAddr(e.target.value)} required></textarea>
                                    </div>



                                    <div class="text-center mb-5">
                                        <input type="submit" class="btn btn-info pt-2 pb-2 pl-5 pr-5" value="Add Address" />
                                    </div>
                                </form>
                            </div>

                                    </>
                                )
                            }
                            
                        </div>
                        <div className="col-md-6 col-12 mx-auto mb-3">
                            <div className="card">
                                <h3>Add Recived Address</h3>
                                <br />
                                {
                                    yourAddress.length ? (
                                        <>
                                         <form onSubmit={OnBuyNow}>
                                   
                                   {
                                       yourAddress.map((val,ind)=>{
                                           return(
                                               <>
                                               <button type="button" className="btn btn-info" onClick={()=>his.push(`/edit_address/${UserId}`)}>Edit Address</button>
                                                <div class="form-check ">
                               <label class="form-check-label p-1 mb-2">
                                                <input type="radio" class="form-check-input" name="gender" value={val.id} onChange={(e)=>setInputAddres(e.target.value)} required />
                                   {val.name}<br /> {val.email} <br /> {val.phone} <br /> {val.address}
                                   </label>
                           </div>
                                               </>
                                           )
                                       })
                                   }
                                  


                              

                           <h4>Choose payment option</h4>
                          
                           {/* <div class="form-check-inline">
                               <label class="form-check-label">
                                   <input type="radio" class="form-check-input" name="payment" value="cod" onChange={(e)=>setPayment(e.target.value)}  required/>Cod
                               </label>
                           </div> */}
                           <div class="form-check-inline">
                               <label class="form-check-label">
                                   <input type="radio" class="form-check-input" name="payment" value="online" onChange={(e)=>setPayment(e.target.value)} required />Online
                               </label>
                           </div>


                           <div class="text-center m-3">
                               <input type="submit" class="btn btn-info pt-2 pb-2 pl-5 pr-5" value="Buy Now" />
                           </div>




                       </form>

                                        </>
                                    ):
                                    <button className="btn btn-info" onClick={()=>setShowaddress(true)}>Add Address</button>
                                }
                               
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Payment

