import React, { useState } from "react";
import axios from "axios";
import { IoMdCloseCircle } from "react-icons/io";

const AddCourse = () => {
  const [course, setCourse] = useState({
    courseName: "",
    courseType: "",
    courseDuration: "",
    courseContent: ""
  });

  const [message, setMessage] = useState(""); // Message state
  const [messageType, setMessageType] = useState(""); // success or error

  const handleChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post("http://localhost:8081/api/courses/add", course)
      .then(res => {
        setMessage(res.data);
        setMessageType("success");
        setCourse({
          courseName: "",
          courseType: "",
          courseDuration: "",
          courseContent: ""
        });
        setMessage("✅ Course Add Successfully!");
        setTimeout(() => {
          setMessage('');
        }, 2000);
      })
      .catch(() => {

        setMessageType("❌ Failed to update course. Please try again.");
        setTimeout(() => {
          setMessage('');
        }, 2000);
      });
  };

  return (

    <div className="text-center shadow-lg mt-3 p-4 rounded position-absolute start-50 top-50 translate-middle" style={{ width: "700px",marginLeft:"100px" }}>
      <IoMdCloseCircle
        size={28}
        className="position-absolute"
        style={{ top: "15px", right: "15px", cursor: "pointer", color: "#dc3545" }}
        onClick={() => navigate("/admin")}
      />
      {message && <p style={{ color: message.includes("❌") ? "red" : "green" }}>{message}</p>}
      <h1 className="text-danger mb-4">Add Course</h1>



      <form onSubmit={handleSubmit}>

        <div className="form-floating mb-3">
          <input
            type="text"
            name="courseName"
            className="form-control"
            id="courseName"
            placeholder="Course Name"
            value={course.courseName}
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
            value={course.courseType}
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
            value={course.courseDuration}
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
            value={course.courseContent}
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
