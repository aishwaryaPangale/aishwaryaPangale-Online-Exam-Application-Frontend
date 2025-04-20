import React from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  FaHome, FaBook, FaClipboardList, FaUserGraduate,
  FaChartBar, FaSignOutAlt
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const AdminDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const username = localStorage.getItem("adminUsername");

  const handleLogout = () => {
    localStorage.removeItem("adminUsername");
    navigate("/");
  };

  return (
    <div className="d-flex flex-column vh-100">
      {/* Internal styles for hover */}
      <style>
        {`
          .nav-link:hover {
            // background-color: #343a40;
            color: white !important;
            border-radius: 5px;
        }
        `}
      </style>

      {/* Header */}
      <header className="bg-dark text-light d-flex justify-content-between align-items-center px-4 py-2 shadow">
        <h4 className="m-0">Admin Dashboard</h4>
        <span><strong>{username || "Admin"}</strong></span>
      </header>

      {/* Layout */}
      <div className="d-flex flex-grow-1">
        {/* Sidebar */}
        <aside style={{ width: "250px", backgroundColor: "lightGray" }} className="text-white p-3">
          <div className="text-center mb-4">
            <img
              src="https://www.w3schools.com/howto/img_avatar.png"
              className="rounded-circle border"
              width="80"
              height="80"
              alt="Admin"
            />
            <h6 className="mt-2 text-dark">Welcome, Admin</h6>
          </div>
          <ul className="nav flex-column">
            <li className="nav-item mb-2">
              <NavLink to="/admin" className="nav-link text-dark">
                <FaHome className="me-2" /> Home
              </NavLink>
            </li>
            <li className="nav-item mb-2">
              <NavLink to="/Course" className="nav-link text-dark">
                <FaBook className="me-2" /> Courses
              </NavLink>
            </li>
            <li className="nav-item mb-2">
              <NavLink to="/Batch" className="nav-link text-dark">
                <FaClipboardList className="me-2" /> Batches
              </NavLink>
            </li>
            <li className="nav-item mb-2">
              <NavLink to="/Student" className="nav-link text-dark">
                <FaUserGraduate className="me-2" /> Students
              </NavLink>
            </li>
            <li className="nav-item mb-2">
              <NavLink to="/test" className="nav-link text-dark">
                <FaClipboardList className="me-2" /> Tests
              </NavLink>
            </li>
            <li className="nav-item mb-2">
              <NavLink to="/reports" className="nav-link text-dark">
                <FaChartBar className="me-2" /> Reports
              </NavLink>
            </li>
            <li className="nav-item mt-3">
              <button onClick={handleLogout} className="btn btn-link nav-link text-danger text-start fs-4">
                <FaSignOutAlt className="me-2" /> Logout
              </button>
            </li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="flex-grow-1 p-4" style={{ backgroundColor: "#f8f9fa" }}>
          {location.pathname === "/admin" ? (
            <div className="text-center mt-5">
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
