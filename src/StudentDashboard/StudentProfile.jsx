import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';

const StudentProfile = () => {
  const { username } = useParams();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/api/register/username/${username}`);
        setStudent(response.data);
      } catch (error) {
        console.error("Error fetching student data:", error);
      } finally {
        setLoading(false);
      }
    };
  
    if (username) fetchProfile();
    else setLoading(false);
  }, [username]);
  

  if (loading) return <div className="container mt-5">Loading profile...</div>;
  if (!student) return <div className="container mt-5">No profile data found.</div>;

  return (
    <div className="container mt-5 p-4 bg-white shadow rounded w-75 mx-auto" style={{ maxWidth: "700px" }}>
      <h3 className="mb-4 text-primary">👨‍🎓 Student Profile</h3>
      <div className="row">
        <div className="col-md-6 mb-3"><strong>Name:</strong> {student.name}</div>
        <div className="col-md-6 mb-3"><strong>Username:</strong> {student.username}</div>
        <div className="col-md-6 mb-3"><strong>Email:</strong> {student.email}</div>
        <div className="col-md-6 mb-3"><strong>Contact:</strong> {student.contact}</div>
        <div className="col-md-6 mb-3"><strong>Gender:</strong> {student.gender}</div>
        <div className="col-md-6 mb-3"><strong>Birthdate:</strong> {student.birthdate}</div>
        <div className="col-md-6 mb-3"><strong>Course:</strong> {student.course}</div>
        <div className="col-md-6 mb-3"><strong>Batch:</strong> {student.batch}</div>
        <div className="col-12"><strong>Address:</strong> {student.address}</div>
      </div>
    </div>
  );
};

export default StudentProfile;
