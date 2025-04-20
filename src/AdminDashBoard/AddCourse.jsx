import React, { useState } from "react";
import axios from "axios";
import { IoMdCloseCircle } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const AddCourse = () => {
  const [course, setCourse] = useState({
    courseName: "",
    courseType: "",
    courseDuration: "",
    courseContent: ""
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse({ ...course, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post("http://localhost:8081/api/courses/add", course)
      .then(() => {
        setMessage("✅ Course added successfully!");
        setCourse({
          courseName: "",
          courseType: "",
          courseDuration: "",
          courseContent: ""
        });

        setTimeout(() => setMessage(""), 2000);
      })
      .catch(() => {
        setMessage("❌ Failed to add course. Please try again.");
        setTimeout(() => setMessage(""), 2000);
      });
  };

  return (
    <div className="container mt-4 shadow p-4 bg-light position-absolute start-50 top-50 translate-middle" style={{ width: "900px", marginLeft: "130px" }}>
      <IoMdCloseCircle
        size={26}
        style={{ position: "absolute", top: "15px", right: "15px", color: "#dc3545", cursor: "pointer" }}
        onClick={() => navigate("/Course")}
      />

      <h4 className="text-center mb-3 text-danger fw-bold">Add Course</h4>

      {message && <p className="text-center" style={{ color: message.includes("❌") ? "red" : "green" }}>{message}</p>}

      <form onSubmit={handleSubmit}>
        <div className="form-floating mb-3">
          <input type="text" id="courseName" name="courseName" className="form-control" placeholder="Course Name" value={course.courseName} onChange={handleChange} required />
          <label htmlFor="courseName">Course Name</label>
        </div>

        <div className="form-floating mb-3">
          <select id="courseType" name="courseType" className="form-select" value={course.courseType} onChange={handleChange} required >
            <option value="" disabled>Select Type</option>
            <option value="Paid">Paid</option>
            <option value="Free">Free</option>
          </select>
          <label htmlFor="courseType">Course Type</label>
        </div>

        <div className="form-floating mb-3">
          <input type="text" id="courseDuration" name="courseDuration" className="form-control" placeholder="Duration" value={course.courseDuration} onChange={handleChange} required />
          <label htmlFor="courseDuration">Course Duration</label>
        </div>

        <div className="form-floating mb-3">
          <input type="text" id="courseContent" name="courseContent" className="form-control" placeholder="Content" value={course.courseContent} onChange={handleChange} required />
          <label htmlFor="courseContent">Course Content</label>
        </div>

        <button type="submit" className="btn btn-outline-danger w-100 mt-3">Add Course</button>
      </form>
    </div>
  );
};

export default AddCourse;
