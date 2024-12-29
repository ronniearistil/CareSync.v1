// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Typography,
//   IconButton,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   MenuItem,
//   Select,
//   TextField,
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
// } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import * as userApi from "../../utils/userApi";
// import * as patientApi from "../../utils/patientApi";
// import * as healthRecordApi from "../../utils/healthRecordApi";
// import * as appointmentApi from "../../utils/appointmentApi";
// 
// const Appointments = () => {
//   const [appointments, setAppointments] = useState([]);
//   const [providers, setProviders] = useState([]);
//   const [patients, setPatients] = useState([]);
//   const [healthRecords, setHealthRecords] = useState([]);
//   const [filter, setFilter] = useState({
//     date: "",
//     time: "",
//     patient: "",
//     provider: "",
//     status: "",
//   });
//   const [editingAppointment, setEditingAppointment] = useState(null);
//   const [error, setError] = useState(null);
// 
//   // Fetch appointments, providers, patients, and health records
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const appointmentsData = await appointmentApi.fetchAppointments();
//         setAppointments(appointmentsData);
// 
//         const providersData = await userApi.fetchUsers();
//         setProviders(providersData.filter(user => user.role === "Provider"));
// 
//         const patientsData = await patientApi.fetchPatients();
//         setPatients(patientsData);
// 
//         const healthRecordsData = await healthRecordApi.fetchHealthRecords();
//         setHealthRecords(healthRecordsData);
//       } catch (err) {
//         console.error("Error fetching data:", err);
//         setError("Unable to load data.");
//       }
//     };
// 
//     fetchData();
//   }, []);
// 
//   // Filter appointments
//   const filteredAppointments = appointments.filter((appointment) => {
//     const matchesDate = !filter.date || appointment.date === filter.date;
//     const matchesTime = !filter.time || appointment.time === filter.time;
//     const matchesPatient = !filter.patient || appointment.patient_id?.toString().includes(filter.patient);
//     const matchesProvider = !filter.provider || appointment.user_id?.toString().includes(filter.provider);
//     const matchesStatus = !filter.status || appointment.status === filter.status;
//     return matchesDate && matchesTime && matchesPatient && matchesProvider && matchesStatus;
//   });
// 
//   // Handle filter changes
//   const handleFilterChange = (e) => {
//     const { name, value } = e.target;
//     setFilter((prev) => ({ ...prev, [name]: value }));
//   };
// 
//   const handleEditAppointment = (appointment) => {
//     setEditingAppointment(appointment);
//   };
// 
//   const handleSaveEdit = async () => {
//     try {
//       await appointmentApi.updateAppointment(editingAppointment.id, editingAppointment);
//       setAppointments((prev) =>
//         prev.map((appt) => (appt.id === editingAppointment.id ? editingAppointment : appt))
//       );
//       alert("Appointment updated successfully!");
//       setEditingAppointment(null);
//     } catch (err) {
//       console.error("Failed to save changes:", err);
//       alert("Failed to save changes.");
//     }
//   };
// 
//   const handleDeleteAppointment = async (appointmentId) => {
//     if (window.confirm("Are you sure you want to delete this appointment?")) {
//       try {
//         await appointmentApi.deleteAppointment(appointmentId);
//         setAppointments((prev) => prev.filter((appt) => appt.id !== appointmentId));
//         alert("Appointment deleted successfully!");
//       } catch (err) {
//         console.error("Error deleting appointment:", err);
//         alert("Failed to delete appointment.");
//       }
//     }
//   };
// 
//   if (error) {
//     return <Typography color="error">{error}</Typography>;
//   }
// 
//   return (
//     <Box sx={{ padding: "2rem" }}>
//       {/* Header */}
//       <Typography
//         variant="h4"
//         sx={{
//           marginBottom: "2rem",
//           fontWeight: "bold",
//           textDecoration: "underline",
//           color: "#1976D2",
//         }}
//       >
//         Appointments
//       </Typography>
// 
//       {/* Filters */}
//       <Table>
//         <TableHead>
//           <TableRow>
//             <TableCell>
//               <TextField
//                 label="Filter by Date"
//                 name="date"
//                 type="date"
//                 InputLabelProps={{ shrink: true }}
//                 value={filter.date}
//                 onChange={handleFilterChange}
//               />
//             </TableCell>
//             <TableCell>
//               <TextField
//                 label="Filter by Time"
//                 name="time"
//                 type="time"
//                 InputLabelProps={{ shrink: true }}
//                 value={filter.time}
//                 onChange={handleFilterChange}
//               />
//             </TableCell>
//             <TableCell>
//               <TextField
//                 label="Filter by Patient"
//                 name="patient"
//                 value={filter.patient}
//                 onChange={handleFilterChange}
//               />
//             </TableCell>
//             <TableCell>
//               <TextField
//                 label="Filter by Provider"
//                 name="provider"
//                 value={filter.provider}
//                 onChange={handleFilterChange}
//               />
//             </TableCell>
//             <TableCell>
//               <Select
//                 displayEmpty
//                 name="status"
//                 value={filter.status}
//                 onChange={handleFilterChange}
//                 sx={{ width: "150px" }}
//               >
//                 <MenuItem value="">All Statuses</MenuItem>
//                 <MenuItem value="Scheduled">Scheduled</MenuItem>
//                 <MenuItem value="Completed">Completed</MenuItem>
//                 <MenuItem value="Cancelled">Cancelled</MenuItem>
//               </Select>
//             </TableCell>
//             <TableCell />
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {filteredAppointments.map((appointment) => (
//             <TableRow key={appointment.id}>
//               <TableCell>{appointment.date}</TableCell>
//               <TableCell>{appointment.time}</TableCell>
//               <TableCell>{appointment.patient_id || "N/A"}</TableCell>
//               <TableCell>{appointment.user_id || "Unassigned"}</TableCell>
//               <TableCell>{appointment.status}</TableCell>
//               <TableCell>
//                 <IconButton
//                   color="primary"
//                   onClick={() => handleEditAppointment(appointment)}
//                 >
//                   <EditIcon />
//                 </IconButton>
//                 <IconButton
//                   color="error"
//                   onClick={() => handleDeleteAppointment(appointment.id)}
//                 >
//                   <DeleteIcon />
//                 </IconButton>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
// 
//       {/* Edit Appointment Modal */}
//       {editingAppointment && (
//         <Dialog open={Boolean(editingAppointment)} onClose={() => setEditingAppointment(null)}>
//           <DialogTitle>Edit Appointment</DialogTitle>
//           <DialogContent>
//             <TextField
//               label="Date"
//               value={editingAppointment.date}
//               onChange={(e) =>
//                 setEditingAppointment((prev) => ({ ...prev, date: e.target.value }))
//               }
//               sx={{ marginBottom: "1rem", width: "100%" }}
//             />
//             <TextField
//               label="Time"
//               value={editingAppointment.time}
//               onChange={(e) =>
//                 setEditingAppointment((prev) => ({ ...prev, time: e.target.value }))
//               }
//               sx={{ marginBottom: "1rem", width: "100%" }}
//             />
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={handleSaveEdit} variant="contained">
//               Save
//             </Button>
//             <Button onClick={() => setEditingAppointment(null)} variant="outlined">
//               Cancel
//             </Button>
//           </DialogActions>
//         </Dialog>
//       )}
//     </Box>
//   );
// };
// 
// export default Appointments;


// Clean Up Test 12/29/2024

import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Select,
  MenuItem,
  TextField,
  IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-hot-toast";
import * as appointmentApi from "../../utils/appointmentApi";
import * as userApi from "../../utils/userApi";
import * as patientApi from "../../utils/patientApi";
import { useNavigate } from "react-router-dom";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [providers, setProviders] = useState([]);
  const [patients, setPatients] = useState([]);
  const [filter, setFilter] = useState({
    date: "",
    time: "",
    patient: "",
    provider: "",
    status: "",
  });
  const [editingAppointment, setEditingAppointment] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const appointmentsData = await appointmentApi.fetchAppointments();
        setAppointments(appointmentsData);

        const providersData = await userApi.fetchUsers();
        setProviders(providersData.filter(user => user.role === "Provider"));

        const patientsData = await patientApi.fetchPatients();
        setPatients(patientsData);
      } catch (err) {
        toast.error("Error fetching data");
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, []);

  const filteredAppointments = appointments.filter((appointment) => {
    const matchesDate = !filter.date || appointment.date === filter.date;
    const matchesTime = !filter.time || appointment.time === filter.time;
    const matchesPatient = !filter.patient || appointment.patient_id?.toString().includes(filter.patient);
    const matchesProvider = !filter.provider || appointment.user_id?.toString().includes(filter.provider);
    const matchesStatus = !filter.status || appointment.status === filter.status;
    return matchesDate && matchesTime && matchesPatient && matchesProvider && matchesStatus;
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditAppointment = (appointment) => setEditingAppointment(appointment);

  const handleSaveEdit = async () => {
    try {
      await appointmentApi.updateAppointment(editingAppointment.id, editingAppointment);
      setAppointments((prev) =>
        prev.map((appt) => (appt.id === editingAppointment.id ? editingAppointment : appt))
      );
      toast.success("Appointment updated successfully!");
      setEditingAppointment(null);
    } catch (err) {
      toast.error("Failed to save changes.");
      console.error("Failed to save changes:", err);
    }
  };

  const handleDeleteAppointment = async (id) => {
    if (window.confirm("Are you sure you want to delete this appointment?")) {
      try {
        await appointmentApi.deleteAppointment(id);
        setAppointments((prev) => prev.filter((appt) => appt.id !== id));
        toast.success("Appointment deleted successfully!");
      } catch (err) {
        toast.error("Failed to delete appointment.");
        console.error("Error deleting appointment:", err);
      }
    }
  };

  return (
    <Box sx={{ padding: "2rem", background: "transparent" }}>
      <Typography variant="h4" sx={{ fontWeight: "bold", marginBottom: "1.5rem" }}>
        Appointments
      </Typography>

      <Paper
        sx={{
          padding: "1rem",
          marginBottom: "1.5rem",
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          alignItems: "center",
        }}
        elevation={2}
      >
        <TextField
          label="Date"
          name="date"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={filter.date}
          onChange={handleFilterChange}
          size="small"
        />
        <TextField
          label="Time"
          name="time"
          type="time"
          InputLabelProps={{ shrink: true }}
          value={filter.time}
          onChange={handleFilterChange}
          size="small"
        />
        <TextField
          label="Patient ID"
          name="patient"
          value={filter.patient}
          onChange={handleFilterChange}
          size="small"
        />
        <TextField
          label="Provider ID"
          name="provider"
          value={filter.provider}
          onChange={handleFilterChange}
          size="small"
        />
        <Select
          displayEmpty
          name="status"
          value={filter.status}
          onChange={handleFilterChange}
          size="small"
        >
          <MenuItem value="">All Statuses</MenuItem>
          <MenuItem value="Scheduled">Scheduled</MenuItem>
          <MenuItem value="Completed">Completed</MenuItem>
          <MenuItem value="Cancelled">Cancelled</MenuItem>
        </Select>
        <Button variant="outlined" onClick={() => setFilter({ date: "", time: "", status: "" })}>
          Reset Filters
        </Button>
      </Paper>

      <Paper elevation={2}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Patient ID</TableCell>
              <TableCell>Provider ID</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAppointments.map((appointment) => (
              <TableRow key={appointment.id} hover>
                <TableCell>{appointment.date}</TableCell>
                <TableCell>{appointment.time}</TableCell>
                <TableCell
                  sx={{ cursor: "pointer", color: "blue" }}
                  onClick={() => navigate(`/patients/${appointment.patient_id}`)}
                >
                  {appointment.patient_id || "N/A"}
                </TableCell>
                <TableCell
                  sx={{ cursor: "pointer", color: "blue" }}
                  onClick={() => navigate(`/providers/${appointment.user_id}`)}
                >
                  {appointment.user_id || "Unassigned"}
                </TableCell>
                <TableCell>{appointment.status}</TableCell>
                <TableCell align="center">
                  <IconButton color="primary" onClick={() => handleEditAppointment(appointment)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDeleteAppointment(appointment.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {editingAppointment && (
        <Dialog open onClose={() => setEditingAppointment(null)}>
          <DialogTitle>Edit Appointment</DialogTitle>
          <DialogContent>
            <TextField
              label="Date"
              value={editingAppointment.date}
              onChange={(e) => setEditingAppointment({ ...editingAppointment, date: e.target.value })}
              fullWidth
              sx={{ marginBottom: "1rem" }}
            />
            <TextField
              label="Time"
              value={editingAppointment.time}
              onChange={(e) => setEditingAppointment({ ...editingAppointment, time: e.target.value })}
              fullWidth
            />
            <TextField
              label="Provider ID"
              value={editingAppointment.user_id || ""}
              onChange={(e) => setEditingAppointment({ ...editingAppointment, user_id: e.target.value })}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button variant="contained" onClick={handleSaveEdit}>Save</Button>
            <Button variant="outlined" onClick={() => setEditingAppointment(null)}>Cancel</Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default Appointments;
