import React, { useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
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

  const [showSidebar, setShowSidebar] = useState(true);
  const location = useLocation();

  const toggleDropdown = (section) => {
    setDropdowns((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="admin-dashboard-container d-flex flex-column vh-100">
      {/* Header */}
      <header className="bg-dark text-white d-flex justify-content-between align-items-center px-4 py-2 shadow position-sticky top-0" style={{ height: "56px" }}>
        <div className="d-flex align-items-center">
          <button className="btn btn-outline-light me-3" onClick={() => setShowSidebar(!showSidebar)}>
            <FaBars />
          </button>
          <h4 className="m-0">Admin Dashboard</h4>
        </div>
        <span><strong>aishwaryapanagle0@gmail.com</strong></span>
      </header>

      {/* Main layout: Sidebar + Content */}
      <div className="d-flex flex-grow-1">
        {/* Sidebar */}
        <nav
          className={`shadow-sm p-3 ${showSidebar ? "d-block" : "d-none"}`}
          style={{
            width: "250px",
            overflowY: "auto",
            backgroundColor: "#f1f3f5"
          }}
        >
          <div className="text-center mb-5">
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
              <NavLink to="/admin" className="nav-link text-dark"><FaHome className="me-2" /> Home</NavLink>
            </li>

            {/* Course */}
            <li className="nav-item">
              <div className="nav-link text-dark d-flex justify-content-between align-items-center" onClick={() => toggleDropdown("course")} style={{ cursor: "pointer" }}>
                <span><FaBook className="me-2" /> Course</span>
                <span style={{ transform: dropdowns.course ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>▼</span>
              </div>
              {dropdowns.course && (
                <ul className="nav flex-column ms-3" style={{ fontSize: "0.85em" }}>
                  <li><NavLink to="/addcourse" className="nav-link">Add Course</NavLink></li>
                  <li><NavLink to="/viewcourses" className="nav-link">View Courses</NavLink></li>
                </ul>
              )}
            </li>

            {/* Student */}
            <li className="nav-item mt-2">
              <div className="nav-link text-dark d-flex justify-content-between align-items-center" onClick={() => toggleDropdown("student")} style={{ cursor: "pointer" }}>
                <span><FaUserGraduate className="me-2" /> Student</span>
                <span style={{ transform: dropdowns.student ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>▼</span>
              </div>
              {dropdowns.student && (
                <ul className="nav flex-column ms-2" style={{ fontSize: "0.85em" }}>
                  <li><NavLink to="/addstudent" className="nav-link">Add Student</NavLink></li>
                  <li><NavLink to="/viewstudents" className="nav-link">View Students</NavLink></li>
                </ul>
              )}
            </li>

            {/* Test */}
            <li className="nav-item mt-2">
              <div className="nav-link text-dark d-flex justify-content-between align-items-center" onClick={() => toggleDropdown("test")} style={{ cursor: "pointer" }}>
                <span><FaClipboardList className="me-2" /> Test</span>
                <span style={{ transform: dropdowns.test ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>▼</span>
              </div>
              {dropdowns.test && (
                <ul className="nav flex-column ms-3" style={{ fontSize: "0.85em" }}>
                  <li><NavLink to="/addtest" className="nav-link">Add Test</NavLink></li>
                  <li><NavLink to="/viewtests" className="nav-link">View Tests</NavLink></li>
                  <li><NavLink to="/addquestion" className="nav-link    fs-6 ">Add Question</NavLink></li>
                  <li><NavLink to="/createpaperset" className="nav-link">Paper set</NavLink></li>

                </ul>
              )}
            </li>

            {/* Reports */}
            <li className="nav-item mt-3">
              <NavLink to="/reports" className="nav-link text-dark"><FaChartBar className="me-2" /> Reports</NavLink>
            </li>

            {/* Logout */}
            <li className="nav-item mt-2">
              <NavLink to="/" className="nav-link text-danger"><FaSignOutAlt className="me-2" /> Logout</NavLink>
            </li>
          </ul>
        </nav>

        {/* Main Content */}
        <main className="flex-grow-1 p-4 overflow-auto" style={{ backgroundColor: "#f8f9fa" }}>
          {location.pathname === "/admin" ? (
            <div className="text-center mt-4">
              <h2>Welcome to Admin Dashboard</h2>
              <p className="text-muted">Select an option from the sidebar to continue.</p>
            </div>
          ) : (
            <Outlet />
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
