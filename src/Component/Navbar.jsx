import React from "react";
import { NavLink } from "react-router-dom";


const Navbar=()=>{
    return(
        <>
        <nav className="navbar navbar-expand-lg navbar-dark static-top shadow p-3 rounded sticky-top">
          <div className="container">
            <a className="navbar-brand" href="#">
              <img src="src/Images/download-removebg-preview.png" alt="..." height="60" />
            </a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  {/* <a className="nav-link" aria-current="page" href="#" >Home</a> */}
                  <NavLink to='/' className='navlink'>Home</NavLink> 
                </li>
                <li className="nav-item">
                  <NavLink to='/about' className='navlink'>About</NavLink>
                </li>
                
                <li className="nav-item dropdown">
                <NavLink  className="nav-link dropdown-toggle text-light" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Profile</NavLink>                      

                  <ul className="dropdown-menu bg-dark">

                    {/* Admin Submenu */}
                    <li className="dropdown-submenu dropend">
                       <NavLink  className="nav-link text-light" to="/login" role="button"  aria-expanded="false">Admin</NavLink>                      
                         {/* <ul className="dropdown-menu bg-dark">
                            <li><NavLink className="dropdown-item text-light" to="/admin/login"> Login</NavLink></li>
                           <li><hr className="dropdown-divider" /></li>
                           <li><NavLink className="dropdown-item text-light" to="/admin/register">Register</NavLink></li>
                          </ul> */}
                   </li>

                   <li><hr className="dropdown-divider" /></li>

                    {/* Student Submenu */}
                    <li className="dropdown-submenu dropend">
                    <NavLink  className="nav-link dropdown-toggle text-light" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Student</NavLink>                      
                    <ul className="dropdown-menu bg-dark">
                         <li><NavLink className="dropdown-item text-light" to="/login">Login</NavLink></li>
                         <li><hr className="dropdown-divider" /></li>
                         <li><NavLink className="dropdown-item text-light" to="/reg">Register</NavLink></li>
                      </ul>
                    </li>

                 </ul>
              </li>

              </ul>
            </div>
          </div>
        </nav>

        </>
    )
}
export default Navbar;