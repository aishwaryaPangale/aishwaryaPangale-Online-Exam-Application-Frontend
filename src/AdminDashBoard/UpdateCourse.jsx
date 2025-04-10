import React, { useState, useEffect } from 'react';
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

    const [Message, setMessage] = useState('');

    useEffect(() => {
        const fetchCourse = async () => {
            const res = await axios.get('http://localhost:8081/api/courses/all');
            const selected = res.data.find(c => c.id === parseInt(id));
            if (selected) setCourse(selected);
        };
        fetchCourse();
    }, [id]);

    const handleChange = e => {
        setCourse({ ...course, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await axios.put('http://localhost:8081/api/courses/update', course);
            setMessage('✅ Course updated successfully!');
            setTimeout(() => {
                navigate("/viewcourses");
            }, 500); // Delay navigation to show the message
        } catch (error) {
            setMessage('❌ Failed to update course. Please try again.');
        }
    };

    return (
        <div className="container mt-4 text-center shadow-lg mt-3 p-4 rounded position-absolute start-50 top-50 translate-middle" style={{ width: "700px",marginLeft:"100px"  }}>
            <IoMdCloseCircle
                size={28}
                className="position-absolute"
                style={{ top: "15px", right: "15px", cursor: "pointer", color: "#dc3545" }}
                onClick={() => navigate(-1)}
            />
            <h1 className="text-danger mb-4 display-7 text-danger fw-bold fade-in-up glow-text animate__animated animate__rotateIn">Update Course</h1>
            <form onSubmit={handleSubmit}>

                <div className="form-floating mb-3">
                    <input
                        type="text"
                        name="courseName"
                        className="form-control"
                        id="courseName"
                        placeholder="Course Name"
                        value={course.courseName}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="courseName">Course Name</label>
                </div>

                <div className="form-floating mb-3">
                    <select
                        name="courseType"
                        className="form-select"
                        id="courseType"
                        value={course.courseType}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Course Type</option>
                        <option value="Paid">Paid</option>
                        <option value="Free">Free</option>
                    </select>
                    <label htmlFor="courseType">Course Type</label>
                </div>

                <div className="form-floating mb-3">
                    <input
                        type="text"
                        name="courseDuration"
                        className="form-control"
                        id="courseDuration"
                        placeholder="Duration"
                        value={course.courseDuration}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="courseDuration">Course Duration</label>
                </div>

                <div className="form-floating mb-3">
                    <input
                        type="text"
                        name="courseContent"
                        className="form-control"
                        id="courseContent"
                        placeholder="Course Content"
                        value={course.courseContent}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="courseContent">Course Content</label>
                </div>

                <button type="submit" className="btn btn-outline-danger shadow-sm mt-4">Update Course</button>
            </form>

        </div>
    );
};

export default UpdateCourse;
