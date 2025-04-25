import React, { useState, useEffect } from "react";
import axios from "axios";

const StudentWiseReport = () => {
  const [results, setResults] = useState([]);
  const [studentUsername, setStudentUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 5;

  const fetchTestResults = async (username = "") => {
    setIsLoading(true);
    try {
      const response = username
        ? await axios.get(`http://localhost:8081/api/student/report/${username}`)
        : await axios.get("http://localhost:8081/api/student/all");

      setResults(response.data);
    } catch (error) {
      console.error("Error fetching test results", error);
      setResults([]);
    }
    setIsLoading(false);
    setCurrentPage(1);
  };

  useEffect(() => {
    fetchTestResults();
  }, []);

  const handleSearch = () => {
    fetchTestResults(studentUsername);
  };

  const handleClear = () => {
    setStudentUsername("");
    fetchTestResults();
  };

  // Pagination Logic
  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = results.slice(indexOfFirstResult, indexOfLastResult);
  const totalPages = Math.ceil(results.length / resultsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  return (
    <div
      className="container row justify-content-center p-4 bg-white shadow rounded position-absolute start-50 top-50 translate-middle"
      style={{
        width: "900px",
        maxHeight: "700px",
        overflowY: "auto",
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "10px",
        backgroundColor: "#f8f9fa",
        marginLeft:"130px",
        marginTop:"40px"
      }}
    >
      <h4 className="text-center text-danger mb-4 fw-bold">Student Test Results</h4>

      {/* Search Section */}
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter student username"
          value={studentUsername}
          onChange={(e) => setStudentUsername(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleSearch}>
          Search
        </button>
        {studentUsername && (
          <button className="btn btn-secondary ms-2" onClick={handleClear}>
            Clear
          </button>
        )}
      </div>

      {/* Table or Loader */}
      {isLoading ? (
        <p className="text-center mt-3">Loading...</p>
      ) : results.length === 0 ? (
        <p className="text-center text-danger">No results found.</p>
      ) : (
        <>
          <table className="table table-bordered table-striped mt-3 text-center">
            <thead className="table-dark">
              <tr>
                <th>Student Name</th>
                <th>Test ID</th>
                <th>Total Questions</th>
                <th>Attempted</th>
                <th>Correct</th>
                <th>Wrong</th>
                <th>Total Marks</th>
              </tr>
            </thead>
            <tbody>
              {currentResults.map((result, index) => (
                <tr key={index}>
                  <td>{result.studentName}</td>
                  <td>{result.testId}</td>
                  <td>{result.totalQuestions}</td>
                  <td>{result.attemptedQuestions}</td>
                  <td>{result.correctAnswers}</td>
                  <td>{result.wrongAnswers}</td>
                  <td>{result.totalMarks}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="d-flex justify-content-end align-items-center gap-2 mt-3">
              <button className="btn btn-outline-primary" onClick={prevPage} disabled={currentPage === 1}>
                Prev
              </button>
              {[...Array(totalPages)].map((_, idx) => (
                <button
                  key={idx + 1}
                  className={`btn ${currentPage === idx + 1 ? "btn-primary" : "btn-outline-primary"}`}
                  onClick={() => paginate(idx + 1)}
                >
                  {idx + 1}
                </button>
              ))}
              <button className="btn btn-outline-primary" onClick={nextPage} disabled={currentPage === totalPages}>
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default StudentWiseReport;
