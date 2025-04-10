import React, { useState } from "react";
import axios from "axios";

function CreatePaperSet({ onCreated }) {
  const [subject, setSubject] = useState("Java");
  const [paperName, setPaperName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const paperSet = { subject, paperName };
    try {
      const response = await axios.post("http://localhost:8081/api/paperset", paperSet);
      onCreated(response.data.id); // Call parent with new paperSetId
    } catch (error) {
      alert("Error creating paper set");
    }
  };

  return (
    <div className="container mt-4 p-4 shadow bg-light w-50 rounded">
      <h4>Create Paper Set</h4>
      <form onSubmit={handleSubmit}>
        <label>Subject</label>
        <select className="form-select mb-3" value={subject} onChange={(e) => setSubject(e.target.value)}>
          <option value="C++">C++</option>
          <option value="Java">Java</option>
          <option value="Python">Python</option>
          <option value="C++">C++</option>
        </select>

        <label>Paper Name</label>
        <input
          type="text"
          className="form-control mb-3"
          value={paperName}
          onChange={(e) => setPaperName(e.target.value)}
          required
        />

        <button type="submit" className="btn btn-primary w-100">Create Paper Set</button>
      </form>
    </div>
  );
}

export default CreatePaperSet;
