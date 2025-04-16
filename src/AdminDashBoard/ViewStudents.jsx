import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { IoMdCloseCircle } from "react-icons/io";
import "animate.css";
import {FaEdit,FaTrash} from "react-icons/fa";

const ViewStudent = () => {
  const [students, setStudents] = useState([]);
  const [message, setMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetchStudents();
    if (location.state?.message) {
      setMessage(location.state.message);
      setTimeout(() => setMessage(""), 3000);
    }
  }, [location]);

  const fetchStudents = async () => {
    try {
      const res = await axios.get("http://localhost:8081/api/register");
      setStudents(res.data);
    } catch (error) {
      console.error("Error fetching students", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8081/api/register/${id}`);
      const updated = students.filter((s) => s.id !== id);
      setStudents(updated);
      setMessage("✅ Student deleted successfully");
      setTimeout(() => setMessage(""), 2000);
    } catch (error) {
      console.error("Error deleting student", error);
      setMessage("❌ Error deleting student");
    }
  };

  const handleEdit = (id) => {
    navigate(`/updatestudent/${id}`);
  };

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.course.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = filteredStudents.slice(indexOfFirst, indexOfLast);

  const goToPage = (num) => setCurrentPage(num);
  const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  return (
    <div className="container shadow-lg position-absolute start-50 top-50 translate-middle w-75 p-4" style={{ marginLeft: "110px" }}>
      <IoMdCloseCircle
        size={28}
        className="position-absolute"
        style={{ top: "15px", right: "15px", cursor: "pointer", color: "#dc3545", zIndex: 9999 }}
        onClick={() => navigate(-1)}
      />

      <h2 className="mb-4 text-center text-danger display-7 fw-bold animate__animated animate__rotateIn">
        All Students
      </h2>

      {message && (
        <div style={{ color: message.includes("❌") ? "red" : "green", backgroundColor: "white", padding: "6px 12px", borderRadius: "4px" }}>
          {message}
        </div>
      )}

      {/* Search Box */}
      <div className="mb-3 text-start">
        <input
          type="text"
          className="form-control w-50 d-inline border border-danger-subtle"
          placeholder="Search by name, email or course"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      {/* Student Table */}
      <table className="table table-bordered table-striped table-hover">
        <thead className="table-dark text-center">
          <tr>
            <th>Full Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Course</th>
            <th>Batch</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {currentItems.length > 0 ? (
            currentItems.map((student) => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.contact}</td>
                <td>{student.course}</td>
                <td>{student.batch}</td>
                <td>
                  {/* <button className="btn btn-sm btn-primary me-2" onClick={() => handleEdit(student.id)}>Edit</button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(student.id)}>Delete</button> */}
                  <button className="view-category-icon-btn view-category-edit-btn" onClick={() => handleEdit(student.id)}>
                      <FaEdit  />
                    </button>
                    <button
                      className="view-category-icon-btn view-category-delete-btn"
                      onClick={() => handleDelete(student.id)}
                    >
                      <FaTrash/>
                    </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No matching students found.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="d-flex  justify-content-end align-items-center gap-2 mt-3 ">
          <button className="btn btn-outline-primary" onClick={prevPage} disabled={currentPage === 1}>
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
          <button className="btn btn-outline-primary" onClick={nextPage} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ViewStudent;