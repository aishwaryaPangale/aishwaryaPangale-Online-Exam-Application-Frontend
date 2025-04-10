import React, { useState } from "react";
import axios from "axios";
import QuestionForm from "./QuestionForm";

function AddQuestion({ paperSetId }) {
  const [type, setType] = useState("MCQ");
  const [questionText, setQuestionText] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      paperSetId,
      type,
      questionText,
      correctAnswer,
      ...(type === "MCQ" && { options })
    };

    try {
      await axios.post("http://localhost:8081/api/questions", payload);
      setMessage("Question added successfully!");
      setQuestionText("");
      setCorrectAnswer("");
      setOptions(["", "", "", ""]);
    } catch (error) {
      setMessage("Error adding question.");
    }
  };

  return (
    <div className="container mt-4 p-4 bg-light rounded shadow w-75">
      <h4>Add Question</h4>

      <form onSubmit={handleSubmit}>
        <label>Question Type</label>
        <select className="form-select mb-3" value={type} onChange={(e) => setType(e.target.value)}>
          <option value="MCQ">Multiple Choice</option>
          <option value="SHORT_ANSWER">Short Answer</option>
          <option value="TRUE_FALSE">True/False</option>
        </select>

        <QuestionForm
          type={type}
          questionText={questionText}
          setQuestionText={setQuestionText}
          options={options}
          setOptions={setOptions}
          correctAnswer={correctAnswer}
          setCorrectAnswer={setCorrectAnswer}
        />

        <button type="submit" className="btn btn-success w-100">Add Question</button>
        {message && <div className="mt-3">{message}</div>}
      </form>
    </div>
  );
}

export default AddQuestion;
