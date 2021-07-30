import React, { useState,useRef ,useEffect} from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import axios from 'axios'
// import { DataContext } from '../context/DataContext'
const Register = () => {
    const [username,setUserName]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [status,setStatus]=useState(false)
    const [msg,setMsg]=useState("")
    const timeout = useRef(null)
   
    const his= useHistory()
    const checkAuth=()=>{
        axios.get("http://localhost:8000/isAuth",{
            headers:{
             "x-access-token":localStorage.getItem("Ecomtoken")
            }
        }).then((response)=>{
         //  console.log()
         if(response.data.login)
         {
             his.push("/home");
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
        //   checkAuth()
        
 
     },[])

    const onSub=async (e)=>{
        e.preventDefault()
        const data={
            username:username,
            email:email,
            password:password
        }
        // console.log(data)
         const res=await axios.post("http://localhost:8000/register",data)
        //  console.log(res)
        if(res.data.msg)
        {
          setStatus(true)
          setMsg(res.data.msg)
  
        }
        else
        {
          his.push("/")
        }
    }

    return (
        <>
        <div className="login">
            <div className="container">
                <div className="row">
                    <div className="col-md-6 col-12 mx-auto mb-3">
                    {
                    status ?(
                      <>
                        <div className="alert alert-primary alert-dismissible fade show ">
                        <button type="button" className="close" data-dismiss="alert" onClick={()=> setStatus(false)}>&times;</button>
                        <p>{msg}</p>
                      </div>

                      </>
                    ):null
                  }
                  <br />

                        <h2 className="text-center">Register Now</h2>
                        <form onSubmit={onSub}>
                        <div class="form-group">
                               <input type="text" class="form-control" name="name" placeholder="Enter UserName" value={username} onChange={(e)=>setUserName(e.target.value)} required />
                             </div>
                             <div class="form-group">
                               <input type="email" class="form-control" name="email" placeholder="Enter Email"  value={email} onChange={(e)=>setEmail(e.target.value)} required />
                             </div>
                            <div class="form-group">
                                    
                                    <input type="password" class="form-control" name="password" placeholder="Enter Password"  value={password} onChange={(e)=>setPassword(e.target.value)} required />
                            </div>
                            <button type="submit" className="btn btn-info">Register</button>
                                   
                        </form>
                        <br />
                        <NavLink to="/" >Login Now</NavLink>
                    </div>
                </div>
            </div>

        </div>
            
        </>
    )
}

export default Register
