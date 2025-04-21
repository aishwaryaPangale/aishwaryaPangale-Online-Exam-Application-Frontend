import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';

const StudentProfile = () => {
  const { username } = useParams();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      if (!username) {
        console.warn("No username provided in URL.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`http://localhost:8081/api/register/username/${username}`);
        setStudent(response.data);
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching student data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [username]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:8081/api/register/update/${username}`, formData);
      setStudent(formData);
      setIsEditing(false);
      setMessage("✅ Profile updated successfully!");
      setTimeout(() => setMessage(""), 2000);
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage("❌ Failed to update profile.");
      setTimeout(() => setMessage(""), 2000);
    }
  };

  if (loading) return <div className="container mt-5">Loading profile...</div>;
  if (!student) return <div className="container mt-5">No profile data found.</div>;

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 w-75 position-absolute start-50 top-50 translate-middle mt-4">
      <div className="p-2 bg-white shadow rounded " style={{ maxWidth: "800px",marginLeft:"200px" }}>
        {message && <p style={{ color: message.includes("❌") ? "red" : "green" }}>{message}</p>}

        <h3 className="mb-4 text-primary">👨‍🎓 Student Profile</h3>
        <div className="row ">
          {["name", "username", "email", "contact", "gender", "birthdate", "course", "batch", "address"].map((field, idx) => (
            <div key={idx} className={`col-md-6 mb-3 ${field === "address" ? "col-12" : ""}`}>
              <strong>{field.charAt(0).toUpperCase() + field.slice(1)}:</strong>
              {isEditing ? (
                <input
                  type="text"
                  className="form-control mt-1"
                  name={field}
                  value={formData[field] || ""}
                  onChange={handleChange}
                />
              ) : (
                <span className="ms-2">{student[field]}</span>
              )}
            </div>
          ))}
        </div>

        <div className="d-flex justify-content-end">
          {isEditing ? (
            <>
              <button className="btn btn-success me-2" onClick={handleUpdate}>Update</button>
              <button className="btn btn-secondary" onClick={() => { setIsEditing(false); setFormData(student); }}>Cancel</button>
            </>
          ) : (
            <button className="btn btn-primary" onClick={() => setIsEditing(true)}>Edit</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
