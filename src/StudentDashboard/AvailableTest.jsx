import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AvailableTest = () => {
  const [tests, setTests] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const username = localStorage.getItem("username");

  useEffect(() => {
    fetchAvailableTests();
  }, []);

  const fetchAvailableTests = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/api/tests/available?username=${username}`);
      console.log("Response from backend:", response.data);

      // Filter out tests with future dates
      const filteredTests = response.data.filter(test => {
        const currentTime = new Date();
        currentTime.setHours(0, 0, 0, 0); // Set time to midnight for comparison
    
        const testDateTime = new Date(test.date);
        testDateTime.setHours(0, 0, 0, 0); // Set test date time to midnight for comparison
    
        return currentTime <= testDateTime; // Only include tests that are not in the future
      });

      setTests(filteredTests); // Set the filtered tests
      setError('');
    } catch (err) {
      console.error("Error fetching tests:", err);
      setError('Failed to fetch tests. Please try again later.');
      setTests([]);
    }
  };

  const handleStartTest = (id) => {
    console.log(id);
    navigate(`/startTest/${id}`);
  };

  return (
    <div className="container mt-5 p-4 bg-white shadow rounded position-absolute start-50 top-50 translate-middle" style={{ maxWidth: "800px", marginLeft: "100px" }}>
      <h2>Available Tests</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      {tests.length > 0 ? (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Id</th>
              <th>Date</th>
              <th>Batch Name</th>
              <th>Course Name</th>
              <th>Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {tests.map((test) => {
              const testDateTime = new Date(`${test.date}T${test.time}`);
              const currentTime = new Date();
              const hasStarted = currentTime >= testDateTime;

              return (
                <tr key={test.id}>
                  <td>{test.id}</td>
                  <td>{test.date}</td>
                  <td>{test.batchName}</td>
                  <td>{test.courseName}</td>
                  <td>{test.time}</td>
                  <td>
                    <button
                      className={`btn ${hasStarted ? 'btn-success' : 'btn-primary'}`}
                      disabled={!hasStarted}
                      onClick={() => hasStarted && handleStartTest(test.id)} // Navigate when green
                    >
                      {hasStarted ? 'Start Test' : 'Not Started'}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p>No tests found.</p>
      )}
    </div>
  );
};

export default AvailableTest;
