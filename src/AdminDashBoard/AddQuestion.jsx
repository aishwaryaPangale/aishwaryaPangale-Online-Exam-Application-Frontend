import React, { useState } from 'react';
import axios from 'axios';
import { IoMdCloseCircle } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

const AddQuestion = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("❌ Please select a CSV file.");
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      await axios.post('http://localhost:8081/api/questions/upload-csv', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setMessage("✅ Questions uploaded successfully!");
      setFile(null);
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage("❌ Upload failed. Please try again.");
      console.error(error);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  return (
    <div className="container text-center shadow p-4 bg-light rounded position-absolute start-50 top-50 translate-middle" style={{ width: "500px" }}>
      <IoMdCloseCircle size={26} style={{ position: "absolute", top: "15px", right: "15px", color: "#dc3545", cursor: "pointer" }}
         onClick={() => navigate(-1)} />

      <h4 className="text-danger mb-3 fw-bold">Upload Questions CSV</h4>

      {message && <p style={{ color: message.includes("❌") ? "red" : "green" }}>{message}</p>}

      <input type="file" accept=".csv" onChange={handleFileChange} className="form-control mb-3"/>

      <button onClick={handleUpload} className="btn btn-outline-danger w-100 mt-2" > Upload</button>
    </div>
  );
};

export default AddQuestion;
