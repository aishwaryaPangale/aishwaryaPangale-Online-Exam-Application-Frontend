import React, { useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  FaBook, FaUserGraduate, FaClipboardList,
  FaSignOutAlt, FaChartBar, FaHome, FaBars
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const AdminDashboard = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [showSidebar, setShowSidebar] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const username = localStorage.getItem("adminUsername");

  const toggleDropdown = (section) => {
    setActiveDropdown((prev) => (prev === section ? null : section));
  };

  const handleLogout = () => {
    localStorage.removeItem("adminUsername");
    navigate("/");
  };

  return (
    <div className="admin-dashboard-container d-flex flex-column vh-100">
      <header className="bg-dark text-white d-flex justify-content-between align-items-center px-4 py-2 shadow position-sticky top-0" style={{ height: "56px", zIndex: 1000 }}>
        <div className="d-flex align-items-center">
          <button className="btn btn-outline-light me-3" onClick={() => setShowSidebar(!showSidebar)}>
            <FaBars />
          </button>
          <h4 className="m-0">Admin Dashboard</h4>
        </div>
        <span><strong>{username || "Admin"}</strong></span>
      </header>

      <div className="d-flex flex-grow-1">
        <nav
          className={`shadow-sm p-3 ${showSidebar ? "d-block" : "d-none"} bg-white`}
          style={{
            width: "250px",
            overflowY: "auto",
            borderRight: "1px solid #dee2e6",
            transition: "all 0.3s ease"
          }}
        >
          <div className="text-center mb-4">
            <img
              src="https://www.w3schools.com/howto/img_avatar.png"
              className="rounded-circle border"
              width="80"
              height="80"
              alt="Admin"
            />
            <h6 className="mt-2 text-light opacity-75">Welcome, Admin</h6>
          </div>

          <ul className="nav flex-column">
            <li className="nav-item mb-2">
              <NavLink to="/admin" className="nav-link text-dark fw-semibold">
                <FaHome className="me-2" /> Home
              </NavLink>
            </li>

            {/* Course */}
            <li className="nav-item">
              <div
                className="nav-link text-dark fw-semibold d-flex justify-content-between align-items-center"
                onClick={() => toggleDropdown("course")}
                style={{ cursor: "pointer" }}
              >
                <span><FaBook className="me-2" /> Course</span>
                <span style={{
                  transform: activeDropdown === "course" ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.3s"
                }}>▼</span>
              </div>
              {activeDropdown === "course" && (
                <ul className="nav flex-column ms-3 border-start ps-2" style={{ fontSize: "0.8em" }}>
                  <li><NavLink to="/addcourse" className="nav-link text-light opacity-75">Add Course</NavLink></li>
                  <li><NavLink to="/viewcourses" className="nav-link text-light opacity-75">View Courses</NavLink></li>
                </ul>
              )}
            </li>
            {/* Batch */}
            <li className="nav-item mt-2">
              <div
                className="nav-link text-dark fw-semibold d-flex justify-content-between align-items-center"
                onClick={() => toggleDropdown("batch")}
                style={{ cursor: "pointer" }}
              >
                <span><FaClipboardList className="me-2" /> Batch</span>
                <span style={{
                  transform: activeDropdown === "batch" ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.3s"
                }}>▼</span>
              </div>
              {activeDropdown === "batch" && (
                <ul className="nav flex-column ms-3 border-start ps-2" style={{ fontSize: "0.8em" }}>
                  <li><NavLink to="/addbatch" className="nav-link text-light opacity-75">Add Batch</NavLink></li>
                  <li><NavLink to="/viewbatch" className="nav-link text-light opacity-75">View Batch</NavLink></li>
                </ul>
              )}
            </li>

            {/* Student */}
            <li className="nav-item mt-2">
              <div
                className="nav-link text-dark fw-semibold d-flex justify-content-between align-items-center"
                onClick={() => toggleDropdown("student")}
                style={{ cursor: "pointer" }}
              >
                <span><FaUserGraduate className="me-2" /> Student</span>
                <span style={{
                  transform: activeDropdown === "student" ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.3s"
                }}>▼</span>
              </div>
              {activeDropdown === "student" && (
                <ul className="nav flex-column ms-3 border-start ps-2" style={{ fontSize: "0.8em" }}>
                  <li><NavLink to="/addstudent" className="nav-link text-light opacity-75">Add Student</NavLink></li>
                  <li><NavLink to="/viewstudents" className="nav-link text-light opacity-75">View Students</NavLink></li>
                </ul>
              )}
            </li>

            {/* Test */}
            <li className="nav-item mt-2">
              <div
                className="nav-link text-dark fw-semibold d-flex justify-content-between align-items-center"
                onClick={() => toggleDropdown("test")}
                style={{ cursor: "pointer" }}
              >
                <span><FaClipboardList className="me-2" /> Test</span>
                <span style={{
                  transform: activeDropdown === "test" ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.3s"
                }}>▼</span>
              </div>
              {activeDropdown === "test" && (
                <ul className="nav flex-column ms-3 border-start ps-2" style={{ fontSize: "0.8em" }}>
                  <li><NavLink to="/addtest" className="nav-link text-light opacity-75">Add Test</NavLink></li>
                  <li><NavLink to="/viewtests" className="nav-link text-light opacity-75">View Tests</NavLink></li>
                  <li><NavLink to="/addquestion" className="nav-link text-light opacity-75">Add Question</NavLink></li>
                  <li><NavLink to="/createpaperset" className="nav-link text-light opacity-75">Paper Set</NavLink></li>
                </ul>
              )}
            </li>

            <li className="nav-item mt-3">
              <NavLink to="/reports" className="nav-link text-dark fw-semibold">
                <FaChartBar className="me-2" /> Reports
              </NavLink>
            </li>

            <li className="nav-item mt-2">
              <button
                onClick={handleLogout}
                className="nav-link text-danger btn btn-link text-start fw-semibold"
              >
                <FaSignOutAlt className="me-2" /> Logout
              </button>
            </li>
          </ul>
        </nav>

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
