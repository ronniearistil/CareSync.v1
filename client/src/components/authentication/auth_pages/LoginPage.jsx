import React, { useState } from "react";
import axios from "axios";

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5555/auth/login", formData);
            document.cookie = `access_token=${response.data.access_token};path=/;httponly`;
            document.cookie = `refresh_token=${response.data.refresh_token};path=/;httponly`;
            setError(null);
            // Redirect to dashboard
            window.location.href = "/";
        } catch (err) {
            setError(err.response?.data?.error || "Invalid login credentials.");
        }
    };

    return (
        <div>
            <h1>Login</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}
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
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginPage;
