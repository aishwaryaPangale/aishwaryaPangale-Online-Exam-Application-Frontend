import React from "react";
import { NavLink } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow sticky-top">
      <div className="container">
        <a className="navbar-brand" href="#">
          <img src="src/Images/download-removebg-preview.png" alt="Logo" height="60" />
        </a>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav ms-auto">

            <li className="nav-item">
              <NavLink to="/" className="nav-link">Home</NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/about" className="nav-link">About</NavLink>
            </li>

            {/* Dropdown Menu */}
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                Profile
              </a>
              <ul className="dropdown-menu dropdown-menu-dark">

                <li>
                  <NavLink to="/alogin" className="dropdown-item">Admin</NavLink>
                </li>

                <li><hr className="dropdown-divider" /></li>

                <li className="dropdown">
                  <a className="dropdown-item dropdown-toggle" href="#" data-bs-toggle="dropdown">
                    Student
                  </a>
                  {/* Nested dropdowns are NOT supported directly in Bootstrap 5, so this won't work unless custom JS is added. Instead: */}
                  <ul className="dropdown-menu dropdown-menu-dark">
                    <li>
                      <NavLink to="/login" className="dropdown-item">Login</NavLink>
                    </li>
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                      <NavLink to="/reg" className="dropdown-item">Register</NavLink>
                    </li>
                  </ul>
                </li>

              </ul>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
