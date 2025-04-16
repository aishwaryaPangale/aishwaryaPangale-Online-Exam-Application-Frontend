import React, { useEffect, useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddBatch = () => {
  const navigate = useNavigate();
  const [batchName, setBatchName] = useState("");
  const [courseId, setCourseId] = useState("");
  const [courses, setCourses] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios.get("http://localhost:8081/api/courses/all")
      .then(res => setCourses(res.data))
      .catch(err => {
        console.error("Error fetching courses:", err);
        setMessage("❌ Error fetching courses.");
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const batch = {
      batchName,
      courseId: parseInt(courseId),
    };

    axios.post("http://localhost:8081/api/batches/add", batch)
      .then(() => {
        setMessage("✅ Batch added successfully.");
        setBatchName("");
        setCourseId("");
      })
      .catch(err => {
        console.error("Error adding batch:", err);
        setMessage("❌ Error adding batch.");
      });
  };

  return (
    <div className="container text-center mt-4 shadow p-4 bg-transparent position-absolute start-50 top-50 translate-middle" style={{ width: "500px" }}>
      <IoMdCloseCircle
        size={28}
        className="position-absolute"
        style={{ top: "15px", right: "15px", cursor: "pointer", color: "#dc3545" }}
        onClick={() => navigate(-1)}
      />
      <h3 className="text-danger mb-3 fw-bold">Add Batch</h3>

      {message && (
        <p style={{ color: message.includes("❌") ? "red" : "green" }}>{message}</p>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-floating mb-3">
          <input
            type="text"
            id="batchName"
            className="form-control"
            placeholder="Batch Name"
            value={batchName}
            onChange={e => setBatchName(e.target.value)}
            required
          />
          <label htmlFor="batchName">Batch Name</label>
        </div>

        <div className="form-floating mb-3">
          <select
            id="courseId"
            className="form-select"
            value={courseId}
            onChange={e => setCourseId(e.target.value)}
            required
          >
            <option value="" disabled>Select Course</option>
            {courses.map(course => (
              <option key={course.id} value={course.id}>{course.courseName}</option>
            ))}
          </select>
          <label htmlFor="courseId">Select Course</label>
        </div>

        <button className="btn btn-outline-danger mt-3" type="submit">Add Batch</button>
      </form>
    </div>
  );
};

export default AddBatch;
