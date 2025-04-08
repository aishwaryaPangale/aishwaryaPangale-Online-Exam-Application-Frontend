import React from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css" integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg==" crossorigin="anonymous" referrerpolicy="no-referrer" />



let About = () => {
  const navigate = useNavigate(); // ✅ Fix: use useNavigate()

  return (
    <>
     

    {/* <div className="box w-100 d-flex justify-content-center gap-4 " style={{border:"1px solid blck", height:"150px"}} >
        <div class="card shadow-lg" style={{width: "20rem"}}>
            <i class="fa-solid fa-graduation-cap" style={{width:"200px", height:"100px"}}></i>
             <img src="\src\Images\missionLogo.png" class="card-img-top" alt="..." height="px" width="px"/> 
           <div class="card-body">
              <p class="card-text">We provide a secure, reliable, and user-friendly exam platform.</p>
            </div>
        </div>

         <div class="card shadow-lg" style={{width: "20rem"}}>
            <img src="..." class="card-img-top" alt="..."/>
            <div class="card-body">
               <p class="card-text">To lead the future of digital academic assessments globally.</p>
            </div>
         </div>

          <div class="card shadow-lg" style={{width: "20rem"}}>
             <img src="..." class="card-img-top" alt="..."/>
            <div class="card-body">
               <p class="card-text">Our focus is on security, scalability, and continuous innovation..</p>
            </div>
          </div>
     </div> */}

      {/* <div className="about-info w-100" style={{border:"1px solid black", marginTop:"120px"}}> */}
           <div className="row1 d-flex w-100 p-5"> 
               <div className="col1 w-50 shadow-lg p-4 ">
                   <p className="fw-bolder opacity-50">About us</p>
                   <h1 className="fw-semibold opacity-75">Welcome to the Application- all available Online Exam</h1>
                   <p className="mt-4 fw-normal opacity-75">Welcome to the Online Exam Application System, a modern solution designed to streamline and simplify the process of conducting examinations online. Our platform provides a secure, efficient, and user-friendly environment for students, educators, and administrators.</p>
               </div>
               
               <div className="col1 w-50">
                  <img src="src\Images\educ1.jpg" alt="" style={{width:"600px", height:"400px"}}/>
               </div>
           </div>
      {/* </div> */}

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

    </>);
};
export default About;