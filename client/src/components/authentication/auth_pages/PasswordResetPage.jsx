import React, { useState } from "react";
import axios from "axios";

const PasswordResetPage = () => {
    const [formData, setFormData] = useState({
        email: "",
        new_password: "",
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5555/auth/reset_password", formData);
            setSuccess(response.data.message);
            setError(null);
        } catch (err) {
            setError(err.response?.data?.error || "An unexpected error occurred.");
            setSuccess(null);
        }
    };

    return (
        <div style={{ maxWidth: "400px", margin: "0 auto", padding: "20px" }}>
            <h1>Reset Password</h1>
            {error && <p role="alert" style={{ color: "red" }}>{error}</p>}
            {success && <p role="alert" style={{ color: "green" }}>{success}</p>}
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "10px" }}>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        style={{ width: "100%", padding: "8px", marginTop: "5px" }}
                    />
                </div>
                <div style={{ marginBottom: "10px" }}>
                    <label>New Password:</label>
                    <input
                        type="password"
                        name="new_password"
                        placeholder="New Password"
                        value={formData.new_password}
                        onChange={handleChange}
                        required
                        style={{ width: "100%", padding: "8px", marginTop: "5px" }}
                    />
                </div>
                <button type="submit" style={{ padding: "10px 20px", backgroundColor: "#4CAF50", color: "white", border: "none", cursor: "pointer" }}>
                    Reset Password
                </button>
            </form>
        </div>
    );
};

export default PasswordResetPage;

