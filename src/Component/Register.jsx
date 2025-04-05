import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";


const Register = () => {
  const navigate = useNavigate(); 
  const [formData, setFormData] = useState({
    role: "student",
    name: "",
    email: "",
    contact: "",
    address: "",
    course: "Computer Science",
    birthdate: "",
    gender: "Male",
  });
  const [message, setMessage] = useState("");
  // const courses = ["Computer Science", "Business Management", "Mathematics", "Physics", "Biology"];
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8081/api/register", formData);
      if (response.data === "Email already exists") {
        setMessage("❌ Email already exists");
      } else {
        setMessage("✅ Registration Successful!");
        navigate("/login"); 
      }
    } catch (err) {
      setMessage("❌ Error: " + err.message);
      console.log(err.message);
      
    }
  };

  return (
    <div className="Register">
    <div className="container p-4 bg-light" style={{ width: "800px",height:"450px"}}>
      <h2 className="text-center text-primary">Registration</h2>
      {message && <p style={{ color: message.includes("❌") ? "red" : "green" }}>{message}</p>} {/* Display message */}
      <form onSubmit={handleSubmit} className="reg">
        <div className="row g-2">
          <div className="col-md">
            <div className="form-floating">
              <input type="text" name="name" className="form-control" id="name" value={formData.name} onChange={handleChange} required />
              <label htmlFor="name">Full Name</label>
            </div>
          </div>

          <div className="col-md">
            <div className="form-floating">
              <input type="email" name="email" className="form-control" id="email" value={formData.email} onChange={handleChange} required />
              <label htmlFor="email">Email Address</label>
            </div>
          </div>
          <br />

          <div className="col-md">
            <div className="form-floating">
              <input type="text" name="contact" className="form-control" id="phone" value={formData.contact} onChange={handleChange} required />
              <label htmlFor="phone">Contact</label>
            </div>
          </div>

          <div className="col-md">
            <div className="form-floating">
              <input type="date" name="birthdate" className="form-control" value={formData.birthdate} onChange={handleChange} required />
              <label htmlFor="phone">Birthdate</label>
            </div>
          </div>

           <div className="col-md">
            <div className="form-floating">
              <select className="form-select" id="course" name="gender" value={formData.gender} onChange={handleChange}>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              <label htmlFor="course">Gender</label>
            </div>
          </div>
          <div className="col-md">
            <div className="form-floating">
              <select className="form-select" id="course" name="course" value={formData.course} onChange={handleChange}>
                <option value="">Select Course</option>
                <option value="C">C</option>
                <option value="Java">Java</option>
                <option value="Aptitude">Aptitude</option>
              </select>
              <label htmlFor="course">Course</label>
            </div>
          </div>

          <div className="col-md">
            <div className="form-floating">
              <input type="text" className="form-control" id="address" name="address" value={formData.address} onChange={handleChange} required />
              <label htmlFor="address">Address</label>
            </div>
          </div>

          <div className="col-md">
            <div className="form-floating">
              <select className="form-select" id="role" name="role"  value={formData.role} onChange={handleChange}>
                <option value="">Select Role</option>
                <option value="admin">Admin</option>
                <option value="student">Student</option>
              </select>
              <label htmlFor="role">Role</label>
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn-outline-primary shadow-sm mt-2">Register</button>
      </form>
    </div>
    </div>
  );
};

export default Register;
