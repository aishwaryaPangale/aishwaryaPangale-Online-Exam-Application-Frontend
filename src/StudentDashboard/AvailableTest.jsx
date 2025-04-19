import React, { useState } from 'react';
import axios from 'axios';

const AvailableTestList = () => {
  const [username, setUsername] = useState('');
  const [tests, setTests] = useState([]);
  const [error, setError] = useState('');

  const fetchAvailableTests = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/api/tests/available?username=${username}`);
      console.log("Response from backend:", response.data);  // Log the response data
      setTests(response.data); // Ensure response.data is an array
      setError('');
    } catch (err) {
      console.error("Error fetching tests:", err);  // Log the error
      setError('Failed to fetch tests. Please check the username or try again later.');
      setTests([]);
    }
  };
  

  return (
    <div className="container mt-5 p-4 bg-white shadow rounded w-75 mx-auto position-absolute start-50 top-50 translate-middle" style={{ maxWidth: "700px" }}>
      <h2>Available Tests</h2>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button className="btn btn-primary mt-2" onClick={fetchAvailableTests}>
          Get Available Tests
        </button>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {tests.length > 0 ? (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Date</th>
              <th>Batch ID</th>
              <th>Course ID</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {tests.map((test) => (
              <tr key={test.testId}>
             <td>{test.date}</td>
                <td>{test.batchId}</td>
                <td>{test.courseId}</td>
                <td>{test.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No tests found.</p>
      )}
    </div>
  );
};

export default AvailableTestList;
