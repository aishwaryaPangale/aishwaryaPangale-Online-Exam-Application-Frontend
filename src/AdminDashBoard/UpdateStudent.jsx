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
  const [courses, setCourses] = useState([]);
  const [batches, setBatches] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8081/api/courses/all")
      .then(res => setCourses(res.data))
      .catch(err => console.error("Error loading courses:", err));

    axios.get("http://localhost:8081/api/batches/all")
      .then(res => {
        console.log("Fetched batches:", res.data); // Debug
        setBatches(res.data);
      })
      .catch(err => console.error("Error loading batches:", err));
  }, []);

  useEffect(() => {
    axios.get(`http://localhost:8081/api/register/${id}`)
      .then((res) => {
        const data = res.data;
        setFormData({
          name: data.name || "",
          email: data.email || "",
          contact: data.contact || "",
          birthdate: data.birthdate || "",
          gender: data.gender || "",
          address: data.address || "",
          course: data.courseName || "",
          batch: data.batchName || "",
          username: data.username || "",
          password: data.password || "",
        });
      })
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
        navigate(-1);
      }, 1500);
    } catch (error) {
      setMessage("❌ Failed to update student. Please try again.");
    }
  };

  return (
    <div className="container shadow p-4 bg-transparent position-absolute start-50 top-50 translate-middle" style={{ width: "900px", marginLeft: "130px", marginTop: "50px" }}>
      <IoMdCloseCircle
        size={28}
        className="position-absolute"
        style={{ top: "15px", right: "15px", cursor: "pointer", color: "#dc3545" }}
        onClick={() => navigate(-1)}
      />
      <h4 className="text-center text-primary mb-3 text-danger">
        Update Student Details
      </h4>

      {message && (
        <p style={{ color: message.includes("❌") ? "red" : "green", backgroundColor: "white", width: "fit-content", padding: "5px 10px" }}>
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <div className="row g-3">
          {/* Name */}
          <div className="col-md-6">
            <div className="form-floating">
              <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} required />
              <label>Full Name</label>
            </div>
          </div>

          {/* Email */}
          <div className="col-md-6">
            <div className="form-floating">
              <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} required />
              <label>Email Address</label>
            </div>
          </div>

          {/* Contact */}
          <div className="col-md-6">
            <div className="form-floating">
              <input type="text" name="contact" className="form-control" value={formData.contact} onChange={handleChange} required />
              <label>Contact</label>
            </div>
          </div>

          {/* Birthdate */}
          <div className="col-md-6">
            <div className="form-floating">
              <input type="date" name="birthdate" className="form-control" value={formData.birthdate} onChange={handleChange} required />
              <label>Birthdate</label>
            </div>
          </div>

          {/* Gender */}
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

          {/* Address */}
          <div className="col-md-6">
            <div className="form-floating">
              <input type="text" className="form-control" name="address" value={formData.address} onChange={handleChange} required />
              <label>Address</label>
            </div>
          </div>

          {/* Course Dropdown */}
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

          {/* Batch Dropdown */}
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

          {/* Username */}
          <div className="col-md-6">
            <div className="form-floating">
              <input type="text" className="form-control" name="username" value={formData.username} onChange={handleChange} required />
              <label>Username</label>
            </div>
          </div>

          {/* Password */}
          <div className="col-md-6">
            <div className="form-floating">
              <input type="password" className="form-control" name="password" value={formData.password} onChange={handleChange} required />
              <label>Password</label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="col-12 text-center">
            <button type="submit" className="btn btn-outline-danger shadow-sm mt-4">Update Student</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateStudent;