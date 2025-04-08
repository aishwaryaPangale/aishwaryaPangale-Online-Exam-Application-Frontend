import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage("❌ Passwords do not match");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8081/api/auth/forgot-password", {
        email,
        newPassword,
      });

      setMessage("✅Password updated successfully");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      setMessage("❌ " + (error.response?.data || "Error updating password"));
    }
  };

  return (
    <div class="container text-center w-50 mt-5 p-5 shadow-lg bg-secondary bg-opacity-50" style={{ padding: "20px" }}>
      <h2 class="text-center text-danger">Forgot Password</h2>
      <form onSubmit={handleSubmit} style={{padding:"10px"}}>
    
        <div className="form-floating mt-3" style={{marginLeft:"80px"}}>
            <input  type="text"
                        className="form-control w-75 shadow-lg" 
                        id="username"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required 
                    />
                    <label htmlFor="username">Username</label>
                </div>
        
        <br/>
        <div className="form-floating mt-3" style={{marginLeft:"80px"}}>
            <input  type="text"
                        className="form-control w-75 shadow-lg"
                        id="New Password"
                        value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
                    />
                    <label htmlFor="New Password">New Password</label>
                </div>
        
        <br/>
      
        <div className="form-floating mt-3" style={{marginLeft:"80px"}}>
            <input  type="text"
                        className="form-control w-75 shadow-lg"
                        id="Confirm Password"
                        value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
                    />
                    <label htmlFor="Confirm Password">Confirm Password</label>
                </div>
        
        <br/>
        <button type="submit" class="btn btn-outline-danger">Update Password</button
    <div className="container text-center w-50 mt-5 p-5 shadow-lg">
      <h2 className="text-center text-warning">Forgot Password</h2>
      {message && <p style={{ color: message.includes("❌") ? "red" : "green" }}>{message}</p>}

      <form onSubmit={handleSubmit}>
        <div className="form-floating mt-3" style={{ marginLeft: "80px" }}>
          <input
            type="text"
            className="form-control w-50"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="email">Email</label>
        </div>

        <div className="form-floating mt-3" style={{ marginLeft: "80px" }}>
          <input
            type="password"
            className="form-control w-50"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <label htmlFor="newPassword">New Password</label>
        </div>

        <div className="form-floating mt-3" style={{ marginLeft: "80px" }}>
          <input
            type="password"
            className="form-control w-50"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <label htmlFor="confirmPassword">Confirm Password</label>
        </div>

        <br />
        <button type="submit" className="btn btn-success">
          Update Password
        </button>
      </form>
    </div>
  );
}

export default ForgotPassword;
