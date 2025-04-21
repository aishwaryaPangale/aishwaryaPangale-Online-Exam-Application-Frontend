import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const StartTest = () => {
  const { testId } = useParams(); // e.g., /startTest/1
  const [testDetails, setTestDetails] = useState({});
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});

  const studentName = localStorage.getItem("name");

//   const [studentName, setStudentName] = useState("John Doe"); // Replace this with actual student name if available

  useEffect(() => {
    fetchTestData();
  }, [testId]);

  const fetchTestData = async () => {
    try {
      const res = await axios.get(`http://localhost:8081/api/student/startTest?testId=${testId}`);
      console.log("Fetched test data:", res.data);
      setTestDetails(res.data.test);
      setQuestions(res.data.questions);
    } catch (err) {
      console.error('Failed to fetch test data', err);
    }
  };

  const handleOptionChange = (questionId, selectedOption) => {
    setAnswers({ ...answers, [questionId]: selectedOption });
  };

  const handleSubmit = () => {
    const payload = {
      testId,
      studentName,
      answers
    };
    console.log("Submitting Answers", payload);
    alert("Test submitted!");
  };

  return (
    <div className="container mt-5 p-4 bg-white shadow rounded position-absolute start-50 top-50 translate-middle"
      style={{ maxWidth: "800px", marginLeft: "100px" }}>
      <div className="bg-white p-4 rounded shadow">
        <h3 className="mb-3">Student: {studentName}</h3>
        <h4 className="mb-3">Test: {testDetails.courseName} ({testDetails.batchName})</h4>
        <p><strong>Date:</strong> {testDetails.date} | <strong>Time:</strong> {testDetails.time}</p>

        <hr />

        {questions.map((q, index) => (
          <div key={q.id} className="mb-4">
            <p><strong>Q{index + 1}:</strong> {q.question}</p>
            <div>
              {[q.option_a, q.option_b, q.option_b, q.option_d].map((opt, i) => (
                <div className="form-check" key={i}>
                  <input
                    type="radio"
                    name={`question-${q.id}`}
                    value={opt}
                    className="form-check-input"
                    onChange={() => handleOptionChange(q.id, opt)}
                    checked={answers[q.id] === opt}
                  />
                  <label className="form-check-label">{opt}</label>
                </div>
              ))}
            </div>
          </div>
        ))}

        <button className="btn btn-success" onClick={handleSubmit}>Submit Test</button>
      </div>
    </div>
  );
};

export default StartTest;
