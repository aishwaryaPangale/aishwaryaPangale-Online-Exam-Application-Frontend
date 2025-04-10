import React, { useState } from "react";
import axios from "axios";
import { IoMdCloseCircle } from "react-icons/io";
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
      setMessage("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8081/api/auth/forgot-password", {
        email,
        newPassword,
      });

      setMessage(response.data);
    } catch (error) {
      setMessage(error.response?.data || "Error updating password");
    }
  };

  return (
    <div className="Register">
    <div className="container position-relative text-center w-50 mt-5 p-5 rounded  shadow-lg">
      {/* Close Icon (Top Right) */}
      <IoMdCloseCircle
        size={35}
        className="position-absolute"
        style={{
          top: "10px",
          right: "10px",
          cursor: "pointer",
          color: "#dc3545",
        }}
        onClick={() => navigate(-1)}
      />

      <h2 className="text-warning fw-bold mb-4 animate__animated animate__rotateIn">
        Forgot Password
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="form-floating mt-3 mx-auto w-75">
          <input
            type="text"
            className="form-control shadow  bg-transparent text-white"
            id="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="username">Username (Email)</label>
        </div>

        <div className="form-floating mt-3 mx-auto w-75">
          <input
            type="password"
            className="form-control shadow bg-transparent text-white"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <label htmlFor="newPassword">New Password</label>
        </div>

        <div className="form-floating mt-3 mx-auto w-75">
          <input
            type="password"
            className="form-control shadow bg-transparent text-white"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <label htmlFor="confirmPassword">Confirm Password</label>
        </div>

        <button type="submit" className="btn btn-outline-warning mt-4">
          Update Password
        </button>
      </form>

      {message && <p className="mt-3 text-light fw-semibold">{message}</p>}
    </div>
    </div>
  );
}

export default ForgotPassword;
