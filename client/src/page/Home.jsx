import React,{useEffect,useRef} from 'react'
import { useHistory } from 'react-router-dom'
import '../App.css'
import AllProducts from '../component/AllProducts'
// import { DataContext } from '../context/DataContext'
import axios from 'axios'

const Home = () => {
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
            // window.location.reload()
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
    //  setInterval(checkAuth, 1000);
    useEffect(() => {
        const datafet=async()=>{
            const res=await axios.get(`https://open.mapquestapi.com/geocoding/v1/address?key=ccxeu5eQ2pEdTe7UvyQNbbE9XXdeLKdi&street=Hanschara%20M%20D%20High%20School&city=chandipur&state=wb&postalCode=721625`)
            console.log(res)
        }
        datafet()

    }, [])
    
    return (
        <>
        <div className="home">
            <div className="container">
                <div className="row">
                    <div className="col-md-6 col-12 mb-3 mx-auto">
                        <h1>Welcome to <span>GreenX World</span> </h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque, quos.</p>
                        <button className="btn btn-outline-success">Read More</button>

                    </div>
                    <div className="col-md-6 col-12 mb-3 mx-auto">
                        <img src="../img/one.svg" alt="home " className="img-fluid main-img" />
                        
                        </div>
                </div>
            </div>
        </div>
            <AllProducts/>
            <div className="desc">
                <div className="container-fluid">
                    <div className="row">
                <div className="col-md-6 col-12 mx-auto mb-3 ">
                    <img src="../img/envv.svg" alt="ok" className="img-fluid side-img" />
                </div>
                    <div className=" col-md-6 col-12 mx-auto mb-3 d-flex justify-content-center align-items-center flex-column">
                    <h1>Welcome to <span>GreenX World</span> </h1>
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Placeat cupiditate aspernatur, aperiam consequatur fugiat nisi! At labore corrupti, non vitae libero obcaecati, necessitatibus, odio facilis aliquid odit nulla porro itaque.</p>
                        <button className="btn btn-outline-success">Read More</button>
                    </div>
                </div>
                </div>
            </div>
        </>
    )
}

export default Home
