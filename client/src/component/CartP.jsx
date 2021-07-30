import React, { useContext } from 'react'
import { DataContext } from '../context/DataContext'
const CartP = ({id,name,price,plant_image,qty}) => {
    const {cart,setCart}= useContext(DataContext)
    const deleteProduct=(id)=>{
        const exist=cart.find((x)=>x.id===id)
        if(exist)
        {
           setCart(
               cart.filter((x)=>x.id !==id)
           )
            // console.log(`pre ${id}`)
        }
        
    }
    return (
        <>
         <div className="col-lg-4 col-md-6 col-12  mb-3">
                        <div className="card">
                            <img src={`../img/${plant_image}`} alt={plant_image} className="img-fluid cart-img" />
                            <div className="p-3">
                                <div className="cartbox">
                                    <div>
                                        <p>{name}</p>
                                        <p>({price}.00) * ({qty})</p>
                                       
                                             
                                    </div>
                                    <div>
                                        <br />
                                        <p> {price*qty}.00</p>
                                    </div>

                                </div>
                                <div className="text-right">
                                <button className="btn btn-info" onClick={()=>deleteProduct(id)}>Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
            
        </>
    )
}

export default CartP
