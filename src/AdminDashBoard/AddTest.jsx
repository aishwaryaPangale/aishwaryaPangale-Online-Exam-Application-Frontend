import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IoMdCloseCircle } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

const AddTest = () => {
  const navigate = useNavigate();

  const [test, setTest] = useState({
    batchId: '',
    courseId: '',
    date: '',
    time: '',
    mode: 'Offline',
  });

  const [courses, setCourses] = useState([]);
  const [batches, setBatches] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:8081/api/courses/all')
      .then(res => setCourses(res.data))
      .catch(() => setMessage('❌ Could not load courses'));

    axios.get('http://localhost:8081/api/batches/all')
      .then(res => setBatches(res.data))
      .catch(() => setMessage('❌ Could not load batches'));
  }, []);

  const handleChange = (e) => {
    setTest({ ...test, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    console.log(test);  // Add this line to check the data being sent
  
    try {
      await axios.post('http://localhost:8081/api/tests/add', test);
      setMessage('✅ Test added successfully!');
      setTest({
        batchId: '',
        courseId: '',
        date: '',
        time: '',
        mode: 'Offline',
      });
    } catch (err) {
      console.error('Error:', err.response.data);  // Log the error response for debugging
      setMessage('❌ Failed to add test. Try again.');
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(''), 2000);
    }
  };
  

  return (
    <div className="container text-center shadow p-4 rounded position-absolute start-50 top-50 translate-middle" style={{ width: "900px", marginLeft: "130px" ,marginTop:"50px"}} >
      <IoMdCloseCircle size={28} style={{ position: 'absolute', top: '15px', right: '15px', cursor: 'pointer', color: '#dc3545' }}
         onClick={() => navigate(-1)}/>

      <h3 className="text-center text-danger mb-4 fw-bold">Add Test</h3>

      {message && (
        <p style={{ color: message.includes('❌') ? 'red' : 'green' }}>
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-2 form-floating">
          <select name="batchId" className="form-select" value={test.batchId} onChange={handleChange} required >
            <option value="">Select Batch</option>
            {batches.map((batch, i) => (
              <option key={i} value={batch.id}>
                {batch.batchName}
              </option>
            ))}
          </select>
          <label>Batch</label>
        </div>

        <div className="mb-2 form-floating">
          <select name="courseId" className="form-select" value={test.courseId} onChange={handleChange} required >
            <option value="">Select Course</option>
            {courses.map((course, i) => (
              <option key={i} value={course.id}>
                {course.courseName}
              </option>
            ))}
          </select>
          <label>Course</label>
        </div>

        <div className="mb-2 form-floating">
          <input type="date" name="date" className="form-control" value={test.date} onChange={handleChange} required />
          <label>Date</label>
        </div>

        <div className="mb-2 form-floating">
          <input type="time" name="time" className="form-control" value={test.time} onChange={handleChange} required />
          <label>Time</label>
        </div>

        <div className="mb-2 form-floating">
          <select name="mode" className="form-select" value={test.mode} onChange={handleChange} required>
            <option value="Offline">Offline</option>
            <option value="Online">Online</option>
          </select>
          <label>Mode</label>
        </div>

        <button type="submit" className="btn btn-outline-danger w-20" disabled={loading}>
          {loading ? 'Adding...' : 'Add Test'}
        </button>
      </form>
    </div>
  );
};

export default AddTest;
