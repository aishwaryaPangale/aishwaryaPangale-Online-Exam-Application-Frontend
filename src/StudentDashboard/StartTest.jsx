import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const StartTest = () => {
  const { testId } = useParams();
  const navigate = useNavigate();

  const [testDetails, setTestDetails] = useState({});
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [timer, setTimer] = useState(3600); // 1 hour
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isTimeUp, setIsTimeUp] = useState(false);

  const studentName = localStorage.getItem("name") || "Student";
  const studentUsername = localStorage.getItem("username");
  const studentId = parseInt(localStorage.getItem("studentId")); // or whatever your source is


  // Timer and fetch test data
  useEffect(() => {
    fetchTestData();

    const countdown = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          clearInterval(countdown);
          setIsTimeUp(true);
          handleSubmit(); // Auto-submit
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, [testId]);

  // Fetch test + questions
  const fetchTestData = async () => {
    try {
      const res = await axios.get(`http://localhost:8081/api/student/startTest?testId=${testId}`);
      setTestDetails(res.data.test);
      setQuestions(res.data.questions);
    } catch (err) {
      console.error('Failed to fetch test data:', err);
    }
  };

  // Handle option change
  const handleOptionChange = (questionId, selectedOption) => {
    setAnswers(prev => ({ ...prev, [questionId]: selectedOption }));
  };

  // Format time mm:ss
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' + secs : secs}`;
  };

  // Navigation
  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  // Submit test
  // const handleSubmit = async () => {
  //   const totalQuestions = questions.length;
  //   const attemptedQuestions = Object.keys(answers).length;
  //   const remainingQuestions = totalQuestions - attemptedQuestions;

  //   // Correct answers map (for result summary)
  //   const correctAnswerMap = {};
  //   questions.forEach((q) => {
  //     correctAnswerMap[q.id] = q.correct_answer; // change field if needed
  //   });

  //   const result = {
  //     testId: parseInt(testId),
  //     studentId: parseInt(studentId),
  //     answers, // This must be a map of { questionId (string or int) : selectedAnswer (string) }
  //   };
    
  //   console.log("Submitting test with result:", result);

  //   try {
  //     await axios.post("http://localhost:8081/api/student/submitTest", result);
  //     await axios.post(`http://localhost:8081/api/student/submit-result?id=${studentId}&testId=${testId}`, answers);

  //     navigate('/studentDashboard/testResult', {
  //       state: {
  //         testDetails,
  //         answers,
  //         totalQuestions,
  //         attemptedQuestions,
  //         remainingQuestions,
  //         correctAnswerMap,
  //       },
  //     });
  //   } catch (error) {
  //     console.error("Error submitting test:", error);
  //     alert("Failed to submit test.");
  //   }
  // };


  const handleSubmit = async () => {
  const totalQuestions = questions.length;
  const attemptedQuestions = Object.keys(answers).length;
  const remainingQuestions = totalQuestions - attemptedQuestions;

  const correctAnswerMap = {};
  questions.forEach(q => {
    correctAnswerMap[q.id] = q.correct_answer;
  });

  const result = {
    testId: parseInt(testId),
    studentId,
    answers
  };
console.log("Submitting test with result:", result);
  try {
     await axios.post("http://localhost:8081/api/student/submitTest", result);
 await axios.post(`http://localhost:8081/api/student/submit-result?studentId=${studentId}&testId=${testId}`, answers);
    navigate('/studentDashboard/testResult', {
      state: {
        testDetails,
        answers,
        totalQuestions,
        attemptedQuestions,
        remainingQuestions,
        correctAnswerMap,
         },
    });
  } catch (error) {
    console.error("Error submitting test:", error);
    alert("Failed to submit test.");
  }
};


  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="container mt-5">
      <div className="container mt-5 p-4 bg-white shadow rounded position-absolute start-50 top-50 translate-middle" style={{ maxWidth: "800px",marginLeft:"120px" }}>
        <div className="position-absolute p-3 rounded" style={{ top: "10px", left: "650px" }}>
          <h5 className="text-danger mb-0">⏳ {formatTime(timer)}</h5>
        </div>
        <div className="card-body">
          <h4 className="mb-3 text-center">📝 Start Test</h4>
          <p><strong>Student:</strong> {studentName}</p>
          <p><strong>Test:</strong> {testDetails.course_name} ({testDetails.batch_name})</p>
          <p><strong>Date:</strong> {testDetails.date} | <strong>Time:</strong> {testDetails.time}</p>
          <hr />

          {currentQuestion && (
            <div>
              <p className="fw-bold">Q{currentQuestionIndex + 1}. {currentQuestion.question}</p>
              {[currentQuestion.option_a, currentQuestion.option_b, currentQuestion.option_c, currentQuestion.option_d].map((opt, i) => (
                <div className="form-check mb-2" key={i}>
                  <input
                    className="form-check-input"
                    type="radio"
                    name={`question-${currentQuestion.id}`}
                    value={opt}
                    onChange={() => handleOptionChange(currentQuestion.id, opt)}
                    checked={answers[currentQuestion.id] === opt}
                  />
                  <label className="form-check-label">{opt}</label>
                </div>
              ))}
            </div>
          )}

          <div className="d-flex mt-4">
            <button className="btn btn-outline-primary" onClick={prevQuestion} disabled={currentQuestionIndex === 0}>
              ⬅ Previous
            </button>
            <button className="btn btn-outline-primary ms-4" onClick={nextQuestion} disabled={currentQuestionIndex === questions.length - 1}>
              Next ➡
            </button>
          </div>

          <div className="position-absolute" style={{ top: "140px", left: "650px" }}>
            <button className="btn btn-success px-3" onClick={handleSubmit} disabled={isTimeUp}>
              {isTimeUp ? "⏰ Time's Up" : "Submit Test"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartTest;
