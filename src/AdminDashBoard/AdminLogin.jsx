import React, { useState } from 'react';
import 'animate.css';
import { Navigate, useNavigate } from 'react-router-dom';

const AdminLogin = () => {
    const navigate=useNavigate();
   const [message, setMessage] = useState("");   
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch("http://localhost:8081/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      const message = await response.text();
  
      if (response.ok) {
        setMessage("✅ Login successful!");
        navigate("/admin");
        console.log(message);
        // Redirect or do something on success (like navigate to dashboard)
      } else {
        setMessage("❌ Login failed: " + message);
      }
    } catch (error) {
      console.error("Error during login:", error);
      setMessage("⚠️ An error occurred. Please try again.");
    }
  };
  

  return (
    <div className="Register">
    <div className="flex items-center justify-center h-screen  bg-gray-100" style={{width:"80%"}}>
         {/* <h1 className="text-2xl font-bold mb-6 text-center text-danger  mt-lg-5" >Admin Login</h1> */}
         <h2 className="display-6 text-danger fw-bold text-center mt-lg-5 fade-in-up glow-text animate__animated animate__fadeInUp">
          🔐 Admin Login
        </h2>

      <form
        onSubmit={handleSubmit}
        className=" p-8 rounded-2xl shadow-lg" style={{paddingLeft:"300px",marginTop:"80px"}}
      >
        
        {message && (
                    <p style={{ color: message.includes("❌") ? "red" : "green" }}>
                        {message}
                    </p>
                )}




        <div className="mb-4">
          <label htmlFor="username" className="block text-white mb-1">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className=" px-3 py-2  bg-transparent form-control w-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-white mb-1">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className=" px-3 py-2  bg-transparent border border-gray-300  form-control w-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <button
          type="submit"
          className=" bg-blue-600 text-white btn btn-outline-danger py-2 rounded-xl  w-50 mt-3"
        >
          Login
        </button>
      </form>
    </div>
    </div>
  );
};

export default AdminLogin;
