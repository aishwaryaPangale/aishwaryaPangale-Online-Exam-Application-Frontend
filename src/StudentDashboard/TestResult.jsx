import React from 'react';
import { useLocation } from 'react-router-dom';
import { jsPDF } from 'jspdf';

const TestResult = () => {
  const { state } = useLocation();
  const {
    testDetails,
    answers,
    totalQuestions,
    attemptedQuestions,
    remainingQuestions,
    correctAnswerMap, // ✅ Added student name
  } = state;

  let correct = 0;
  let wrong = 0;

  Object.entries(answers).forEach(([qId, ans]) => {
    const correctAns = correctAnswerMap[qId]?.trim().toLowerCase();
    const selectedAns = ans?.trim().toLowerCase();

    if (selectedAns === correctAns) {
      correct++;
    } else {
      wrong++;
    }
  });

  const totalMarks = correct;
   const studentName = localStorage.getItem("name") || "Student"

  // Function to generate and download the PDF
  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text(`Test Result for: ${studentName}`, 20, 20); // ✅ Use studentName

    doc.setFontSize(12);
    let yPos = 30;

    const addText = (text) => {
      if (yPos > 270) {
        doc.addPage();
        yPos = 20;
      }
      doc.text(text, 20, yPos);
      yPos += 10;
    };

    addText(`Test Details:`);
    addText(`Test: ${testDetails.course_name} (${testDetails.batch_name})`);
    addText(`Date: ${testDetails.date} | Time: ${testDetails.time}`);
    addText(`Result Summary:`);
    addText(`Total Questions: ${totalQuestions}`);
    addText(`Attempted Questions: ${attemptedQuestions}`);
    addText(`Remaining Questions: ${remainingQuestions}`);
    addText(`Correct Answers: ✅ ${correct}`);
    addText(`Wrong Answers: ❌ ${wrong}`);
    addText(`Total Marks: 🏆 ${totalMarks}`);
    addText(`Answer Review:`);

    Object.entries(answers).forEach(([qId, ans]) => {
      const correctAns = correctAnswerMap[qId];
      const isCorrect = ans?.trim().toLowerCase() === correctAns?.trim().toLowerCase();
      const status = isCorrect ? '✅ Correct' : '❌ Wrong';

      addText(`Q${qId}:`);
      addText(`  Your Answer: ${ans}`);
      addText(`  Correct Answer: ${correctAns}`);
      addText(`  Status: ${status}`);
    });

    doc.save('test-result.pdf');
  };

  return (
    <div>
      <div
        className="container p-4 bg-white shadow rounded position-absolute start-50 top-50 translate-middle"
        style={{
          width:"800px",
          marginLeft:"100px",
          marginTop:"60px",
          maxHeight: '500px',
          overflowY: 'auto',
          border: '1px solid #ccc',
          borderRadius: '8px',
          padding: '10px',
          backgroundColor: '#f8f9fa',
          scrollbarWidth: 'none',      // Firefox
          msOverflowStyle: 'none'      // IE/Edge
        }} >
        <h3 className="text-center">📊 Test Result</h3>
        <hr />
        <p><strong>Student:</strong> {studentName}</p> {/* ✅ Use studentName here */}
        <p><strong>Test:</strong> {testDetails.course_name} ({testDetails.batch_name})</p>
        <p><strong>Date:</strong> {testDetails.date} | <strong>Time:</strong> {testDetails.time}</p>
        <hr />
        <div className="mt-4 d-flex justify-content-between">
          <div>
            <p><strong>Total Questions:</strong> {totalQuestions}</p>
            <p><strong>Attempted Questions:</strong> {attemptedQuestions}</p>
            <p><strong>Remaining Questions:</strong> {remainingQuestions}</p>
          </div>
          <div>
            <p><strong>Correct Answers:</strong> ✅ {correct}</p>
            <p><strong>Wrong Answers:</strong> ❌ {wrong}</p>
            <p><strong>Total Marks:</strong> 🏆 {totalMarks}</p>
          </div>
        </div>
        <hr />
        <h5>📌 Answer Review</h5>
        <div style={{
          maxHeight: '300px',
          overflowY: 'auto',
          border: '1px solid #ccc',
          borderRadius: '8px',
          padding: '10px',
          backgroundColor: '#f8f9fa',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }} className="custom-scroll">
          {Object.entries(answers).map(([qId, ans]) => {
            const correctAns = correctAnswerMap[qId];
            const isCorrect = ans?.trim().toLowerCase() === correctAns?.trim().toLowerCase();
            return (
              <div key={qId} className={`border rounded p-2 my-2 ${isCorrect ? 'bg-success-subtle' : 'bg-danger-subtle'}`}>
                <p><strong>Q{qId}:</strong> Your Answer - <span className="text-primary">{ans}</span></p>
                <p><strong>Correct Answer:</strong> <span className="text-success">{correctAns}</span></p>
                <p><strong>Status:</strong> {isCorrect ? '✅ Correct' : '❌ Wrong'}</p>
              </div>
            );
          })}
        </div>
        <hr />
        <button onClick={downloadPDF} className="btn btn-primary mt-3">Download Test Result as PDF</button>
      </div>
    </div>
  );
};

export default TestResult;
