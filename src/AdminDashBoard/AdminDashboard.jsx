import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { FaUsers, FaBookOpen, FaLayerGroup } from "react-icons/fa";
import {
  FaHome, FaBook, FaClipboardList, FaUserGraduate,
  FaChartBar, FaSignOutAlt
} from "react-icons/fa";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const AdminDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const username = localStorage.getItem("adminUsername");

  const [counts, setCounts] = useState({
    students: 0,
    courses: 0,
    batches: 0,
  });

  const handleLogout = () => {
    localStorage.removeItem("adminUsername");
    navigate("/");
  };

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [studentRes, courseRes, batchRes] = await Promise.all([
          axios.get("http://localhost:8081/api/students/count"),
          axios.get("http://localhost:8081/api/courses/count"),
          axios.get("http://localhost:8081/api/batches/count"),
        ]);

        setCounts({
          students: studentRes.data.count,
          courses: courseRes.data.count,
          batches: batchRes.data.count,
        });
      } catch (err) {
        console.error("Failed to fetch dashboard counts", err);
      }
    };

    fetchCounts();
  }, []);

  return (
    <div className="d-flex flex-column vh-100">
      <style>
        {`
          .nav-link:hover {
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
              <NavLink to="/studentwisereport" className="nav-link text-dark">
                <FaChartBar className="me-2" /> Reports
              </NavLink>
            </li>
            <li className="nav-item mt-2">
              <button onClick={handleLogout} className="btn btn-link nav-link text-danger text-start fs-4">
                <FaSignOutAlt className="me-2" /> Logout
              </button>
            </li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="flex-grow-1 p-4" style={{ backgroundColor: "#f8f9fa" }}>
          {location.pathname === "/admin" ? (
            <div>
            <h2 className="mb-4 text-center">Welcome to Admin Dashboard</h2>
            <div className="row">
              <div className="col-md-4 mb-3">
                <div className="card shadow-sm border-0 dashboard-card">
                  <div className="card-body text-center">
                    <div className="icon-circle bg-primary">
                      <FaUsers />
                    </div>
                    <h5 className="card-title text-primary">Total Students</h5>
                    <h3>{counts.students}</h3>
                  </div>
                </div>
              </div>
          
              <div className="col-md-4 mb-3">
                <div className="card shadow-sm border-0 dashboard-card">
                  <div className="card-body text-center">
                    <div className="icon-circle bg-success">
                      <FaBookOpen />
                    </div>
                    <h5 className="card-title text-success">Total Courses</h5>
                    <h3>{counts.courses}</h3>
                  </div>
                </div>
              </div>
          
              <div className="col-md-4 mb-3">
                <div className="card shadow-sm border-0 dashboard-card">
                  <div className="card-body text-center">
                    <div className="icon-circle bg-warning">
                      <FaLayerGroup />
                    </div>
                    <h5 className="card-title text-warning">Total Batches</h5>
                    <h3>{counts.batches}</h3>
                  </div>
                </div>
              </div>
            </div>
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
