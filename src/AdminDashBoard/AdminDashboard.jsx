import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaBook, FaUserGraduate, FaClipboardList, FaSignOutAlt, FaChartBar, FaHome } from "react-icons/fa";

const AdminDashboard = () => {
  const [dropdowns, setDropdowns] = useState({
    course: false,
    student: false,
    test: false,
  });

  const toggleDropdown = (section) => {
    setDropdowns((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <>
      <ul className='menu-list'>
        <li className="logo-container p-3">
        <img src="https://www.w3schools.com/howto/img_avatar.png" class="rounded-circle" width="80" height="80"/>
        <h4>Admin</h4>
        </li>

        <li>
          <div className='menu-item'>
            <FaHome className='menu-icon' size='1.5em' />
            <NavLink to='/' className='navlink'>Home</NavLink>
          </div>
        </li>

        {/* Course Dropdown */}
        <li>
          <div className='menu-item' onClick={() => toggleDropdown('course')}>
            <FaBook className='menu-icon' size='1.5em' />
            <span className='navlink' style={{ cursor: "pointer",fontSize:"1.5em" }}>
              Course <span style={{ fontSize: "0.8em" }}>▼</span>
            </span>
          </div>
          {dropdowns.course && (
            <ul className='dropdown-list'>
              <li><NavLink to='/addcourse' className='navlink fs-5'>AddCourse</NavLink></li>
              <li><NavLink to='/viewcourses' className='navlink fs-5'>ViewCourses</NavLink></li>
              <li><NavLink to='/updatecourse' className='navlink fs-5'>UpdateCourse</NavLink></li>
              <li><NavLink to='/deletecourse' className='navlink fs-5'>DeleteCourse</NavLink></li>
              <li><NavLink to='/searchcourse' className='navlink fs-5'>SearchCourse</NavLink></li>
            </ul>
          )}
        </li>

        {/* Student Dropdown */}
        <li>
          <div className='menu-item' onClick={() => toggleDropdown('student')}>
            <FaUserGraduate className='menu-icon' size='1.5em' />
            <span className='navlink' style={{ cursor: "pointer",fontSize:"1.5em"}}>
              Student <span style={{ fontSize: "0.8em" }}>▼</span>
            </span>
          </div>
          {dropdowns.student && (
            <ul className='dropdown-list'>
              <li><NavLink to='/addstudent' className='navlink fs-5'>AddStudent</NavLink></li>
              <li><NavLink to='/viewstudents' className='navlink fs-5'>ViewStudents</NavLink></li>
              <li><NavLink to='/updatestudent' className='navlink fs-5'>UpdateStudent</NavLink></li>
              <li><NavLink to='/deletestudent' className='navlink fs-5'>DeleteStudent</NavLink></li>
              <li><NavLink to='/searchstudent' className='navlink fs-5'>SearchStudent</NavLink></li>
            </ul>
          )}
        </li>

        {/* Test Dropdown */}
        <li>
          <div className='menu-item' onClick={() => toggleDropdown('test')}>
            <FaClipboardList className='menu-icon' size='1.5em' />
            <span className='navlink' style={{ cursor: "pointer",fontSize:"1.5em" }}>
              Test <span style={{ fontSize: "0.8em" }}>▼</span>
            </span>
          </div>
          {dropdowns.test && (
            <ul className='dropdown-list'>
              <li><NavLink to='/addtest' className='navlink fs-5'>AddTest</NavLink></li>
              <li><NavLink to='/viewtests' className='navlink fs-5'>ViewTests</NavLink></li>
              <li><NavLink to='/searchtest' className='navlink fs-5'>SearchTest</NavLink></li>
            </ul>
          )}
        </li>

        {/* Reports */}
        <li>
          <div className='menu-item'>
            <FaChartBar className='menu-icon' size='1.5em' />
            <NavLink to='/reports' className='navlink'>Reports</NavLink>
          </div>
        </li>

        {/* Logout */}
        <li>
          <div className='menu-item'>
            <FaSignOutAlt className='menu-icon' size='1.5em' />
            <NavLink to='/logout' className='navlink'>Logout</NavLink>
          </div>
        </li>
      </ul>

    <div class="content">
        <div class="d-flex justify-content-between"> 
            <h3>Admin Dashboard</h3>
            <button class="btn btn-primary">Logout</button>
        </div>
        
        <div class="row mt-4">
            <div class="col-md-3">
                <div class="card bg-info">
                    <h5>Total Students</h5>
                    <h3>2</h3>
                </div>
            </div>
            <div class="col-md-3">
                <div class="card bg-primary">
                    <h5>Total Teachers</h5>
                    <h3>2</h3>
                </div>
            </div>
            <div class="col-md-3">
                <div class="card bg-danger">
                    <h5>Total Courses</h5>
                    <h3>2</h3>
                </div>
            </div>
            <div class="col-md-3">
                <div class="card bg-dark">
                    <h5>Total Questions</h5>
                    <h3>7</h3>
                </div>
            </div>
        </div>
    </div>


    </>
  );
};

export default AdminDashboard;
