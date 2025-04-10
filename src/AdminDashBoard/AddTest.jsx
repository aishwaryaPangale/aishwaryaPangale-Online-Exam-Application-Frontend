import React, { useState } from 'react';
import axios from 'axios';
import { IoMdCloseCircle } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

const AddTest = () => {
    const [message, setMessage] = useState('');
    const [test, setTest] = useState({
        batch: '',
        subject: 'C',
        date: '',
        time: '',
        mode: 'Offline',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setTest({ ...test, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:8081/api/tests/add', test);
        setMessage("✅ Test added successfully");
        setTest({ batch: '', subject: 'C', date: '', time: '', mode: 'Offline' });
    };

    return (
        <div className="container mt-4 text-center shadow-lg p-4 rounded position-absolute start-50 top-50 translate-middle" style={{ width: "700px", marginLeft: "100px" }}>
            <IoMdCloseCircle
                size={28}
                className="position-absolute"
                style={{ top: "15px", right: "15px", cursor: "pointer", color: "#dc3545" }}
                onClick={() => navigate(-1)}
            />

            {message && <p style={{ color: message.includes("❌") ? "red" : "green" }}>{message}</p>}

            <h3 className="text-danger mb-4 display-7 text-danger fw-bold fade-in-up glow-text animate__animated animate__rotateIn">Add Test</h3>

            <form onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                    <input
                        type="date"
                        className="form-control"
                        id="batch"
                        name="batch"
                        value={test.batch}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="batch">Batch (Date)</label>
                </div>

                <div className="form-floating mb-3">
                    <select
                        className="form-select"
                        id="subject"
                        name="subject"
                        value={test.subject}
                        onChange={handleChange}
                        required
                    >
                        <option value="C">C</option>
                        <option value="Cpp">Cpp</option>
                        <option value="Java">Java</option>
                        <option value="Python">Python</option>
                        <option value="Aptitude">Aptitude</option>
                    </select>
                    <label htmlFor="subject">Subject</label>
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

                <button type="submit" className="btn btn-outline-danger shadow-sm">Submit</button>
            </form>
        </div>
    );
};

export default AddTest;
