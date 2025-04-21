import React, { useState } from 'react';
import axios from 'axios';
import { IoMdCloseCircle } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

const CreatePaperSet = () => {
  const [tests, setTests] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [selectedTestId, setSelectedTestId] = useState("");
  const [csvFile, setCsvFile] = useState(null);
  const [activeTab, setActiveTab] = useState("manual");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const navigate = useNavigate();

  const fetchTests = async () => {
    if (tests.length === 0) {
      try {
        const res = await axios.get('http://localhost:8081/api/tests/all');
        setTests(res.data);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const fetchQuestions = async () => {
    if (questions.length === 0) {
      try {
        const res = await axios.get('http://localhost:8081/api/questions/all');
        setQuestions(res.data);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleCheckboxChange = (id) => {
    setSelectedQuestions((prev) =>
      prev.includes(id) ? prev.filter((q) => q !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    const allIds = questions.map(q => q.id);
    setSelectedQuestions(allIds);
  };

  const handleSubmit = async () => {
    if (!selectedTestId || selectedQuestions.length === 0) {
      setAlertType("danger");
      setAlertMessage("Please select a test and at least one question.");
      setTimeout(() => {
        setAlertMessage("");
      }, 2000);
      return;
    }

    const payload = {
      testId: selectedTestId,
      questionIds: selectedQuestions
    };

    try {
      await axios.post("http://localhost:8081/api/paperset/assignQuestions", payload);
      setAlertType("success");
      setAlertMessage("Questions assigned successfully.");
      setTimeout(() => {
        setAlertMessage("");
      }, 2000);
      setSelectedQuestions([]);
      setSelectedTestId("");
    } catch (err) {
      setAlertType("danger");
      setAlertMessage("Failed to assign questions.");
      setTimeout(() => {
        setAlertMessage("");
      }, 2000);
    }
  };

  const handleCSVUpload = async () => {
    if (!csvFile) {
      setAlertType("danger");
      setAlertMessage("Please select a CSV file.");
      setTimeout(() => {
        setAlertMessage("");
      }, 2000);
      return;
    }

    const formData = new FormData();
    formData.append("file", csvFile);

    try {
      await axios.post("http://localhost:8081/api/questions/upload-csv", formData);
      setAlertType("success");
      setAlertMessage("CSV uploaded and questions assigned.");
      setTimeout(() => {
        setAlertMessage("");
      }, 2000);
      setCsvFile(null);
    } catch (err) {
      setAlertType("danger");
      setAlertMessage("CSV Upload failed.");
      setTimeout(() => {
        setAlertMessage("");
      }, 2000);
    }
  };

  return (
    <div className="container shadow p-4 bg-light rounded position-absolute start-50 top-50 translate-middle" style={{ width: "950px", marginLeft: "130px", marginTop: "80px" }}>
      <IoMdCloseCircle
        size={28}
        className="position-absolute"
        style={{ top: "15px", right: "15px", cursor: "pointer", color: "#dc3545" }}
        onClick={() => navigate(-1)}
      />

      <h4 className="text-center text-danger mb-4">Set Paper</h4>

      {/* Alert Message */}
      {alertMessage && (
        <div className={`alert alert-${alertType} alert-dismissible fade show`} role="alert">
          {alertMessage}
          <button type="button" className="btn-close" onClick={() => setAlertMessage("")}></button>
        </div>
      )}

      {/* Tab Buttons */}
      <div className="d-flex justify-content-center mb-3">
        <button
          className={`btn me-2 ${activeTab === "manual" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => setActiveTab("manual")}
        >
          Manual Assign
        </button>
        <button
          className={`btn ${activeTab === "bulk" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => setActiveTab("bulk")}
        >
          Bulk Assign
        </button>
      </div>

      {/* Common Test Dropdown */}
      <div className="form-group mb-3">
        <label>Select Test</label>
        <select
          className="form-select"
          value={selectedTestId}
          onClick={fetchTests}
          onChange={(e) => setSelectedTestId(e.target.value)}
        >
          <option value="">-- Choose a Test --</option>
          {tests.map((test) => (
            <option key={test.id} value={test.id}>
              {test.subject} | {test.batch} | {test.date} ({test.mode})
            </option>
          ))}
        </select>
      </div>

      {/* MANUAL TAB */}
      {activeTab === "manual" && (
        <>
          <h5 className="mt-3">Select Questions</h5>
          <div className="mb-2">
            <button className="btn btn-sm btn-outline-dark" onClick={handleSelectAll}>Select All</button>
          </div>
          <div
            className="mb-3 border p-2 rounded bg-white"
            style={{ maxHeight: "300px", overflowY: "scroll", scrollbarWidth: "thin" }}
            onMouseEnter={fetchQuestions}
          >
            {questions.length === 0 ? (
              <p className="text-muted">Hover to load questions...</p>
            ) : (
              questions.map((q) => (
                <div key={q.id} className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={selectedQuestions.includes(q.id)}
                    onChange={() => handleCheckboxChange(q.id)}
                  />
                  <label className="form-check-label">{q.question}</label>
                </div>
              ))
            )}
          </div>

          <div className="text-center">
            <button className="btn btn-outline-danger shadow-sm" onClick={handleSubmit}>
              Assign Selected Questions
            </button>
          </div>
        </>
      )}

      {/* BULK TAB */}
      {activeTab === "bulk" && (
        <>
          <h5 className="mt-4 text-center text-success">Upload CSV for Bulk Assignment</h5>
          <div className="d-flex justify-content-center align-items-center gap-2 mb-3">
            <input
              type="file"
              accept=".csv"
              onChange={(e) => setCsvFile(e.target.files[0])}
              className="form-control w-50"
            />
            <button className="btn btn-success" onClick={handleCSVUpload}>
              Upload
            </button>
          </div>
          <p className="text-muted text-center">CSV Format: Question, Option1, Option2, Option3, Option4, Correct Answer</p>
        </>
      )}
    </div>
  );
};

export default CreatePaperSet;
