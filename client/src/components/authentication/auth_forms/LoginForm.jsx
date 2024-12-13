// import React, { useState } from "react";
// import axios from "axios";
// 
// const LoginForm = () => {
//     const [formData, setFormData] = useState({
//         email: "",
//         password: "",
//     });
// 
//     const [error, setError] = useState(null);
// 
//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };
// 
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post("http://localhost:5555/auth/login", formData);
//             document.cookie = `access_token_cookie=${response.data.access_token}; path=/; httponly`;
//             document.cookie = `refresh_token_cookie=${response.data.refresh_token}; path=/; httponly`;
//             setError(null);
//             window.location.href = "/"; // Redirect to Dashboard
//         } catch (err) {
//             setError(err.response?.data?.error || "Invalid login credentials.");
//         }
//     };
// 
//     return (
//         <div>
//             <h1>Login</h1>
//             {error && <p style={{ color: "red" }}>{error}</p>}
//             <form onSubmit={handleSubmit}>
//                 <div>
//                     <label>Email:</label>
//                     <input
//                         type="email"
//                         name="email"
//                         value={formData.email}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>
//                 <div>
//                     <label>Password:</label>
//                     <input
//                         type="password"
//                         name="password"
//                         value={formData.password}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>
//                 <button type="submit">Login</button>
//             </form>
//         </div>
//     );
// };
// 
// export default LoginForm;
