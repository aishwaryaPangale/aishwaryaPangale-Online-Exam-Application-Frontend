import React, { useState } from "react";
import axios from "axios";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

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
    <div class="container text-center w-50 mt-5 p-5 shadow-lg" style={{ padding: "20px" }}>
      <h2 class="text-center text-warning">Forgot Password</h2>
      <form onSubmit={handleSubmit}>
    
        <div className="form-floating mt-3" style={{marginLeft:"80px"}}>
            <input  type="text"
                        className="form-control w-50" 
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
                        className="form-control w-50"
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
                        className="form-control w-50"
                        id="Confirm Password"
                        value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
                    />
                    <label htmlFor="Confirm Password">Confirm Password</label>
                </div>
        
        <br/>
        <button type="submit" class="btn btn-success">Update Password</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default ForgotPassword;
