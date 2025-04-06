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


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/reg" element={<Register />} />

        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard/>}/>
        {/* <Route path="/addCourse" element={<AddCourse/>}/>
        <Route path="/viewCourse" element={<ViewCourse/>}/> */}

        <Route path="/about" element={<About/>}/>

      </Routes>
    </Router>
  );
}

export default App;
