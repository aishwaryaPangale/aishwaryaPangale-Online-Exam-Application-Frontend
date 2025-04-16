import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IoMdCloseCircle } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

const AddTest = () => {
    const [message, setMessage] = useState('');
    const [test, setTest] = useState({
        batchId: '',
        courseId: '',
        date: '',
        time: '',
        mode: 'Offline',
    });
    const [courses, setCourses] = useState([]);
    const [batches, setBatches] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetching course data
        axios
            .get('http://localhost:8081/api/courses/all')
            .then((res) => setCourses(res.data))
            .catch((err) => {
                console.error('Error loading courses:', err);
                setMessage('❌ Failed to load courses');
            });

        // Fetching batch data
        axios
            .get('http://localhost:8081/api/batches/all')
            .then((res) => setBatches(res.data))
            .catch((err) => {
                console.error('Error loading batches:', err);
                setMessage('❌ Failed to load batches');
            });
    }, []);

    const handleChange = (e) => {
        setTest({ ...test, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post('http://localhost:8081/api/tests/add', test);
            setMessage('✅ Test added successfully');
            setTimeout(() => {
                setMessage(''); 
            }, 2000);
        } catch (err) {
            console.error('Error adding test:', err);
            setMessage('❌ Failed to add test');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="container mt-4 text-center shadow-lg p-4 rounded position-absolute start-50 top-50 translate-middle"
            style={{ width: '700px', marginLeft: '100px' }}
        >
            <IoMdCloseCircle
                size={28}
                className="position-absolute"
                style={{ top: '15px', right: '15px', cursor: 'pointer', color: '#dc3545' }}
                onClick={() => navigate(-1)}
            />
            {message && <p style={{ color: message.includes('❌') ? 'red' : 'green' }}>{message}</p>}

            <h3 className="text-danger mb-4 display-7 text-danger fw-bold">Add Test</h3>

            <form onSubmit={handleSubmit}>
                <div className="col-md-6 mb-3 w-100">
                    <div className="form-floating">
                        <select className="form-select" name="batchId" value={test.batchId} onChange={handleChange} required>
                            <option value="">Select Batch</option>
                            {batches.map((batch, index) => (
                                <option key={`batch-${index}`} value={batch.batch_id}>
                                    {batch.batch_name}
                                </option>
                            ))}

                        </select>
                        <label>Batch</label>
                    </div>
                </div>

                <div className="col-md-6 mb-3 w-100">
                    <div className="form-floating">
                        <select className="form-select" name="courseId" value={test.courseId} onChange={handleChange} required>
                            <option value="">Select Course</option>
                            {courses.map((course) => (
                                <option key={`course-${course.id}`} value={course.id}>
                                    {course.courseName}
                                </option>
                            ))}
                        </select>
                        <label>Course</label>
                    </div>
                </div>

                <div className="form-floating mb-3">
                    <input
                        type="date"
                        className="form-control"
                        id="date"
                        name="date"
                        value={test.date}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="date">Test Date</label>
                </div>

                <div className="form-floating mb-3">
                    <input
                        type="time"
                        className="form-control"
                        id="time"
                        name="time"
                        value={test.time}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="time">Time</label>
                </div>

                <div className="form-floating mb-4">
                    <select
                        className="form-select"
                        id="mode"
                        name="mode"
                        value={test.mode}
                        onChange={handleChange}
                        required
                    >
                        <option value="Offline">Offline</option>
                        <option value="Online">Online</option>
                    </select>
                    <label htmlFor="mode">Mode</label>
                </div>

                <button type="submit" className="btn btn-outline-danger shadow-sm">
                    Add Test
                </button>
            </form>
        </div>
    );
};

export default AddTest;
