// // Clean Up Test 12/29/2024
// 
// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Typography,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   Select,
//   MenuItem,
//   TextField,
//   IconButton,
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   Paper,
// } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import { toast } from "react-hot-toast";
// import * as appointmentApi from "../../utils/appointmentApi";
// import * as userApi from "../../utils/userApi";
// import * as patientApi from "../../utils/patientApi";
// import { useNavigate } from "react-router-dom";
// 
// import FullCalendar from '@fullcalendar/react'; 
// import dayGridPlugin from '@fullcalendar/daygrid'; 
// import timeGridPlugin from '@fullcalendar/timegrid'; 
// import interactionPlugin from '@fullcalendar/interaction'; 
// 
// 
// const Appointments = () => {
//   const [appointments, setAppointments] = useState([]);
//   const [providers, setProviders] = useState([]);
//   const [patients, setPatients] = useState([]);
//   const [filter, setFilter] = useState({
//     date: "",
//     time: "",
//     patient: "",
//     provider: "",
//     status: "",
//   });
//   const [editingAppointment, setEditingAppointment] = useState(null);
//   const navigate = useNavigate();
// 
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
//       } catch (err) {
//         toast.error("Error fetching data");
//         console.error("Error fetching data:", err);
//       }
//     };
//     fetchData();
//   }, []);
// 
//   const getPatientName = (id) => {
//     const patient = patients.find((p) => p.id === id);
//     return patient ? `${patient.first_name} ${patient.last_name}` : "N/A";
//   };
// 
//   const getProviderName = (id) => {
//     const provider = providers.find((p) => p.id === id);
//     return provider ? provider.name : "Unassigned";
//   };
// 
//   const filteredAppointments = appointments.filter((appointment) => {
//     const matchesDate = !filter.date || appointment.date === filter.date;
//     const matchesTime = !filter.time || appointment.time === filter.time;
//     const matchesPatient =
//       !filter.patient ||
//       getPatientName(appointment.patient_id)
//         .toLowerCase()
//         .includes(filter.patient.toLowerCase());
//     const matchesProvider =
//       !filter.provider ||
//       getProviderName(appointment.user_id)
//         .toLowerCase()
//         .includes(filter.provider.toLowerCase());
//     const matchesStatus = !filter.status || appointment.status === filter.status;
//     return matchesDate && matchesTime && matchesPatient && matchesProvider && matchesStatus;
//   });
// 
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
//       toast.success("Appointment updated successfully!");
//       setEditingAppointment(null);
//     } catch (err) {
//       toast.error("Failed to save changes.");
//       console.error("Failed to save changes:", err);
//     }
//   };
// 
//   const handleDeleteAppointment = async (id) => {
//     if (window.confirm("Are you sure you want to delete this appointment?")) {
//       try {
//         await appointmentApi.deleteAppointment(id);
//         setAppointments((prev) => prev.filter((appt) => appt.id !== id));
//         toast.success("Appointment deleted successfully!");
//       } catch (err) {
//         toast.error("Failed to delete appointment.");
//         console.error("Error deleting appointment:", err);
//       }
//     }
//   };
// 
//   return (
//     <Box sx={{ padding: "2rem", background: "transparent" }}>
//       <Typography variant="h4" sx={{ fontWeight: "bold", marginBottom: "1.5rem" }}>
//         Appointments
//       </Typography>
// 
//       <Paper
//         sx={{
//           padding: "1rem",
//           marginBottom: "1.5rem",
//           display: "flex",
//           flexWrap: "wrap",
//           gap: "1rem",
//           alignItems: "center",
//         }}
//         elevation={2}
//       >
//         <TextField
//           label="Date"
//           name="date"
//           type="date"
//           InputLabelProps={{ shrink: true }}
//           value={filter.date}
//           onChange={handleFilterChange}
//           size="small"
//         />
//         <TextField
//           label="Time"
//           name="time"
//           type="time"
//           InputLabelProps={{ shrink: true }}
//           value={filter.time}
//           onChange={handleFilterChange}
//           size="small"
//         />
//         <TextField
//           label="Patient Name"
//           name="patient"
//           value={filter.patient}
//           onChange={handleFilterChange}
//           size="small"
//         />
//         <TextField
//           label="Provider Name"
//           name="provider"
//           value={filter.provider}
//           onChange={handleFilterChange}
//           size="small"
//         />
//         <Select
//           displayEmpty
//           name="status"
//           value={filter.status}
//           onChange={handleFilterChange}
//           size="small"
//         >
//           <MenuItem value="">All Statuses</MenuItem>
//           <MenuItem value="Scheduled">Scheduled</MenuItem>
//           <MenuItem value="Completed">Completed</MenuItem>
//           <MenuItem value="Cancelled">Cancelled</MenuItem>
//         </Select>
//       </Paper>
// 
//       <Paper elevation={2}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Date</TableCell>
//               <TableCell>Time</TableCell>
//               <TableCell>Patient Name</TableCell>
//               <TableCell>Provider Name</TableCell>
//               <TableCell>Status</TableCell>
//               <TableCell align="center">Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {filteredAppointments.map((appointment) => (
//               <TableRow key={appointment.id} hover>
//                 <TableCell>{appointment.date}</TableCell>
//                 <TableCell>{appointment.time}</TableCell>
//                 <TableCell
//                   sx={{ cursor: "pointer", color: "blue" }}
//                   onClick={() => navigate(`/patients/${appointment.patient_id}`)}
//                 >
//                   {getPatientName(appointment.patient_id)}
//                 </TableCell>
//                 <TableCell
//                   sx={{ cursor: "pointer", color: "blue" }}
//                   onClick={() => navigate(`/providers/${appointment.user_id}`)}
//                 >
//                   {getProviderName(appointment.user_id)}
//                 </TableCell>
//                 <TableCell>{appointment.status}</TableCell>
//                 <TableCell align="center">
//                   <IconButton color="primary" onClick={() => handleEditAppointment(appointment)}>
//                     <EditIcon />
//                   </IconButton>
//                   <IconButton color="error" onClick={() => handleDeleteAppointment(appointment.id)}>
//                     <DeleteIcon />
//                   </IconButton>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </Paper>
//     </Box>
//   );
// };
// 
// export default Appointments;

// Deployment Test 12/30

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

import FullCalendar from '@fullcalendar/react'; 
import dayGridPlugin from '@fullcalendar/daygrid'; 
import timeGridPlugin from '@fullcalendar/timegrid'; 
import interactionPlugin from '@fullcalendar/interaction'; 


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

  const getPatientName = (id) => {
    const patient = patients.find((p) => p.id === id);
    return patient ? `${patient.first_name} ${patient.last_name}` : "N/A";
  };

  const getProviderName = (id) => {
    const provider = providers.find((p) => p.id === id);
    return provider ? provider.name : "Unassigned";
  };

  const filteredAppointments = appointments.filter((appointment) => {
    const matchesDate = !filter.date || appointment.date === filter.date;
    const matchesTime = !filter.time || appointment.time === filter.time;
    const matchesPatient =
      !filter.patient ||
      getPatientName(appointment.patient_id)
        .toLowerCase()
        .includes(filter.patient.toLowerCase());
    const matchesProvider =
      !filter.provider ||
      getProviderName(appointment.user_id)
        .toLowerCase()
        .includes(filter.provider.toLowerCase());
    const matchesStatus = !filter.status || appointment.status === filter.status;
    return matchesDate && matchesTime && matchesPatient && matchesProvider && matchesStatus;
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditAppointment = (appointment) => {
    setEditingAppointment(appointment);
  };

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
          label="Patient Name"
          name="patient"
          value={filter.patient}
          onChange={handleFilterChange}
          size="small"
        />
        <TextField
          label="Provider Name"
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
      </Paper>

      <Paper elevation={2}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Patient Name</TableCell>
              <TableCell>Provider Name</TableCell>
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
                  {getPatientName(appointment.patient_id)}
                </TableCell>
                <TableCell
                  sx={{ cursor: "pointer", color: "blue" }}
                  onClick={() => navigate(`/providers/${appointment.user_id}`)}
                >
                  {getProviderName(appointment.user_id)}
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
    </Box>
  );
};

export default Appointments;
