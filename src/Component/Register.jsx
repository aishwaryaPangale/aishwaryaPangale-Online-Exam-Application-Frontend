import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { IoMdCloseCircle } from "react-icons/io";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    address: "",
    course: "",
    birthdate: "",
    gender: "",
    username: "",
    password: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Sending data to backend:", formData); // ✅ Helpful for debugging

    try {
      const response = await axios.post("http://localhost:8081/api/register", formData, {
        headers: { "Content-Type": "application/json" } // ✅ Ensure JSON
      });

      if (response.data === "Email already exists") {
        setMessage("❌ Email already exists");
      } else {
        setMessage("✅ Registration Successful!");
        setTimeout(() => navigate("/login"), 1500);
      }
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setMessage("❌ Bad Request: Please check all fields.");
      } else {
        setMessage("❌ Error: " + err.message);
      }
      console.error("Registration error:", err);
    }
  };

  return (
    <div className="Register">
      <div className="container shadow p-4 bg-transparent position-relative" style={{ width: "800px" }}>
        <IoMdCloseCircle
          size={28}
          className="position-absolute"
          style={{ top: "15px", right: "15px", cursor: "pointer", color: "#dc3545" }}
          onClick={() => navigate(-1)}
        />
        <h2 className="text-center text-warning">Registration</h2>
        {message && <p style={{ color: message.includes("❌") ? "red" : "green" }}>{message}</p>}
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
                <input type="text" className="form-control" name="address" value={formData.address} onChange={handleChange} required />
                <label>Address</label>
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
          </div>
<<<<<<< Updated upstream
          <button type="submit" className="btn btn-warning shadow-sm mt-3">Register</button>
        </form>
      </div>
=======

          <div className="col-md">
            <div className="form-floating">
              <input type="email" name="email" className="form-control " id="email" value={formData.email} onChange={handleChange} required />
              <label htmlFor="email">Email Address</label>
            </div>
          </div>
          <br />

          <div className="col-md">
            <div className="form-floating">
              <input type="text" name="contact" className="form-control " id="phone" value={formData.contact} onChange={handleChange} required />
              <label htmlFor="phone">Contact</label>
            </div>
          </div>

          <div className="col-md">
            <div className="form-floating">
              <input type="date" name="birthdate" className="form-control " value={formData.birthdate} onChange={handleChange} required />
              <label htmlFor="phone">Birthdate</label>
            </div>
          </div>

           <div className="col-md">
            <div className="form-floating">
              <select className="form-select " id="course" name="gender" value={formData.gender} onChange={handleChange}>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              <label htmlFor="course">Gender</label>
            </div>
          </div>
          <div className="col-md">
            <div className="form-floating">
              <select className="form-select " id="course" name="course" value={formData.course} onChange={handleChange}>
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
              <input type="text" className="form-control " id="address" name="address" value={formData.address} onChange={handleChange} required />
              <label htmlFor="address">Address</label>
            </div>
          </div>

          <div className="col-md">
            <div className="form-floating">
              <select className="form-select " id="role" name="role"  value={formData.role} onChange={handleChange}>
                <option value="">Select Role</option>
                {/* <option value="admin">Admin</option> */}
                <option value="student">Student</option>
              </select>
              <label htmlFor="role">Role</label>
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn-warning shadow-sm mt-2">Register</button>
      </form>
    </div>
>>>>>>> Stashed changes
    </div>
  );
};

export default Register;
