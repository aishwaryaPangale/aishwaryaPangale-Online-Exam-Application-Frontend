import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaBook, FaUserGraduate, FaClipboardList,
  FaSignOutAlt, FaChartBar, FaHome, FaBars
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const AdminDashboard = () => {
  const [dropdowns, setDropdowns] = useState({
    course: false,
    student: false,
    test: false,
  });

  const [showSidebar, setShowSidebar] = useState(false);

  const toggleDropdown = (section) => {
    setDropdowns((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="container-fluid p-0">
      {/* Header */}
      <header className="bg-dark text-white d-flex justify-content-between align-items-center px-4 py-2 shadow">
        <div className="d-flex align-items-center">
          {/* Hamburger Toggle Button for Small Screens */}
          <button
            className="btn btn-outline-light d-md-none me-3"
            onClick={() => setShowSidebar(!showSidebar)}
          >
            <FaBars />
          </button>
          <h4 className="m-0">Admin Dashboard</h4>
        </div>
        <span><strong>aishwaryapanagle0@gmail.com</strong></span>
      </header>

      {/* Main Layout */}
      <div className="row no-gutters">
        {/* Sidebar */}
        <nav className={`col-md-3 col-lg-2 bg-light sidebar p-3 shadow-sm min-vh-100 ${showSidebar ? "d-block" : "d-none"} d-md-block`}>
          <div className="text-center mb-4">
            <img
              src="https://www.w3schools.com/howto/img_avatar.png"
              className="rounded-circle"
              width="80"
              height="80"
              alt="Admin"
            />
            <h5 className="mt-2">Admin</h5>
          </div>

          <ul className="nav flex-column">
            <li className="nav-item mb-2">
              <NavLink to="/home" className="nav-link text-dark">
                <FaHome className="me-2" /> Home
              </NavLink>
            </li>

            {/* Course Dropdown */}
            <li className="nav-item">
              <div
                className="nav-link text-dark d-flex justify-content-between align-items-center"
                onClick={() => toggleDropdown("course")}
                style={{ cursor: "pointer" }}
              >
                <span><FaBook className="me-2" /> Course</span>
                <span>▼</span>
              </div>
              {dropdowns.course && (
                <ul className="nav flex-column ms-3">
                  <li><NavLink to="/addcourse" className="nav-link">Add Course</NavLink></li>
                  <li><NavLink to="/viewcourses" className="nav-link">View Courses</NavLink></li>
                  <li><NavLink to="/updatecourse" className="nav-link">Update Course</NavLink></li>
                  <li><NavLink to="/deletecourse" className="nav-link">Delete Course</NavLink></li>
                  <li><NavLink to="/searchcourse" className="nav-link">Search Course</NavLink></li>
                </ul>
              )}
            </li>

            {/* Student Dropdown */}
            <li className="nav-item mt-2">
              <div
                className="nav-link text-dark d-flex justify-content-between align-items-center"
                onClick={() => toggleDropdown("student")}
                style={{ cursor: "pointer" }}
              >
                <span><FaUserGraduate className="me-2" /> Student</span>
                <span>▼</span>
              </div>
              {dropdowns.student && (
                <ul className="nav flex-column ms-3">
                  <li><NavLink to="/addstudent" className="nav-link">Add Student</NavLink></li>
                  <li><NavLink to="/viewstudents" className="nav-link">View Students</NavLink></li>
                  <li><NavLink to="/updatestudent" className="nav-link">Update Student</NavLink></li>
                  <li><NavLink to="/deletestudent" className="nav-link">Delete Student</NavLink></li>
                  <li><NavLink to="/searchstudent" className="nav-link">Search Student</NavLink></li>
                </ul>
              )}
            </li>

            {/* Test Dropdown */}
            <li className="nav-item mt-2">
              <div
                className="nav-link text-dark d-flex justify-content-between align-items-center"
                onClick={() => toggleDropdown("test")}
                style={{ cursor: "pointer" }}
              >
                <span><FaClipboardList className="me-2" /> Test</span>
                <span>▼</span>
              </div>
              {dropdowns.test && (
                <ul className="nav flex-column ms-3">
                  <li><NavLink to="/addtest" className="nav-link">Add Test</NavLink></li>
                  <li><NavLink to="/viewtests" className="nav-link">View Tests</NavLink></li>
                  <li><NavLink to="/searchtest" className="nav-link">Search Test</NavLink></li>
                </ul>
              )}
            </li>

            {/* Reports */}
            <li className="nav-item mt-3">
              <NavLink to="/reports" className="nav-link text-dark">
                <FaChartBar className="me-2" /> Reports
              </NavLink>
            </li>

            {/* Logout */}
            <li className="nav-item mt-2">
              <NavLink to="/logout" className="nav-link text-danger">
                <FaSignOutAlt className="me-2" /> Logout
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Content Area */}
        <main className="col-md-9 col-lg-10 p-4">
          <div className="text-center">
            <h2>Welcome to Admin Dashboard</h2>
            <p className="text-muted">Select an option from the sidebar to continue.</p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
