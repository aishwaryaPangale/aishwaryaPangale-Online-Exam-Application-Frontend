import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IoMdCloseCircle } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

const ViewTest = () => {
    const [tests, setTests] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchTests();
    }, []);

    const fetchTests = async () => {
        try {
            const res = await axios.get('http://localhost:8081/api/tests/all');
            // Filter only non-disabled tests
            const activeTests = res.data.filter(test => !test.disabled);
            setTests(activeTests);
        } catch (error) {
            console.error("Error fetching tests:", error);
        }
    };

    const disableTest = async (id) => {
        try {
            await axios.put(`http://localhost:8081/api/tests/disable/${id}`);
            fetchTests(); // refresh list after disabling
        } catch (error) {
            console.error("Error disabling test:", error);
        }
    };

    return (
        <div className="container mt-4 text-center shadow-lg mt-3 p-4 rounded position-absolute start-50 top-50 translate-middle"
            style={{ width: "800px", marginLeft: "100px" }}>
            <IoMdCloseCircle
                size={28}
                className="position-absolute"
                style={{ top: "15px", right: "15px", cursor: "pointer", color: "#dc3545" }}
                onClick={() => navigate(-1)}
            />
            <h3 className="text-danger mb-4 display-7 text-danger fw-bold fade-in-up glow-text animate__animated animate__rotateIn">View Tests</h3>
            <table className="table table-bordered">
                <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Batch</th>
                        <th>Subject</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Mode</th>
                        <th>Action</th>
                        <th>Disable</th>
                    </tr>
                </thead>
                <tbody>
                    {tests.length === 0 ? (
                        <tr>
                            <td colSpan="8">No active tests available.</td>
                        </tr>
                    ) : (
                        tests.map((test) => (
                            <tr key={test.id}>
                                <td>{test.id}</td>
                                <td>{test.batch}</td>
                                <td>{test.subject}</td>
                                <td>{test.date}</td>
                                <td>{test.time}</td>
                                <td>{test.mode}</td>
                                <td>{test.action ? 'Not Attended' : 'Attended'}</td>
                                <td>
                                    <button className="btn btn-danger btn-sm" onClick={() => disableTest(test.id)}>
                                        Disable
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ViewTest;
