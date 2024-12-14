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
        <div>
            <h1>Reset Password</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="new_password"
                    placeholder="New Password"
                    value={formData.new_password}
                    onChange={handleChange}
                />
                <button type="submit">Reset Password</button>
            </form>
        </div>
    );
};

export default PasswordResetPage;