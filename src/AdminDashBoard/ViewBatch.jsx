import React, { useEffect, useState } from "react";
import axios from "axios";

const ViewBatch = () => {
  const [batches, setBatches] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios.get("http://localhost:8081/api/batches/all")
      .then((res) => {
        console.log("Fetched batches:", res.data); // 👈 check this in browser dev console
        setBatches(res.data);
      })
      .catch((err) => console.error("Error loading batches:", err));
  }, []);
  

  const filtered = batches.filter((b) =>
    b.batch_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-4 p-4 shadow text-center mt-4 shadow p-4 bg-transparent position-absolute start-50 top-50 translate-middle" style={{ maxWidth: "600px" }}>
      <h3 className="text-center text-danger mb-4 fw-bold">View Batches</h3>

      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search batch by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <table className="table table-bordered">
        <thead className="table-dark text-center">
          <tr>
            <th>Batch Name</th>
            <th>Course</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {filtered.length > 0 ? (
            filtered.map((batch, index) => (
              <tr key={index}>
                <td>{batch.batch_name}</td>
                <td>{batch.course_name}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2">No matching batches found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ViewBatch;
