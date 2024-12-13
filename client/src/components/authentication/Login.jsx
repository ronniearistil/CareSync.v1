// import React, { useState } from 'react';
// import api from '../../utils/api';
// 
// const Login = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');
// 
//     const handleLogin = async (e) => {
//         e.preventDefault();
//         try {
//             await api.post('/auth/login', { email, password });
//             window.location.href = '/'; // Redirect to the home page
//         } catch (err) {
//             setError("Invalid email or password");
//             console.error("Login error:", err);
//         }
//     };
// 
//     return (
//         <form onSubmit={handleLogin}>
//             <h2>Login</h2>
//             {error && <p style={{ color: 'red' }}>{error}</p>}
//             <input
//                 type="email"
//                 placeholder="Email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//             />
//             <input
//                 type="password"
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//             />
//             <button type="submit">Login</button>
//         </form>
//     );
// };
// 
// export default Login;
