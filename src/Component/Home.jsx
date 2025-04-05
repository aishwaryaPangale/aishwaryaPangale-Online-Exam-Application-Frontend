import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";


let Home = () => {
  const navigate = useNavigate(); // ✅ Fix: use useNavigate()

  return (
    <>
      <div className="main-Home">
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
                  <a className="nav-link" aria-current="page" href="#" >Home</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="" onClick={() => navigate("/about")}>About</a>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Course
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                    <li><a className="dropdown-item text-dark" href="#">C</a></li>
                    <li><a className="dropdown-item text-dark" href="#">Java</a></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><a className="dropdown-item text-dark" href="#">Aptitude</a></li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <section>
          <div className="container">
            <h1>Online Learning Now <br />in Your Hand</h1>
            <p>Online Education is a form of education where students use <br />their home computers through the internet.</p>
            <button className="btn btn-warning p-2 m-1 text-light" onClick={() => navigate("/reg")}>Register</button>
            <button className="btn btn-success p-2 m-2">Login</button>
          </div>
          <img src="src/Images/boss.png" alt="" />
        </section>

        <div className="Category">
      <h1>Featured Category</h1>
      <p>Some of the featured exam categories are listed here to view category</p>
<div className="cardimg">
<div class="card shadow-lg" style={{width:"18rem"}} >
  <img src="src\Images\c_cpp.jpg" class="card-img-top" alt="..." height="200px" width="100px" />
  <div class="card-body">
    <h3>C Programing</h3>
    <p>Exam</p>
      </div>
</div>
<div class="card shadow-lg" style={{width:"18rem"}}>
  <img src="src\Images\java.jpg" alt="" width="250px"/>
  <div class="card-body">
      <h3 class="mt-3">Programing</h3>
      <p>Exam</p>
   </div>
</div>
<div class="card shadow-lg" style={{width:"18rem"}}>
  <img src="src\Images\Apti.png" class="card-img-top" alt="..."/>
  <div class="card-body">
      <h3  class="mt-3">Aptitude</h3>
      <p>Exam</p>
  </div>
</div>
</div>
</div>
        <div className="container-fluid p-5 bg-black">
          <div className="footer text-light">
            <div className="row">
              <div className="col">
                <h4>About</h4>
                <p>A Secure Online Exam Application System platform for students.</p>
              </div>
              <div className="col">
                <h4>Contact Support</h4>
                <ul>
                  <li><a href="">Email: abc12@gmail.com</a></li>
                  <li><a href="">Contact: 1234567891</a></li>
                </ul>
              </div>
              <div className="col">
                <h4>Quick Links</h4>
                <ul>
                  <li><a href="">Dashboard</a></li>
                  <li><a href="">Exam Rules</a></li>
                  <li><a href="">Results</a></li>
                  <li><a href="">FAQ</a></li>
                </ul>
              </div>
              <div className="col">
                <h4>Follow Us</h4>
                <div className="social-links">
                  <a href=""><i className="fa-brands fa-square-instagram"></i></a>
                  <a href=""><i className="fa-brands fa-twitter"></i></a>
                  <a href=""><i className="fa-brands fa-linkedin"></i></a>
                  <a href=""><i className="fa-brands fa-facebook"></i></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
