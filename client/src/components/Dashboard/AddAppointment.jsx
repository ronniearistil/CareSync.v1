// import React, { useState, useEffect } from "react";
// import { Box, TextField, Button, Typography, MenuItem } from "@mui/material";
// import * as appointmentApi from "../../utils/appointmentApi";
// import * as userApi from "../../utils/userApi";
// 
// const AddAppointmentForm = () => {
//     const [formData, setFormData] = useState({
//         date: "",
//         time: "",
//         status: "Scheduled",
//         location: "",
//         user_id: "",
//     });
// 
//     const [users, setUsers] = useState([]);
//     const [error, setError] = useState(null);
// 
//     // Fetch users (patients/providers)
//     useEffect(() => {
//         const fetchUsers = async () => {
//             try {
//                 const data = await userApi.fetchUsers();
//                 setUsers(data);
//             } catch (err) {
//                 console.error("Error fetching users:", err);
//                 setError("Failed to load users.");
//             }
//         };
// 
//         fetchUsers();
//     }, []);
// 
//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };
// 
//     const handleSubmit = async () => {
//         try {
//             await appointmentApi.createAppointment(formData); // POST request to backend
//             alert("Appointment created successfully!");
//             window.location.href = "/appointments/calendar"; // Redirect to calendar
//         } catch (err) {
//             console.error("Failed to create appointment:", err);
//             alert("Failed to create appointment. Please try again.");
//         }
//     };
// 
//     if (error) {
//         return <Typography color="error">{error}</Typography>;
//     }
// 
//     return (
//         <Box sx={{ padding: "2rem", maxWidth: "500px", margin: "0 auto" }}>
//             <Typography
//                 variant="h4"
//                 sx={{ marginBottom: "2rem", fontWeight: "bold", textAlign: "center" }}
//             >
//                 Add Appointment
//             </Typography>
//             <TextField
//                 name="date"
//                 label="Date"
//                 type="date"
//                 InputLabelProps={{ shrink: true }}
//                 value={formData.date}
//                 onChange={handleInputChange}
//                 fullWidth
//                 sx={{ marginBottom: "1rem" }}
//             />
//             <TextField
//                 name="time"
//                 label="Time"
//                 type="time"
//                 InputLabelProps={{ shrink: true }}
//                 value={formData.time}
//                 onChange={handleInputChange}
//                 fullWidth
//                 sx={{ marginBottom: "1rem" }}
//             />
//             <TextField
//                 name="status"
//                 label="Status"
//                 select
//                 value={formData.status}
//                 onChange={handleInputChange}
//                 fullWidth
//                 sx={{ marginBottom: "1rem" }}
//             >
//                 <MenuItem value="Scheduled">Scheduled</MenuItem>
//                 <MenuItem value="Completed">Completed</MenuItem>
//                 <MenuItem value="Cancelled">Cancelled</MenuItem>
//             </TextField>
//             <TextField
//                 name="location"
//                 label="Location"
//                 value={formData.location}
//                 onChange={handleInputChange}
//                 fullWidth
//                 sx={{ marginBottom: "1rem" }}
//             />
//             <TextField
//                 name="user_id"
//                 label="Assign to Patient"
//                 select
//                 value={formData.user_id}
//                 onChange={handleInputChange}
//                 fullWidth
//                 sx={{ marginBottom: "1rem" }}
//             >
//                 {users.map((user) => (
//                     <MenuItem key={user.id} value={user.id}>
//                         {user.name}
//                     </MenuItem>
//                 ))}
//             </TextField>
//             <Button
//                 variant="contained"
//                 color="primary"
//                 onClick={handleSubmit}
//                 sx={{ width: "100%", padding: "0.75rem" }}
//             >
//                 Add Appointment
//             </Button>
//         </Box>
//     );
// };
// 
// export default AddAppointmentForm;


import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import { createAppointment } from "../../utils/appointmentApi";

const AddAppointment = () => {
    const [appointment, setAppointment] = useState({
        date: "",
        time: "",
        status: "",
        location: "",
        user_id: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAppointment((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await createAppointment(appointment);
            alert("Appointment created successfully!");
        } catch (error) {
            console.error("Failed to create appointment:", error);
            alert("Failed to create appointment.");
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit}>
            <TextField
                label="Date"
                name="date"
                type="date"
                value={appointment.date}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Time"
                name="time"
                type="time"
                value={appointment.time}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Status"
                name="status"
                value={appointment.status}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Location"
                name="location"
                value={appointment.location}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="User ID"
                name="user_id"
                value={appointment.user_id}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                Add Appointment
            </Button>
        </Box>
    );
};

export default AddAppointment;
