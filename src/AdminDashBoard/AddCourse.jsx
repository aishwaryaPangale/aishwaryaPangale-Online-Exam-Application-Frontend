import React, { useState } from "react";
import ReactDom from "react-dom";
import axios from "axios";



const AddCourse = () => {
  const [course, setCourse] = useState({
    courseName: "",
    courseType: "",
    courseDuration: "",
    courseContent: ""
  });

  const handleChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    axios.post("http://localhost:8081/api/courses/add", course)
      .then(res => alert(res.data))
      .catch(err => alert("Error adding course"));
  };

  return (<>
    <div className="content text-center shadow-lg " style={{width:"700px",marginLeft:"400px"}}>
      <h1>Admin Dashboard - Add Course</h1>
        <form onSubmit={handleSubmit} class="addCourse mt-5">

        <div class="form-floating m-3">
        <input type="email" class="form-control" id="floatingInput" />
        <label for="floatingInput">Course Name</label>
      </div>
      <div class="form-floating m-3">
  <select class="form-select" id="floatingSelect" aria-label="Floating label select example">
    <option selected>Select Course Type</option>
    <option value="1">Paid</option>
    <option value="2">Free</option>
  </select>
  <label for="floatingSelect">Course Type</label>
</div>
<div class="form-floating m-3">
        <input type="text" class="form-control" id="floatingInput" />
        <label for="floatingInput">Duration</label>
      </div>
      <div class="form-floating m-3">
        <input type="text" class="form-control" id="floatingInput" />
        <label for="floatingInput">Course Content</label>
      </div>
      <button type="submit" class="btn btn-outline-success w-75">Add Course</button>
        </form>
    </div>
  </>)
}
export default AddCourse;