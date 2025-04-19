import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "", email: "", contact: "", birthdate: "",
    gender: "", address: "", course: "", batch: "",
    username: "", password: ""
  });

  const [courses, setCourses] = useState([]);
  const [batches, setBatches] = useState([]);
  const [message, setMessage] = useState("");

  const loadData = async () => {
    try {
      const studentRes = await axios.get(`http://localhost:8081/api/register/${id}`);
      const student = studentRes.data;

      setFormData({
        name: student.name,
        email: student.email,
        contact: student.contact,
        birthdate: student.birthdate,
        gender: student.gender,
        address: student.address,
        course: student.courseName,
        batch: student.batchName,
        username: student.username,
        password: student.password
      });

      const coursesRes = await axios.get("http://localhost:8081/api/courses/all");
      setCourses(coursesRes.data);

      const batchesRes = await axios.get("http://localhost:8081/api/batches/all");
      setBatches(batchesRes.data);
    } catch (error) {
      setMessage("❌ Error loading data.");
      console.error(error);
    }
  };

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8081/api/register/${id}`, formData);
      setMessage("✅ Student updated successfully!");
      setTimeout(() => navigate("/viewstudents"), 1000);
    } catch (error) {
      setMessage("❌ Failed to update student.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-3">Update Student</h2>

      <button className="btn btn-info mb-3" onClick={loadData}>Load Student Info</button>

      {message && <p style={{ color: message.includes("❌") ? "red" : "green" }}>{message}</p>}

      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
          <input type="text" name="contact" placeholder="Contact" value={formData.contact} onChange={handleChange} />
        </div>

        <div className="mb-2">
          <input type="date" name="birthdate" value={formData.birthdate} onChange={handleChange} />
          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="">Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} />
        </div>

        <div className="mb-2">
          <select name="course" value={formData.course} onChange={handleChange}>
            <option value="">Select Course</option>
            {courses.map(c => (
              <option key={c.id} value={c.courseName}>{c.courseName}</option>
            ))}
          </select>

          <select name="batch" value={formData.batch} onChange={handleChange}>
            <option value="">Select Batch</option>
            {batches.map((b, i) => (
              <option key={i} value={b.batch_name}>{b.batch_name}</option>
            ))}
          </select>
        </div>

        <div className="mb-2">
          <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} />
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
        </div>

        <button type="submit" className="btn btn-success">Update Student</button>
      </form>
    </div>
  );
};

export default UpdateStudent;
