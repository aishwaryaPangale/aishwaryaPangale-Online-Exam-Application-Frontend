import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Component/Home";
import Register from "./Component/Register";
import Login from "./Component/Login";
import About from "./Component/About";
import "./index.css";
import AdminDashboard from "./AdminDashBoard/AdminDashboard";

import ForgotPassword from "./Component/ForgotPassword";
import AdminLogin from "./AdminDashBoard/AdminLogin"
import Navbar from "./Component/Navbar";
import UpdateCourse from "./AdminDashBoard/UpdateCourse";

import UpdateStudent from "./AdminDashBoard/UpdateStudent";


import StudentProfile from "./StudentDashboard/StudentProfile";

import AvailableTests from "./StudentDashboard/AvailableTest";
import Course from "./AdminDashBoard/Course";
import Batch from "./AdminDashBoard/Batch";
import StudentDashboard from "./StudentDashboard/StudentDashboard";
import Student from "./AdminDashBoard/Student";
import Test from "./AdminDashBoard/Test";
import StartTest from "./StudentDashboard/StartTest";
import TestResult from "./StudentDashboard/TestResult";
import StudentReport from "./StudentDashboard/StudentReport";



function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Navbar />} />
        <Route path="/" element={<><Navbar /><Home /></>} />
        <Route path="/about" element={<><Navbar /><About /></>} />
        <Route path="/reg" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route path="alogin" element={<AdminLogin />} />

        <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/Course" element={<><AdminDashboard/><Course/></>}/>
       
           <Route path="/UpdateCourse/:id" element={<><AdminDashboard /><UpdateCourse /></>} />
        <Route path="/Batch" element={<><AdminDashboard/><Batch/></>}/>
      <Route path="/Student" element={<><AdminDashboard/><Student/></>}/>
       <Route path="/updatestudent/:id" element={<><AdminDashboard /><UpdateStudent /></>} />
       <Route path="/test" element={<><AdminDashboard/><Test/></>}/>
  



        <Route path="/studentDashboard" element={<StudentDashboard />} />
        <Route path="/studentDashboard/profile/:username" element={<><StudentDashboard/><StudentProfile /></>} />
        <Route path="/studentDashboard/tests" element={<><StudentDashboard/><AvailableTests/></>}/>
        <Route path="/startTest/:testId" element={<><StudentDashboard/><StartTest/></>}/>
        <Route path="/studentDashboard/testResult" element={<><StudentDashboard/><TestResult/></>}/>
        <Route path="/studentDashboard/studentReport" element={<><StudentDashboard/><StudentReport/></>}/>
      </Routes>
    </Router>
  );
}

export default App;
