import React, { useState } from "react";
import axios from "axios";
import Services from "./Services";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [otp, setOtp] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [loading, setLoading] = useState(false);
     const [message, setMessage] = useState("");

    // ✅ Send OTP API Request
    const sendOtp = async () => {
        if (!email) {
            setMessage("❌ Please enter a valid email!");
            return;
        }

        try {
            setLoading(true);
            const response = await axios.post("http://localhost:8081/api/auth/send-otp", { email });
            setOtpSent(true);
            setMessage(response.data.message || "✅ OTP sent successfully!");
        } catch (error) {
            console.error("Error sending OTP:", error.response?.data || error.message);
            setMessage(error.response?.data?.message || "❌ Failed to send OTP!");
        } finally {
            setLoading(false);
        }
    };

    const verifyOtpAndRegister = async () => {
        if (!email || !password || !otp) {
            setMessage("All fields are required!");
            return;
        }

        console.log("Sending verification request:", { email, password, otp });
        setMessage("✅ Email Verify Successfully");

        try {
            setLoading(true);
            const response = await axios.post("http://localhost:8081/api/auth/verify-otp", {
                email,
                password,
                otp,
            });

            setMessage(response.data.message || " ✅ User Login successfully!");
            navigate("/admin");
        } catch (error) {
            console.error("OTP Verification Error:", error.response?.data || error.message);
            setMessage(error.response?.data?.message || "❌ Invalid OTP!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div class="container shadow p-5 mt-5" style={{ width: "400px", height: "500px" }}>
            <h2 class="text-primary text-center">Login</h2>
            {message && <p style={{ color: message.includes("❌") ? "red" : "green" }}>{message}</p>} {/* Display message */}
            <div className="col-md mt-5">
                <div className="form-floating">

                    <input type="email" name="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={otpSent}
                    />
                    <label htmlFor="email">Email Address</label>
                </div>
            </div><br />
                <button type="button" class="btn btn-outline-warning" onClick={()=>navigate("/reg")}> Register</button>
            {!otpSent ? (
                <button onClick={sendOtp} disabled={loading} class="btn btn-outline-success w-50" style={{marginLeft:"60px"}}>
                    {loading ? "Sending OTP..." : "Send OTP"}
                </button>
            )
            : (
                <>
                   
                <div className="col-md">
                <div className="form-floating">

                    <input type="email" name="email" className="form-control" id="email" value={password} onChange={(e) => setPassword(e.target.value)}
                    />
                    <label htmlFor="email">Email Password</label>
                </div>
            </div>
            <br/>
                   
                <div className="col-md">
                <div className="form-floating">

                    <input type="email" name="email" className="form-control" id="email"  value={otp}  onChange={(e) => setOtp(e.target.value)}
                    />
                    <label htmlFor="email">Enter Otp</label>
                </div>
            </div>
                    <button onClick={verifyOtpAndRegister} disabled={loading} class="btn btn-outline-primary w-50 mt-4" style={{marginLeft:"60px"}}>
                        {loading ? "Verifying..." : "Verify & Login"}
                    </button>
                </>
            )}
        </div>
    );
};
export default Login;