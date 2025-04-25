import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { IoMdCloseCircle } from "react-icons/io";
import { FaEdit, FaTrash } from "react-icons/fa";

const ViewCourse = () => {
    const [courses, setCourses] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [message, setMessage] = useState('');
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [selectedCourseId, setSelectedCourseId] = useState(null);

    const [showUpdateConfirmModal, setShowUpdateConfirmModal] = useState(false);
    const [selectedUpdateCourseId, setSelectedUpdateCourseId] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const res = await axios.get('http://localhost:8081/api/courses/all');
            setCourses(res.data);
            setFilteredCourses(res.data);
        } catch (err) {
            setMessage('❌ Failed to load courses');
        }
    };

    const confirmDeleteCourse = (id) => {
        setSelectedCourseId(id);
        setShowConfirmModal(true);
    };

    const deleteCourse = async () => {
        try {
            await axios.delete(`http://localhost:8081/api/courses/delete/${selectedCourseId}`);
            const updated = courses.filter(course => course.id !== selectedCourseId);
            setCourses(updated);
            setFilteredCourses(updated);
            setMessage('✅ Course deleted successfully!');
        } catch (error) {
            setMessage('❌ Failed to delete course. Please try again.');
        } finally {
            setShowConfirmModal(false);
            setTimeout(() => setMessage(''), 2000);
        }
    };

    const confirmUpdateCourse = (id) => {
        setSelectedUpdateCourseId(id);
        setShowUpdateConfirmModal(true);
    };

    const updateCourse = () => {
        navigate(`/UpdateCourse/${selectedUpdateCourseId}`);
    };

    const handleSearch = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        const filtered = courses.filter(course =>
            course.courseName.toLowerCase().includes(term.toLowerCase())
        );
        setFilteredCourses(filtered);
    };

    return (
        <div className="container mt-4 text-center shadow-lg p-4 rounded position-absolute start-50 top-50 translate-middle" 
        style={{
            width:"900px",
            marginLeft:"130px",
            marginTop:"60px",
            maxHeight: '500px',
            overflowY: 'auto',
            border: '1px solid #ccc',
            borderRadius: '8px',
            padding: '10px',
            backgroundColor: '#f8f9fa',
            scrollbarWidth: 'none',      // Firefox
            msOverflowStyle: 'none'      // IE/Edge
          }} >
            <IoMdCloseCircle
                size={28}
                className="position-absolute"
                style={{ top: "15px", right: "15px", cursor: "pointer", color: "#dc3545" }}
                onClick={() => navigate(-1)}
            />
            <h4 className="text-center mb-3 text-danger fw-bold">View All Courses</h4>

            <div className="text-start mb-3">
                <input
                    type="text"
                    className="form-control w-50 d-inline border border-danger-subtle"
                    placeholder="Search courses by name..."
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </div>

            {message && <p style={{ color: message.includes("❌") ? "red" : "green" }}>{message}</p>}

            <table className="table table-bordered table-striped table-hover">
                <thead className="table-dark text-center">
                    <tr>
                        <th>Name</th><th>Type</th><th>Duration</th><th>Content</th><th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredCourses.map(course => (
                        <tr key={course.id}>
                            <td>{course.courseName}</td>
                            <td>{course.courseType}</td>
                            <td>{course.courseDuration}</td>
                            <td>{course.courseContent}</td>
                            <td>
                                <button className="view-category-icon-btn view-category-delete-btn me-2" onClick={() => confirmDeleteCourse(course.id)}>
                                    <FaTrash />
                                </button>
                                <button className="view-category-icon-btn view-category-edit-btn" onClick={() => confirmUpdateCourse(course.id)}>
                                    <FaEdit />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Delete Confirmation Modal */}
            {showConfirmModal && (
                <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
                    <div className="modal-dialog modal-dialog-centered" style={{ width: "400px" }}>
                        <div className="modal-content">
                            <div className="modal-header bg-danger text-white">
                                <h5 className="modal-title">Confirm Delete</h5>
                                <button type="button" className="btn-close" onClick={() => setShowConfirmModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <p>Are you sure you want to delete this course?</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowConfirmModal(false)}>Cancel</button>
                                <button type="button" className="btn btn-danger" onClick={deleteCourse}>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Update Confirmation Modal */}
            {showUpdateConfirmModal && (
                <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
                    <div className="modal-dialog modal-dialog-centered" style={{ width: "400px" }}>
                        <div className="modal-content">
                            <div className="modal-header bg-danger text-white">
                                <h5 className="modal-title">Confirm Update</h5>
                                <button type="button" className="btn-close" onClick={() => setShowUpdateConfirmModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <p>Are you sure you want to update this course?</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowUpdateConfirmModal(false)}>Cancel</button>
                                <button type="button" className="btn btn-danger" onClick={updateCourse}> Update</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ViewCourse;
