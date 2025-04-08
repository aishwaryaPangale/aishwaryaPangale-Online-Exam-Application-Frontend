import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [workoutMenuOpen, setWorkoutMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear session/token here if needed
    navigate("/account/admin");
  };

  return (
    <div className="admin-container">
      {/* Top Navbar */}
      <div className="admin-navbar">
        <button className="menu-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>☰</button>
        <div className="admin-info d-flex">
        <img className="rounded-5" src="https://www.w3schools.com/howto/img_avatar.png" style={{width:"40px", height:"40px"}}></img> <h5 className="sidebar-title justify-content-center align-items-center">Admin Dashboard</h5>
        </div>
      </div>

      {/* Sidebar + Main Content */}
      <div className="admin-body">
        <div className={`admin-sidebar ${sidebarOpen ? "open" : "closed"}`}>
          
          {/* User Menu */}
          <div className="sidebar-section">
            <div
              className="sidebar-category"
              onClick={() => setUserMenuOpen(!userMenuOpen)}
            >
              User  {userMenuOpen ? "▾" : "▸"}
            </div>
            <ul className={`submenu ${userMenuOpen ? "open" : ""}`}>
              <li><Link to="AddCourse">Add User</Link></li>
              <li><Link to="update-user">Update User</Link></li>
              <li><Link to="delete-user">Delete User</Link></li>
              <li><Link to="view-users">View All Users</Link></li>
            </ul>
          </div>
          <hr className="sidebar-divider" />
          {/* Workout Menu */}
          <div className="sidebar-section">
            <div
              className="sidebar-category"
              onClick={() => setWorkoutMenuOpen(!workoutMenuOpen)}
            >
              Workout  {workoutMenuOpen ? "▾" : "▸"}
            </div>
            <ul className={`submenu ${workoutMenuOpen ? "open" : ""}`}>
              <li><Link to="add-workout">Add Workout</Link></li>
              <li><Link to="update-workout">Update Workout</Link></li>
              <li><Link to="view-workouts">View Workout</Link></li>
              <li><Link to="delete-workout">Delete Workout</Link></li>
            </ul>
          </div>
          <hr className="sidebar-divider" />
          <div className="sidebar-category" onClick={handleLogout}>Logout</div>
        </div>

        {/* Main content */}
        <div className={`admin-content ${sidebarOpen ? "shifted" : ""}`}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;