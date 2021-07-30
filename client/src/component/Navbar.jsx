import React, { useContext } from 'react'
import './Navbar.css'
import { NavLink } from 'react-router-dom'
import { DataContext } from '../context/DataContext'

const Navbar = () => {
  const {cart}=useContext(DataContext)
  // console.log(cart)
  
    return (
        <>
            <div className="code-nav">
            <nav>
      <input type="checkbox" id="check" />
      <label for="check" className="checkbtn">
        <i className="fa fa-bars"></i>
      </label>
      <label className="logo">
      <NavLink to="/home">GreenX</NavLink>
      </label>
      <ul>
        <li><NavLink  to="/home"  >Home</NavLink></li>
        <li><NavLink to="/Products">Products</NavLink></li>
       
        <li><NavLink to="/contact">Contact</NavLink></li>
        <li><NavLink to="/cart" className="cart-box">Cart <span>{cart.length}</span> </NavLink></li>
        <li><NavLink to="/myaccount" >User </NavLink></li>
      </ul>
    </nav>
            </div>
            
        </>
    )
}

export default Navbar
