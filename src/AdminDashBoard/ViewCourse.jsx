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
    const navigate = useNavigate();

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const res = await axios.get('http://localhost:8081/api/courses/all');
            setCourses(res.data);
            setFilteredCourses(res.data); // Initialize filtered list
        } catch (err) {
            setMessage('❌ Failed to load courses');
        }
    };

    const deleteCourse = async (id) => {
        try {
            await axios.delete(`http://localhost:8081/api/courses/delete/${id}`);
            const updated = courses.filter(course => course.id !== id);
            setCourses(updated);
            setFilteredCourses(updated);
            setMessage('✅ Course deleted successfully!');
            setTimeout(() => setMessage(''), 2000);
        } catch (error) {
            setMessage('❌ Failed to delete course. Please try again.');
        }
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
        <div className="container mt-4 text-center shadow-lg p-4 rounded position-absolute start-50 top-50 translate-middle" style={{ width: "900px", marginLeft: "100px" }}>
            <IoMdCloseCircle
                size={28}
                className="position-absolute"
                style={{ top: "15px", right: "15px", cursor: "pointer", color: "#dc3545" }}
                onClick={() => navigate("/admin")}
            />
            <h1 className="text-danger text-center mb-4">View All Courses</h1>

            <div class="text-start">
            <input
                type="text"
                className="form-control mb-3 w-50 mx-auto"
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
                                <button className="view-category-icon-btn view-category-edit-btn " onClick={() => deleteCourse(course.id)}>
                                    <FaTrash />
                                </button>
                                <button className="view-category-icon-btn view-category-delete-btn" onClick={() => navigate(`/UpdateCourse/${course.id}`)}>
                                    <FaEdit />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ViewCourse;
