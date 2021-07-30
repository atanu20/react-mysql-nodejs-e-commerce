import React,{useEffect,useState,useRef} from 'react'
import axios from 'axios'
import CardProducts from '../component/CardProducts'
// import { DataContext } from '../context/DataContext'
import { useHistory } from 'react-router-dom'
const Products = () => {
    const [getdata, setGetdata] = useState([])

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
        timeout.current=setTimeout(checkAuth,1000)
        return function(){
            if(timeout.current)
            {
                clearTimeout(timeout.current)
            }
        }
        
 
     },[])

    
    const getData= async ()=>{

        const res=await axios.get('http://localhost:8000/getdataall')
        setGetdata(res.data)
    }
    useEffect(() => {
       getData()
    }, [])

    const sortData= async (sort)=>{
            const res=await axios.get(`http://localhost:8000/sort/${sort}`)
            setGetdata(res.data)
    }
    const sortHandel=(e)=>{
        const sort=e.target.value
        if(sort==='all')
        {
           getData()
        }
        else {
            sortData(sort)
        }

       }

    if(!getdata.length)
   {
       return <h1>Loading..</h1>
   }

    return (
        <>
         <div className="products">
            <div className="container">
                <h2 className="text-center font-weight-bold mb-5">Best Products</h2>
              <div className="inp ">
                    <p></p>
                <div className="form-group">
                   
                    <select className="form-control" id="" onChange={sortHandel}>
                        {/* <option value="" selected disabled hidden>Choose By Price</option> */}
                        <option  value="all">All</option>
                        <option  value="200">less then 200</option>
                        <option  value="200_500">200-500</option>
                        <option  value="500_1000">500-1000</option>
                        
                       
                    </select>
                    </div>
              </div>
                <div className="row">
                    {
                        getdata.map((val,ind)=>{
                            return(
                                <>
                            <CardProducts
                        key={ind}
                        id={val.id}
                        name={val.name}
                        price={val.price}
                        plant_image={val.plant_image}
                        />
                                </>
                            )
                        })
                    }
                        
                        
                        
                </div>
            </div>
        </div>
        
            
        </>
    )
}

export default Products
