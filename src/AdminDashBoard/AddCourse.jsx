import React, { useState } from "react";
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

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents page reload

    axios.post("http://localhost:8080/api/courses/add", course)
      .then(res => alert(res.data))
      .catch(err => alert("Error adding course"));
  };

  return (
    <div className="content text-center shadow-lg mt-5 p-4 rounded" style={{ width: "700px", margin: "auto" }}>
      <h1 className="text-success mb-4">Admin Dashboard - Add Course</h1>
      <form onSubmit={handleSubmit}>

        <div className="form-floating mb-3">
          <input
            type="text"
            name="courseName"
            className="form-control"
            id="courseName"
            placeholder="Course Name"
            onChange={handleChange}
            required
          />
          <label htmlFor="courseName">Course Name</label>
        </div>

        <div className="form-floating mb-3">
          <select
            name="courseType"
            className="form-select"
            id="courseType"
            onChange={handleChange}
            required
          >
            <option value="">Select Course Type</option>
            <option value="Paid">Paid</option>
            <option value="Free">Free</option>
          </select>
          <label htmlFor="courseType">Course Type</label>
        </div>

        <div className="form-floating mb-3">
          <input
            type="text"
            name="courseDuration"
            className="form-control"
            id="courseDuration"
            placeholder="Duration"
            onChange={handleChange}
            required
          />
          <label htmlFor="courseDuration">Course Duration</label>
        </div>

        <div className="form-floating mb-3">
          <input
            type="text"
            name="courseContent"
            className="form-control"
            id="courseContent"
            placeholder="Course Content"
            onChange={handleChange}
            required
          />
          <label htmlFor="courseContent">Course Content</label>
        </div>

        <button type="submit" className="btn btn-outline-success w-75">Add Course</button>
      </form>
    </div>
  );
};

export default AddCourse;
