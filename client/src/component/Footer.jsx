import React from 'react'
import { NavLink } from 'react-router-dom'
import '../App.css'
const Footer = () => {
    return (
        <>
        <footer>
            <div className="container">
                <div className="row">
                <div className="col-md-6 col-12 mx-auto mb-3 text-center p-3">
                    <h2>NavLinks</h2>
                    <hr />
                        <ul>
                            <li className="foot-link">
                                <NavLink to="">Home</NavLink>
                            </li>
                            <li className="foot-link">
                                <NavLink to="">Products</NavLink>
                            </li>
                            <li className="foot-link">
                                <NavLink to="">Contact</NavLink>
                            </li>
                        </ul>
                        </div>
                    <div className="col-md-6 col-12 mx-auto mb-3">
                                <img src="../img/two.svg" alt="box" className="img-fluid foot-img" />
                    </div>
                    
                </div>
            </div>

        </footer>
            
        </>
    )
}

export default Footer
