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
import UpdateCourse from "./AdminDashBoard/UpdateCourse";
import AddStudent from "./AdminDashBoard/AddStudent";
import ViewStudent from "./AdminDashBoard/ViewStudents";
import UpdateStudent from "./AdminDashBoard/UpdateStudent";
import AddTest from "./AdminDashBoard/AddTest";
import ViewTest from "./AdminDashBoard/ViewTest";
import CreatePaperSet from "./AdminDashBoard/CreatePaperSet";
import AddQuestion from "./AdminDashBoard/AddQuestion";
import Student from "./StudentDashboard/Student";
import StudentProfile from "./StudentDashboard/StudentProfile";
import AddBatch from "./AdminDashBoard/AddBatch";
import ViewBatch from "./AdminDashBoard/ViewBatch";



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
        <Route path="/addcourse" element={<><AdminDashboard /><AddCourse /></>} />
        <Route path="/viewcourses" element={<><AdminDashboard /><ViewCourse /></>} />
        <Route path="/UpdateCourse/:id" element={<><AdminDashboard /><UpdateCourse /></>} />
        <Route path="/addstudent" element={<><AdminDashboard /><AddStudent /></>} />
        <Route path="/viewstudents" element={<><AdminDashboard /><ViewStudent /></>} />
        <Route path="/updatestudent/:id" element={<><AdminDashboard /><UpdateStudent /></>} />
        <Route path="/addtest" element={<><AdminDashboard /><AddTest /></>} />
        <Route path="/viewtests" element={<><AdminDashboard /><ViewTest /></>} />
        <Route path="/createpaperset" element={<><AdminDashboard /><CreatePaperSet /></>} />
        <Route path="/addquestion" element={<><AdminDashboard /><AddQuestion /></>} />
        <Route path="/addbatch" element={<><AdminDashboard/><AddBatch/></>} />
        <Route path="/viewbatch" element={<><AdminDashboard/><ViewBatch/></>} />




        <Route path="/student" element={<Student />} />
        <Route path="/student/profile/:username" element={<><Student/><StudentProfile /></>} />

      </Routes>
    </Router>
  );
}

export default App;
