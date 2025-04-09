import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoMdCloseCircle } from "react-icons/io";
import axios from "axios";

const UpdateStudent = () => {
  const { id } = useParams();
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

  useEffect(() => {
    axios
      .get(`http://localhost:8081/api/register/${id}`)
      .then((res) => setFormData(res.data))
      .catch((err) => console.error("Error loading student", err));
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8081/api/register/${id}`, formData);
      setMessage("✅ Student updated successfully!");
      setTimeout(() => {
        navigate("/viewstudents");
      }, 1500);
    } catch (error) {
      setMessage("❌ Failed to update student. Please try again.");
    }
  };

  return (
    <div className="container shadow p-4 bg-transparent position-absolute start-50 top-50 translate-middle" style={{ maxWidth: "800px", marginTop: "20px" }}>
      <IoMdCloseCircle
        size={28}
        className="position-absolute"
        style={{ top: "15px", right: "15px", cursor: "pointer", color: "#dc3545" }}
        onClick={() => navigate(-1)}
      />
      <h2 className="text-center text-primary mb-3 display-7 text-danger fw-bold fade-in-up glow-text animate__animated animate__rotateIn">Update Student Details</h2>

      {message && (
        <p style={{ color: message.includes("❌") ? "red" : "green", backgroundColor: "white", width: "fit-content", padding: "5px 10px" }}>
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <div className="row g-3">
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
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-floating">
              <input type="text" name="contact" className="form-control" value={formData.contact} onChange={handleChange} required />
              <label>Contact</label>
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
                <option value="C">C</option>
                <option value="Java">Java</option>
                <option value="Aptitude">Aptitude</option>
              </select>
              <label>Course</label>
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-floating">
              <input type="date" className="form-control" name="batch" value={formData.batch} onChange={handleChange} required />
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
            <button type="submit" className="btn btn-outline-danger shadow-sm mt-4">Update Student</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateStudent;
