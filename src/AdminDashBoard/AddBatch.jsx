import React, { useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddBatch = () => {
  const navigate = useNavigate();

  const [batch, setBatch] = useState({
    batchName: "",
    courseId: ""
  });

  const [courses, setCourses] = useState([]);
  const [message, setMessage] = useState("");

  const fetchCourses = () => {
    if (courses.length === 0) {
      axios.get("http://localhost:8081/api/courses/all")
        .then(res => setCourses(res.data))
        .catch(() => setMessage("❌ Could not load courses."));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBatch({ ...batch, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const batchData = {
      batchName: batch.batchName,
      courseId: parseInt(batch.courseId),
    };

    axios.post("http://localhost:8081/api/batches/add", batchData)
      .then(() => {
        setMessage("✅ Batch added successfully.");
        setBatch({ batchName: "", courseId: "" });
        setTimeout(() => setMessage(""), 2000);
      })
      .catch(() => {
        setMessage("❌ Error adding batch.");
        setTimeout(() => setMessage(""), 2000);
      });
  };

  return (
    <div className="container text-center mt-4 shadow p-4 position-absolute start-50 top-50 translate-middle" style={{ width: "500px" }}>
      <IoMdCloseCircle size={28} style={{ position: "absolute", top: "15px", right: "15px", cursor: "pointer", color: "#dc3545" }}
        onClick={() => navigate(-1)} />

      <h3 className="text-danger mb-3 fw-bold">Add Batch</h3>

      {message && <p style={{ color: message.includes("❌") ? "red" : "green" }}>{message}</p>}

      <form onSubmit={handleSubmit}>
        <div className="form-floating mb-3">
          <input type="text" className="form-control" placeholder="Batch Name" name="batchName" value={batch.batchName} onChange={handleChange} required />
          <label>Batch Name</label>
        </div>

        <div className="form-floating mb-3">
          <select className="form-select" name="courseId" value={batch.courseId} onFocus={fetchCourses} onChange={handleChange} required>
            <option value="">Select Course</option>
            {courses.map(course => (
              <option key={course.id} value={course.id}>
                {course.courseName}
              </option>
            ))}
          </select>
          <label>Select Course</label>
        </div>

        <button type="submit" className="btn btn-outline-danger mt-3">Add Batch</button>
      </form>
    </div>
  );
};

export default AddBatch;
