import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoMdCloseCircle } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const ViewBatch = () => {
  const [batches, setBatches] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8081/api/batches/all")
      .then((res) => setBatches(res.data))
      .catch((err) => console.error("Error loading batches:", err));
  }, []);

  const filtered = batches.filter((b) =>
    b.batchName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = filtered.slice(indexOfFirst, indexOfLast);

  const goToPage = (num) => setCurrentPage(num);
  const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  return (
    <div className="container mt-4 p-4 shadow text-center bg-transparent position-absolute start-50 top-50 translate-middle"
    style={{ width: "900px", marginLeft: "130px"}}>
      <IoMdCloseCircle
        size={28}
        className="position-absolute"
        style={{ top: "15px", right: "15px", cursor: "pointer", color: "#dc3545" }}
        onClick={() => navigate(-1)}
      />

      <h4 className="text-center text-danger mb-4 fw-bold">View Batches</h4>

      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search batch by name..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setCurrentPage(1);
        }}
      />

      <table className="table table-bordered">
        <thead className="table-dark text-center">
          <tr>
            <th>Batch Name</th>
            <th>Course</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {currentItems.length > 0 ? (
            currentItems.map((batch, index) => (
              <tr key={index}>
                <td>{batch.batchName}</td>
                <td>{batch.courseName}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2">No matching batches found</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-end align-items-center gap-2 mt-3">
          <button
            className="btn btn-outline-primary"
            onClick={prevPage}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx + 1}
              className={`btn ${currentPage === idx + 1 ? "btn-primary" : "btn-outline-primary"}`}
              onClick={() => goToPage(idx + 1)}
            >
              {idx + 1}
            </button>
          ))}
          <button
            className="btn btn-outline-primary"
            onClick={nextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ViewBatch;
