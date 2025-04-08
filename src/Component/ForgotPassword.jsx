import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
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

      setMessage("✅ Password updated successfully");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      setMessage("❌ " + (error.response?.data || "Error updating password"));
    }
  };

  return (
    <div className="container text-center w-50 mt-5 p-5 shadow-lg bg-secondary bg-opacity-50">
      <h2 className="text-center text-warning">Forgot Password</h2>
      {message && <p style={{ color: message.includes("❌") ? "red" : "green" }}>{message}</p>}

      <form onSubmit={handleSubmit}>
        <div className="form-floating mt-3" style={{ marginLeft: "80px" }}>
          <input
            type="text"
            className="form-control w-75 shadow"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="email">Username</label>
        </div>

        <div className="form-floating mt-3" style={{ marginLeft: "80px" }}>
          <input
            type="password"
            className="form-control w-75 shadow"
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
            className="form-control w-75 shadow"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <label htmlFor="confirmPassword">Confirm Password</label>
        </div>

        <br />
        <button type="submit" className="btn btn-outline-light shadow">
          Update Password
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
