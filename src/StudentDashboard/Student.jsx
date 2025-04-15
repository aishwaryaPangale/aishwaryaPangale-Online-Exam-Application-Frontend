// src/components/Student.js
import React, { useState } from "react";
import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import {
    FaUserCircle, FaHome, FaListAlt,
    FaSignOutAlt, FaClipboardCheck, FaCheckCircle, FaBars
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const Student = () => {
    const [showSidebar, setShowSidebar] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();
    const studentName = localStorage.getItem("studentName") || "Student";
    const username = localStorage.getItem("username");

    const handleLogout = () => {
        localStorage.clear();
        navigate("/");
    };

    return (
        <div className="admin-dashboard-container d-flex flex-column vh-100">
            <header className="bg-dark text-white d-flex justify-content-between align-items-center px-4 py-2 shadow position-sticky top-0" style={{ height: "56px" }}>
                <div className="d-flex align-items-center">
                    <button className="btn btn-outline-light me-3" onClick={() => setShowSidebar(!showSidebar)}>
                        <FaBars />
                    </button>
                    <h4 className="m-0">Student Dashboard</h4>
                </div>
            </header>

            <div className="d-flex flex-grow-1">
                <nav className={`shadow p-3 bg-light ${showSidebar ? "d-block" : "d-none"}`} style={{ width: "240px", overflowY: "auto" }}>
                    <div className="text-center mb-4">
                        <img src="https://www.w3schools.com/howto/img_avatar.png" alt="avatar" width="80px" className="rounded-circle border" />
                    </div>

                    <ul className="nav flex-column" style={{ fontSize: "0.9em" }}>
                        <li className="nav-item mb-2">
                            <NavLink to="/student" className="nav-link text-dark">
                                <FaHome className="me-2" /> Home
                            </NavLink>
                        </li>
                        <li className="nav-item mb-2">
                            <NavLink to={`/student/profile/${username}`} className="nav-link text-dark">
                                <FaUserCircle className="me-2" /> View Profile
                            </NavLink>

                        </li>
                        <li className="nav-item mb-2">
                            <NavLink to="/student/tests" className="nav-link text-dark">
                                <FaClipboardCheck className="me-2" /> Available Tests
                            </NavLink>
                        </li>
                        <li className="nav-item mb-2">
                            <NavLink to="/student/attempted" className="nav-link text-dark">
                                <FaListAlt className="me-2" /> Attempted Tests
                            </NavLink>
                        </li>
                        <li className="nav-item mb-3">
                            <NavLink to="/student/results" className="nav-link text-dark">
                                <FaCheckCircle className="me-2" /> View Results
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <button onClick={handleLogout} className="nav-link text-danger btn btn-link text-start">
                                <FaSignOutAlt className="me-2" /> Logout
                            </button>
                        </li>
                    </ul>
                </nav>

                <main className="flex-grow-1 p-4 overflow-auto" style={{ backgroundColor: "#f0f2f5" }}>
                    {location.pathname === "/student" ? (
                        <div className="text-center mt-4">
                            <h2>Welcome, Student !</h2>
                            <p className="text-muted">Explore your dashboard and get ready to ace your exams!</p>
                        </div>
                    ) : (
                        <Outlet />
                    )}
                </main>
            </div>
        </div>
    );
};

export default Student;
