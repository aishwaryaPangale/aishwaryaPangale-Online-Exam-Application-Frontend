import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IoMdCloseCircle } from "react-icons/io";

const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [otp, setOtp] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [countdown, setCountdown] = useState(0);

    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [forgotEmail, setForgotEmail] = useState("");

    // Countdown logic
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
        if (!email) {
            setMessage("❌ Please enter a valid email!");
            return;
        }

        try {
            setLoading(true);
            const response = await axios.post("http://localhost:8081/api/auth/send-otp", { email });
            setOtpSent(true);
            setCountdown(300); // 5 minutes
            setOtp("");
            setPassword("");
            setMessage(response.data.message || "✅ OTP sent successfully!");
        } catch (error) {
            setMessage(error.response?.data?.message || "❌ Failed to send OTP!");
        } finally {
            setLoading(false);
        }
    };

    const verifyOtpAndRegister = async () => {
        if (!email || !password || !otp) {
            setMessage("❌ All fields are required!");
            return;
        }

        try {
            setLoading(true);
            const response = await axios.post("http://localhost:8081/api/auth/verify-otp", {
                email,
                password,
                otp,
            });

            setMessage(response.data.message || "✅ User Login successfully!");
            navigate("/admin");
        } catch (error) {
            setMessage(error.response?.data?.message || "❌ Invalid OTP!");
        } finally {
            setLoading(false);
        }
    };

    const handleForgotPassword = async () => {
        if (!forgotEmail) {
            setMessage("❌ Please enter your email.");
            return;
        }

        try {
            setLoading(true);
            const response = await axios.post("http://localhost:8081/api/auth/forgot-password", {
                email: forgotEmail,
            });
            setMessage(response.data.message || "✅ Reset link sent to your email!");
        } catch (error) {
            setMessage(error.response?.data?.message || "❌ Failed to send reset link!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="Register">
            <div className="container shadow p-5 position-relative" style={{ width: "400px", height: "auto" }}>
                <IoMdCloseCircle
                    size={28}
                    className="position-absolute d-flex justify-content-end"
                    style={{ top: "15px", right: "15px", cursor: "pointer", color: "#dc3545" }}
                    onClick={() => navigate(-1)}
                />
                <h2 className="text-warning text-center">Login</h2>
                {message && (
                    <p style={{ color: message.includes("❌") ? "red" : "green" }}>
                        {message}
                    </p>
                )}

                {!showForgotPassword ? (
                    <>
                        {/* Email Input */}
                        <div className="col-md mt-4">
                            <div className="form-floating">
                                <input
                                    type="email"
                                    name="email"
                                    className="form-control"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled={otpSent}
                                />
                                <label htmlFor="email">Email Address</label>
                            </div>
                        </div>
                        <br />

                        {!otpSent || countdown <= 0 ? (
                            <button
                                onClick={sendOtp}
                                disabled={loading}
                                className="btn btn-success w-50"
                                style={{ marginLeft: "60px" }}
                            >
                                {loading ? "Sending OTP..." : otpSent ? "Resend OTP" : "Send OTP"}
                            </button>
                        ) : null}

                        {!otpSent && (
                            <button
                                type="button"
                                className="btn btn-link text-light w-100 text-end"
                                onClick={() => setShowForgotPassword(true)}>
                                Forgot Password?
                            </button>
                        )}

                        {otpSent && (
                            <>
                                {/* Password Input */}
                                <div className="col-md mt-3">
                                    <div className="form-floating">
                                        <input
                                            type="password"
                                            name="password"
                                            className="form-control"
                                            id="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <label htmlFor="password">Password</label>
                                    </div>
                                </div>
                                <br />

                                {/* OTP Input */}
                                <div className="col-md">
                                    <div className="form-floating">
                                        <input
                                            type="text"
                                            name="otp"
                                            className="form-control"
                                            id="otp"
                                            value={otp}
                                            onChange={(e) => setOtp(e.target.value)}
                                        />
                                        <label htmlFor="otp">Enter OTP</label>
                                    </div>
                                    {countdown > 0 && (
                                        <div className="text-end mt-2" style={{ color: "white", fontSize: "14px" }}>
                                            ⏳ Resend in: {formatTime(countdown)}
                                        </div>
                                    )}
                                </div>

                                {/* Verify Button */}
                                <button
                                    onClick={verifyOtpAndRegister}
                                    disabled={loading}
                                    className="btn btn-outline-primary w-50 mt-4"
                                    style={{ marginLeft: "60px" }}
                                >
                                    {loading ? "Verifying..." : "Verify & Login"}
                                </button>
                            </>
                        )}
                    </>
                ) : (
                    <>
                        {/* Forgot Password Mode */}
                        <div className="form-floating mt-4">
                            <input
                                type="email"
                                className="form-control"
                                id="forgotEmail"
                                placeholder="Enter your email"
                                value={forgotEmail}
                                onChange={(e) => setForgotEmail(e.target.value)}
                            />
                            <label htmlFor="forgotEmail">Enter your email</label>
                        </div>

                        <button
                            onClick={handleForgotPassword}
                            className="btn btn-outline-info w-100 mt-3"
                            disabled={loading}
                        >
                            {loading ? "Sending..." : "Send Reset Link"}
                        </button>

                        <button
                            className="btn btn-secondary w-100 mt-2"
                            onClick={() => setShowForgotPassword(false)}
                        >
                            Back to Login
                        </button>
                    </>
                )}

                <div className="mt-4">
                    <button
                        type="button"
                        className="btn btn-outline-warning"
                        onClick={() => navigate("/reg")}
                    > Register
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
