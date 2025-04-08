import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Component/Home";
import Register from "./Component/Register";
import Login from "./Component/Login";
import About from "./Component/About";
import "./index.css";
import AdminDashboard from "./AdminDashBoard/AdminDashboard";
import AddCourse from "./AdminDashBoard/AddCourse";
 import ViewCourse from "./AdminDashBoard/ViewCourse";
import ForgotPassword from "./Component/ForgotPassword";
import AdminLogin from "./AdminDashBoard/AdminLogin"
import Navbar from "./Component/Navbar";



function App() {
  return (
    <Router>
      <Routes>
        <Route  element={<Navbar/>}/>
        <Route path="/" element={<><Navbar/><Home/></>} />
        <Route path="/about" element={<><Navbar/><About/></>}/>
        <Route path="/reg" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route path="alogin" element={<AdminLogin/>}/>
      
        <Route path="/admin" element={<AdminDashboard/>}/>
        <Route path="/addcourse" element={<><AdminDashboard /><AddCourse /></>} />
        <Route path="/viewcourses" element={<><AdminDashboard /><ViewCourse /></>} />



      </Routes>
    </Router>
  );
}

export default App;
