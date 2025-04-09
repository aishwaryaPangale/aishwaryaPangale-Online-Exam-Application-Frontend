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
    password: "",
    batch:""
  });

  const [message, setMessage] = useState("");

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
      } else if (response.data === "Registered successfully") {
        setMessage("✅ Registration Successful!");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        setMessage("❌ Unexpected server response.");
      }
  
    } catch (err) {
      console.error("Registration error:", err);
      setMessage("❌ Error: " + err.message);
    }
  };
  

  return (
    <div className="Register">
      <div className="container shadow p-4 bg-transparent position-relative" style={{ maxWidth: "800px" }}>
        <IoMdCloseCircle
          size={28}
          className="position-absolute"
          style={{ top: "15px", right: "15px", cursor: "pointer", color: "#dc3545" }}
          onClick={() => navigate(-1)}
        />
        <h2 className="text-center text-warning mb-3">Register</h2>
        {message && <p style={{ color: message.includes("❌") ? "red" : "green"  ,backgroundColor:"white",width:"200px"}}>{message}</p>}

        <form onSubmit={handleSubmit} class="reg">
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
                  <option value="Cpp">C++</option>
                  <option value="Java">Java</option>
                  <option value="Python">Python</option>
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
          </div>

          <button type="submit" className="btn btn-warning shadow-sm mt-4">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
