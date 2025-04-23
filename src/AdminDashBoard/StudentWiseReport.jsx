import React, { useEffect, useState } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const StudentWiseReport = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState("");
  const [testData, setTestData] = useState([]);

  useEffect(() => {
    // Fetch student list on mount
    axios.get("http://localhost:8081/api/students")
      .then(res => setStudents(res.data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    if (selectedStudentId) {
      axios.get(`http://localhost:8081/api/students/${selectedStudentId}/tests`)
        .then(res => setTestData(res.data))
        .catch(err => console.error(err));
    }
  }, [selectedStudentId]);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      <div className="mb-6">
        <label className="block mb-2">Select Student:</label>
        <select
          className="p-2 border rounded w-full"
          value={selectedStudentId}
          onChange={e => setSelectedStudentId(e.target.value)}
        >
          <option value="">-- Select Student --</option>
          {students.map(student => (
            <option key={student.id} value={student.id}>
              {student.name}
            </option>
          ))}
        </select>
      </div>

      {testData.length > 0 && (
        <>
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full bg-white border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 border">Test Name</th>
                  <th className="px-4 py-2 border">Date</th>
                  <th className="px-4 py-2 border">Attendance</th>
                  <th className="px-4 py-2 border">Score</th>
                </tr>
              </thead>
              <tbody>
                {testData.map((test, index) => (
                  <tr key={index} className="text-center">
                    <td className="px-4 py-2 border">{test.testName}</td>
                    <td className="px-4 py-2 border">{test.date}</td>
                    <td className="px-4 py-2 border">{test.attended ? "Present" : "Absent"}</td>
                    <td className="px-4 py-2 border">{test.score ?? "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Score Graph</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={testData.filter(test => test.attended)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="testName" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="score" fill="#3182CE" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
};

export default StudentWiseReport;
