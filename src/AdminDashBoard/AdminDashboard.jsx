import React from "react";
import ReactDom from "react-dom";
import { Navigate } from "react-router-dom";

const AdminDashboard=()=>{

    return(<>
    <div class="sidebar">
        <h2 class="text-center">EXAM PORTAL</h2>
        <div class="text-center">
            <img src="https://www.w3schools.com/howto/img_avatar.png" class="rounded-circle" width="80" height="80"/>
            <h4>Admin</h4>
        </div>
        <a href="#"><i class="fas fa-tachometer-alt"></i> Dashboard</a>

        <i class="fas fa-book"></i> 
        <select className="form-select" id="role" name="role">
                <option value="">Select Course</option>
                <option onClick={Navigate("/addCourse")}>Add Course</option>
                <option onClick={Navigate("/viewCourse")}>View Course</option>
              </select>
              <label htmlFor="role">course</label>
       
        
        {/* <select name="" id="">Course
        <option onClick={Navigate("/addCourse")}>Add Course</option>
        <option onClick={Navigate("/viewCourse")}>View Course</option>
        <option>Delete Course</option>
        <option>Update Course</option>
        <option>Search Course</option>
        </select> */}

        <a href="#"><i class="fas fa-user-graduate"></i> Student</a>
        <a href="#"><i class="fas fa-book"></i> Test</a>
        <a href="#"><i class="fas fa-question-circle"></i> Result</a>
    </div>
    </>)
}
export default AdminDashboard;