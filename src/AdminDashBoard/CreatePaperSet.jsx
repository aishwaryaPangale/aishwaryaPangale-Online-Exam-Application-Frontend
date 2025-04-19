import React, { useState } from 'react';
import axios from 'axios';
import { IoMdCloseCircle } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

const CreatePaperSet = () => {
  const [tests, setTests] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [selectedTestId, setSelectedTestId] = useState("");
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

  const handleSubmit = async () => {
    if (!selectedTestId || selectedQuestions.length === 0) {
      alert("Please select a test and at least one question.");
      return;
    }

    const payload = {
      testId: selectedTestId,
      questionIds: selectedQuestions
    };

    try {
      await axios.post("http://localhost:8081/api/paperset/assignQuestions", payload);
      alert("Questions assigned to test successfully.");
      setSelectedQuestions([]);
      setSelectedTestId("");
    } catch (err) {
      alert("Failed to assign questions.");
    }
  };

  return (
    <div className="container mt-4 shadow p-4 bg-light rounded position-absolute start-50 top-50 translate-middle" style={{ width: "800px", marginLeft: "100px" }}>
      <IoMdCloseCircle
        size={28}
        className="position-absolute"
        style={{ top: "15px", right: "15px", cursor: "pointer", color: "#dc3545" }}
        onClick={() => navigate(-1)}
      />
      <h3 className="text-center text-danger mb-3 display-7 fw-bold">Set Paper</h3>

      {/* Select Test */}
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

      <h5 className="mt-4">Select Questions</h5>
      <div
        className="mb-3 border p-2 rounded"
        style={{ maxHeight: "300px", overflowY: "auto" }}
        onMouseEnter={fetchQuestions}
      >
        {questions.length === 0 ? (
          <p className="text-muted">Hover here to load questions...</p>
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
        <button className="btn btn-outline-danger shadow-sm mt-4" onClick={handleSubmit}>
          Assign Questions
        </button>
      </div>
    </div>
  );
};

export default CreatePaperSet;
