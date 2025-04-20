import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { IoMdCloseCircle } from "react-icons/io";

const UpdateCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState({
    id: id,
    courseName: '',
    courseType: '',
    courseDuration: '',
    courseContent: ''
  });

  const [message, setMessage] = useState('');
  const [loaded, setLoaded] = useState(false);

  const loadCourse = async () => {
    try {
      const res = await axios.get('http://localhost:8081/api/courses/all');
      const selected = res.data.find(c => c.id === parseInt(id));
      if (selected) {
        setCourse(selected);
        setLoaded(true);
      } else {
        alert('Course not found!');
      }
    } catch (error) {
      alert('Error fetching course data');
    }
  };

  const handleChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8081/api/courses/update/${id}`, course);
      setMessage('✅ Course updated successfully!');
      setTimeout(() => {
        navigate('/viewcourses');
      }, 800);
    } catch (error) {
      setMessage('❌ Failed to update course.');
    }
  };

  return (
    <div className="container mt-5 shadow-lg p-4 rounded position-absolute top-50 start-50 translate-middle" style={{ width: "600px" }}>
      <IoMdCloseCircle size={28} className="position-absolute" style={{ top: "15px", right: "15px", cursor: "pointer", color: "#dc3545" }}
        onClick={() => navigate(-1)} />

      <h2 className="text-danger text-center mb-4">Update Course</h2>

      {!loaded ? (
        <div className="text-center">
          <button className="btn btn-primary" onClick={loadCourse}>Load Course</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Course Name</label>
            <input type="text" name="courseName" className="form-control" value={course.courseName} onChange={handleChange} required  />
          </div>

          <div className="mb-3">
            <label>Course Type</label>
            <select name="courseType" className="form-select" value={course.courseType} onChange={handleChange} required >
              <option value="">Select Type</option>
              <option value="Paid">Paid</option>
              <option value="Free">Free</option>
            </select>
          </div>

          <div className="mb-3">
            <label>Duration</label>
            <input type="text" name="courseDuration" className="form-control" value={course.courseDuration} onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label>Course Content</label>
            <input type="text" name="courseContent" className="form-control" value={course.courseContent} onChange={handleChange} required />
          </div>

          <div className="text-center">
            <button type="submit" className="btn btn-success">Update Course</button>
          </div>
        </form>
      )}

      {message && <p className="text-center mt-3">{message}</p>}
    </div>
  );
};

export default UpdateCourse;
