// src/components/Login.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { IoMdCloseCircle } from "react-icons/io";

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [otp, setOtp] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [countdown, setCountdown] = useState(0);

    useEffect(() => {
        let timer;
        if (otpSent && countdown > 0) {
            timer = setTimeout(() => setCountdown(prev => prev - 1), 1000);
        }
        return () => clearTimeout(timer);
    }, [otpSent, countdown]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    };

    const sendOtp = async () => {
        if (!email || !username) {
            setMessage("❌ Please enter both username and email!");
            setTimeout(() => setMessage(""), 2000);
            return;
        }

        try {
            setLoading(true);
            const response = await axios.post("http://localhost:8081/api/auth/send-otp", { email });
            setOtpSent(true);
            setCountdown(300);
            setMessage(response.data.message || "✅ OTP sent successfully!");
            setTimeout(() => setMessage(""), 2000);
        } catch (error) {
            setMessage(error.response?.data?.message || "❌ Failed to send OTP!");
            setTimeout(() => setMessage(""), 2000);
        } finally {
            setLoading(false);
        }
    };

    const verifyOtpAndLogin = async () => {
        if (!username || !email || !password || !otp) {
            setMessage("❌ All fields are required!");
            setTimeout(() => setMessage(""), 2000);
            return;
        }

        try {
            setLoading(true);
            const response = await axios.post("http://localhost:8081/api/auth/verify-otp", {
                username,
                email,
                password,
                otp,
            });
            
           localStorage.setItem("studentName", response.data.name);
           localStorage.setItem("username", response.data.username); 
            setMessage(response.data.message || "✅ Login successful!");
            console.log("Login response data:", response.data);


            setTimeout(() => {
                // navigate(`/student/profile/${username}`);
                navigate("/studentDashboard");
                setMessage("");
            }, 1500);

        } catch (error) {
            setMessage(error.response?.data?.message || "❌ Invalid OTP or credentials!");
            setPassword("");
            setUsername("");
            setTimeout(() => setMessage(""), 2000);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="Register">
            <div className="container shadow p-3 position-relative" style={{ width: "400px" }}>
                <IoMdCloseCircle
                    size={28}
                    className="position-absolute"
                    style={{ top: "15px", right: "15px", cursor: "pointer", color: "#dc3545" }}
                    onClick={() => navigate(-1)}
                />
                <h2 className="text-warning text-center">Login</h2>

                {message && (
                    <p style={{ color: message.includes("❌") ? "red" : "green", backgroundColor: "white", width: "250px" }}>
                        {message}
                    </p>
                )}

                <div className="form-floating mt-3">
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        disabled={otpSent}
                    />
                    <label htmlFor="username">Username</label>
                </div>

                <div className="form-floating mt-3">
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={otpSent}
                    />
                    <label htmlFor="email">Email</label>
                </div>

                {!otpSent && (
                    <div className="text-end mt-1">
                        <Link to="/forgot-password" className="btn btn-link text-primary p-0" style={{ fontSize: "14px" }}>
                            Forgot Password?
                        </Link>
                    </div>
                )}

                {!otpSent || countdown <= 0 ? (
                    <button onClick={sendOtp} disabled={loading} className="btn btn-success w-50 mt-3">
                        {loading ? "Sending OTP..." : "Send OTP"}
                    </button>
                ) : null}

                {otpSent && (
                    <>
                        <div className="form-floating mt-3">
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <label htmlFor="password">Password</label>
                        </div>

                        <div className="form-floating mt-3">
                            <input
                                type="text"
                                className="form-control"
                                id="otp"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                            />
                            <label htmlFor="otp">Enter OTP</label>
                        </div>

                        {countdown > 0 && (
                            <div className="text-end mt-2" style={{ fontSize: "14px" }}>
                                <h5 className="text-light">⏳ {formatTime(countdown)}</h5>
                            </div>
                        )}

                        <button
                            onClick={verifyOtpAndLogin}
                            disabled={loading}
                            className="btn btn-outline-primary w-100 mt-4"
                        >
                            {loading ? "Verifying..." : "Verify & Login"}
                        </button>
                    </>
                )}

                <div className="mt-4 text-center">
                    <button className="btn btn-outline-warning" onClick={() => navigate("/reg")}>
                        Register
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
