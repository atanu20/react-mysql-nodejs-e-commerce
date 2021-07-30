import React from 'react'
import { useHistory } from 'react-router-dom'

const CardProducts = ({id,name,price,plant_image}) => {
   const his= useHistory()
    return (
        <>
        <div className="col-lg-4 col-md-6 col-12  mb-3 products-p">
            <div className="card p-2">
                <img src={`../img/${plant_image}`} alt="tree" className="img-fluid p-img" />
                <div className="overlay">
                    <div className="price">
                        <p>{name} </p>
                        <p>{price}.00</p>
                    </div>
                    <div className="text-center">
                        {/* <button className="btn btn-info ml-1 mr-1">Add To Cart</button> */}
                        <button className="btn btn-info ml-1 mr-1" onClick={()=>his.push(`/details/${id}`)}>View Details</button>
                    </div>

                </div>
            </div>
        </div>
            
        </>
    )
}

export default CardProducts
