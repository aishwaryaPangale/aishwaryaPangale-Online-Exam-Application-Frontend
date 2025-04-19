import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdCloseCircle } from "react-icons/io";
import axios from "axios";
import "animate.css";

const AddStudent = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    birthdate: "",
    gender: "",
    address: "",
    course: "",
    batch: "",
    username: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [courses, setCourses] = useState([]);
  const [batches, setBatches] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8081/api/courses/all")
      .then((res) => setCourses(res.data))
      .catch((err) => console.error("Error loading courses:", err));

    axios
      .get("http://localhost:8081/api/batches/all")
      .then((res) => setBatches(res.data))
      .catch((err) => console.error("Error loading batches:", err));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Sending data to backend:", formData);

    try {
      const response = await axios.post("http://localhost:8081/api/register", formData, {
        headers: { "Content-Type": "application/json" }
      });

      console.log("Server response:", response.data); // 👈 helpful debug

      if (response.data === "Email already exists") {
        setMessage("❌ Email already exists");
        setTimeout(() => setMessage(""), 2000);
      } else if (response.data === "Registered successfully") {
        setMessage("✅ Add Student Successful!");
        localStorage.setItem("studentName", response.data.name);
        localStorage.setItem("username", response.data.username);
      } else {
        setMessage("❌ Unexpected server response.");
        setTimeout(() => setMessage(""), 2000);
      }

    } catch (err) {
      console.error("Registration error:", err);
      setMessage("❌ Error: " + err.message);
      setTimeout(() => setMessage(""), 2000);
    }
  };
  return (
    <div
      className="container shadow p-4 bg-transparent position-absolute start-50 top-50 translate-middle"
      style={{ width: "800px", marginTop: "20px", marginLeft: "100px" }}
    >
      <IoMdCloseCircle
        size={28}
        className="position-absolute"
        style={{ top: "15px", right: "15px", cursor: "pointer", color: "#dc3545" }}
        onClick={() => navigate(-1)}
      />
      <h2 className="text-center text-danger mb-3 display-7 fw-bold animate__animated animate__rotateIn">
        Add Student
      </h2>

      {message && (
        <p
          style={{
            color: message.includes("❌") ? "red" : "green",
            backgroundColor: "white",
            width: "fit-content",
            padding: "5px 10px",
          }}
        >
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <div className="row g-3">
          <div className="col-md-6">
            <div className="form-floating">
              <input
                type="text"
                name="name"
                className="form-control"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <label>Full Name</label>
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-floating">
              <input
                type="email"
                name="email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <label>Email Address</label>
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-floating">
              <input
                type="text"
                name="contact"
                className="form-control"
                value={formData.contact}
                onChange={handleChange}
                required
              />
              <label>Contact</label>
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-floating">
              <input
                type="date"
                name="birthdate"
                className="form-control"
                value={formData.birthdate}
                onChange={handleChange}
                required
              />
              <label>Birthdate</label>
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-floating">
              <select
                className="form-select"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              <label>Gender</label>
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
              <label>Address</label>
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-floating">
              <select
                className="form-select"
                name="course"
                value={formData.course}
                onChange={handleChange}
                required
              >
                <option value="">Select Course</option>
                {courses.map((course) => (
                  <option key={course.id} value={course.courseName}>
                    {course.courseName}
                  </option>
                ))}
              </select>
              <label>Course</label>
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-floating">
              <select
                className="form-select"
                name="batch"
                value={formData.batch}
                onChange={handleChange}
                required
              >
                <option value="">Select Batch</option>
                {batches.map((batch, index) => (
                  <option key={`batch-${index}`} value={batch.batchName}>
                    {batch.batchName}
                  </option>
                ))}
              </select>
              <label>Batch</label>
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
              <label>Username</label>
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-floating">
              <input
                type="password"
                className="form-control"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <label>Password</label>
            </div>
          </div>

          <div className="col-12 text-center">
            <button type="submit" className="btn btn-outline-danger shadow-sm mt-4">
              Add Student
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddStudent;
