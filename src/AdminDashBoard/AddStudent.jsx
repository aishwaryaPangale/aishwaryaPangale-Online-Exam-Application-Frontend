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
  const [errors, setErrors] = useState({});

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
    const { name, value } = e.target;
    setFormData({ ...formData, [e.target.name]: e.target.value });
    validateField(name, value);
  };

  // ✅ Form validation for email and contact
  const validateField = (name, value) => {
    let error = "";

    if (name === "email") {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,4}$/;
      if (!emailRegex.test(value)) {
        error = "Invalid email format (e.g., user@example.com)";
      }
    }

    if (name === "contact") {
      const contactRegex = /^\d{10}$/;
      if (!contactRegex.test(value)) {
        error = "Contact must be exactly 10 digits";
      }
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    for (const key in formData) {
      validateField(key, formData[key]);
      if (errors[key]) {
        setMessage("❌ Please check information");
        return;
      }
    }

    try {
      const response = await axios.post("http://localhost:8081/api/register", formData, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.data === "Email already exists") {
        setMessage("❌ Email already exists");
      } else if (response.data === "Registered successfully") {
        setMessage("✅ Student added successfully!");
        setTimeout(() => navigate(-1), 2000);
      } else {
        setMessage("❌ Unexpected server response");
      }
    } catch (err) {
      console.error("Registration error:", err);
      setMessage("❌ Error: " + err.message);
    }

    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div
      className="container shadow p-4 bg-transparent position-absolute start-50 top-50 translate-middle"
      style={{ width: "900px", marginLeft: "130px", marginTop: "50px", height: "500px" }}
    >
      <IoMdCloseCircle
        size={28}
        className="position-absolute"
        style={{ top: "15px", right: "15px", cursor: "pointer", color: "#dc3545" }}
        onClick={() => navigate(-1)}
      />
      <h4 className="text-center text-danger mb-3">Add Student</h4>

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
        <div className="row g-2">
          <div className="col-md-6">
            <div className="form-floating">
              <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} required />
              <label>Full Name</label>
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-floating">
              <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} required />
              <label>Email Address</label>
              {errors.email && <small className="text-danger">{errors.email}</small>}
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-floating">
              <input type="text" name="contact" className="form-control" value={formData.contact} onChange={handleChange} required />
              <label>Contact</label>
              {errors.contact && <small className="text-danger">{errors.contact}</small>}
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-floating">
              <input type="date" name="birthdate" className="form-control" value={formData.birthdate} onChange={handleChange} required />
              <label>Birthdate</label>
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-floating">
              <select className="form-select" name="gender" value={formData.gender} onChange={handleChange} required>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              <label>Gender</label>
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-floating">
              <input type="text" className="form-control" name="address" value={formData.address} onChange={handleChange} required />
              <label>Address</label>
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-floating">
              <select className="form-select" name="course" value={formData.course} onChange={handleChange} required>
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
              <select className="form-select" name="batch" value={formData.batch} onChange={handleChange} required>
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
              <input type="text" className="form-control" name="username" value={formData.username} onChange={handleChange} required />
              <label>Username</label>
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-floating">
              <input type="password" className="form-control" name="password" value={formData.password} onChange={handleChange} required />
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
