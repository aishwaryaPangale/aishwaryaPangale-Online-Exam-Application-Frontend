import React, { useState } from 'react';
import axios from 'axios'; // ✅ Import axios
import 'animate.css';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = formData;

    try {
      const res = await axios.post('http://localhost:8081/api/admin/login', {
        username,
        password,
      });

      if (res.status === 200) {
        setMessage('✅ Login successful!');
        setTimeout(() => setMessage(""), 2000);
        localStorage.setItem('adminUsername', res.data.username);
        navigate('/admin');
      } else {
        setMessage('❌ Login failed');
        setTimeout(() => setMessage(""), 2000);
      }
    } catch (error) {
      console.error('Login error:', error);
      setMessage('⚠️ Login failed. Invalid credentials or server error.');
      setTimeout(() => setMessage(""), 2000);
    }
  };

  return (
    <div className="Register">
      <div className="flex items-center justify-center h-screen bg-gray-100" style={{ width: '80%' }}>
      <h2 className="display-6 text-danger fw-bold mt-lg-5 text-center animate__animated animate__fadeInUp">
            🔐 Admin Login
          </h2>
        <form
          onSubmit={handleSubmit}
          className="p-8 rounded-2xl shadow-lg"
          style={{ paddingLeft: '350px', marginTop: '50px' }}
        >
        

          {message && (
            <p style={{ color: message.includes('❌') ? 'red' : 'green'  ,backgroundColor:"white",width:"200px"}}>{message}</p>
          )}

          <div className="mb-4">
            <label htmlFor="username" className="block text-white mb-1">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="px-3 py-2 bg-transparent form-control w-50 border border-gray-300 rounded-xl text-light focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
n
          <div className="mb-6">
            <label htmlFor="password" className="block text-white mb-1">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="px-3 py-2 bg-transparent border text-light border-gray-300 form-control w-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white btn btn-outline-danger py-2 rounded-xl w-50 mt-3"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
