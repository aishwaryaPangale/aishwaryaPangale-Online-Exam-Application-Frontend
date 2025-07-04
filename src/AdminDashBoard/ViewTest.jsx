import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IoMdCloseCircle } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

const ViewTest = () => {
    const [tests, setTests] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const testsPerPage = 5;
    const navigate = useNavigate();

    const fetchTests = async () => {
        try {
            const res = await axios.get("http://localhost:8081/api/tests/all");
            console.log("Fetched Tests:", res.data);
            setTests(res.data);
        } catch (error) {
            console.error("Error fetching tests:", error);
        }
    };

    useEffect(() => {
        fetchTests();
    }, []);

    const disableTest = async (id) => {
        console.log("Test ID to disable:", id);
        try {
            await axios.put(`http://localhost:8081/api/tests/disable/${id}`);
            await axios.put(`http://localhost:8081/api/tests/submit/${id}`);
            fetchTests();
        } catch (error) {
            console.error("Error disabling or updating test:", error);
        }
    };

    const searchedTests = tests.filter(test =>
        !test.disable &&
        (
            test.courseName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            test.batchName?.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    const totalPages = Math.ceil(searchedTests.length / testsPerPage);
    const indexOfLastTest = currentPage * testsPerPage;
    const indexOfFirstTest = indexOfLastTest - testsPerPage;
    const currentTests = searchedTests.slice(indexOfFirstTest, indexOfLastTest);

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const goToPage = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="container mt-5 text-center shadow-lg p-4 rounded position-absolute start-50 top-50 translate-middle" style={{ width: "900px", marginLeft: "130px" }}>
            <IoMdCloseCircle
                size={28}
                className="position-absolute"
                style={{ top: "15px", right: "15px", cursor: "pointer", color: "#dc3545" }}
                onClick={() => navigate(-1)}
            />
            <h4 className="text-danger mb-4 fw-bold">View Tests</h4>

            <div className="mb-3 text-start">
                <input
                    type="text"
                    className="form-control w-50 d-inline border border-danger-subtle"
                    placeholder="Search by Batch or Subject"
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(1);
                    }}
                />
            </div>

            <div className="table-responsive hide-scrollbar" style={{ overflowX: 'scroll', maxWidth: '100%' }}>
                <table className="table table-bordered" style={{ minWidth: '1000px' }}>
                    <thead className="table-dark text-center align-middle">
                        <tr>
                            <th>ID</th>
                            <th>Batch</th>
                            <th>Subject</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Mode</th>
                            {/* <th>Action</th> */}
                            <th>Action</th>
                            <th>Paper Set</th>
                            <th>Submitted Students</th>
                        </tr>
                    </thead>
                    <tbody className="text-center align-middle">
                        {currentTests.length === 0 ? (
                            <tr>
                                <td colSpan="10">No active tests found.</td>
                            </tr>
                        ) : (
                            currentTests.map((test) => (
                                <tr key={test.id}>
                                    <td>{test.id}</td>
                                    <td>{test.batchName}</td>
                                    <td>{test.courseName}</td>
                                    <td>{test.date}</td>
                                    <td>{test.time}</td>
                                    <td>{test.mode}</td>
                                    {/* <td>{test.action ? 'Not Attended' : 'Attended'}</td> */}
                                    <td>
                                        {test.submittedStudentIds
                                            ? <span className="badge bg-primary">Attended</span>
                                            : <span className="badge bg-warning text-dark">Not Attended</span>
                                        }
                                    </td>
                                    <td>{test.ispaperSet ? 'Yes' : 'No'}</td>
                                    <td>{
                                        test.submittedStudentIds
                                            ? [...new Set(test.submittedStudentIds.split(','))].join(', ')
                                            : "No Submitted"
                                    }</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {totalPages > 1 && (
                <div className="d-flex justify-content-end mt-3">
                    <div className="d-flex gap-2">
                        <button
                            className="btn btn-sm border-0 text-primary"
                            onClick={handlePrevPage}
                            disabled={currentPage === 1}
                            style={{ background: "none" }}
                        >
                            &laquo; Prev
                        </button>

                        {[...Array(totalPages)].map((_, idx) => (
                            <button
                                key={idx + 1}
                                onClick={() => goToPage(idx + 1)}
                                className={`btn btn-sm fw-bold ${currentPage === idx + 1
                                    ? "text-primary border-bottom border-2 border-primary"
                                    : "text-secondary"
                                    }`}
                                style={{ background: "none", borderRadius: 0 }}
                            >
                                {idx + 1}
                            </button>
                        ))}

                        <button
                            className="btn btn-sm border-0 text-primary"
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                            style={{ background: "none" }}
                        >
                            Next &raquo;
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ViewTest;
