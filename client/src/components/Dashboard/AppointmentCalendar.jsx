// import React, { useEffect, useState } from "react";
// import { Box, Button, List, ListItem, Typography } from "@mui/material";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGridPlugin from "@fullcalendar/timegrid";
// import interactionPlugin from "@fullcalendar/interaction";
// import * as appointmentApi from "../../utils/appointmentApi";
// 
// const AppointmentCalendar = ({ onAppointmentSelect = () => {} }) => {
//   const [appointments, setAppointments] = useState([]);
//   const [view, setView] = useState("calendar");
//   const [error, setError] = useState(null);
// 
//   useEffect(() => {
//     const loadAppointments = async () => {
//       try {
//         const data = await appointmentApi.fetchAppointments();
//         console.log("Fetched appointments:", data); // Debugging log
//         const events = data.map((appointment) => ({
//           id: appointment.id,
//           title: `${appointment.status} - ${appointment.location}`,
//           start: `${appointment.date}T${appointment.time}`,
//         }));
//         setAppointments(events);
//       } catch (err) {
//         console.error("Failed to fetch appointments:", err);
//         setError("Unable to load appointments.");
//       }
//     };
// 
//     loadAppointments();
//   }, []);
// 
//   const getAppointmentById = (id) =>
//     appointments.find((appt) => appt.id === parseInt(id));
// 
//   if (error) {
//     return <Typography color="error">{error}</Typography>;
//   }
// 
//   if (!appointments || appointments.length === 0) {
//     return (
//       <Box sx={{ padding: "2rem" }}>
//         <Typography variant="h6" color="text.secondary">
//           No appointments available.
//         </Typography>
//       </Box>
//     );
//   }
// 
//   return (
//     <Box sx={{ padding: "2rem" }}>
//       {/* Header */}
//       <Typography
//         variant="h4"
//         sx={{
//           marginBottom: "1rem",
//           fontWeight: "bold",
//           textAlign: "center",
//           color: "#1976D2", // App's primary color
//         }}
//       >
//         Appointment Calendar
//       </Typography>
// 
//       {/* View Toggle Buttons */}
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "center",
//           marginBottom: "1rem",
//         }}
//       >
//         <Button
//           variant={view === "calendar" ? "contained" : "outlined"}
//           onClick={() => setView("calendar")}
//           sx={{
//             marginRight: 2,
//             color: view === "calendar" ? "white" : "#1976D2",
//             backgroundColor: view === "calendar" ? "#1976D2" : "transparent",
//             border: "1px solid #1976D2",
//             "&:hover": {
//               backgroundColor: view === "calendar" ? "#1565C0" : "rgba(25, 118, 210, 0.1)",
//             },
//           }}
//         >
//           Calendar View
//         </Button>
//         <Button
//           variant={view === "list" ? "contained" : "outlined"}
//           onClick={() => setView("list")}
//           sx={{
//             color: view === "list" ? "white" : "#1976D2",
//             backgroundColor: view === "list" ? "#1976D2" : "transparent",
//             border: "1px solid #1976D2",
//             "&:hover": {
//               backgroundColor: view === "list" ? "#1565C0" : "rgba(25, 118, 210, 0.1)",
//             },
//           }}
//         >
//           List View
//         </Button>
//       </Box>
// 
//       {/* Calendar or List View */}
//       {view === "calendar" ? (
//         <FullCalendar
//           plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
//           initialView="dayGridMonth"
//           events={appointments}
//           headerToolbar={{
//             left: "prev,next today",
//             center: "title",
//             right: "dayGridMonth,timeGridWeek,timeGridDay",
//           }}
//           eventClick={(info) =>
//             onAppointmentSelect(getAppointmentById(info.event.id))
//           }
//           height="75vh"
//         />
//       ) : (
//         <Box
//           sx={{
//             maxWidth: "800px",
//             margin: "0 auto",
//             padding: "1rem",
//             border: "1px solid #ddd",
//             borderRadius: "8px",
//           }}
//         >
//           <List>
//             {appointments.map((appointment) => (
//               <ListItem
//                 key={appointment.id}
//                 sx={{
//                   padding: "1rem",
//                   borderBottom: "1px solid #eee",
//                   cursor: "pointer",
//                   "&:hover": {
//                     backgroundColor: "rgba(25, 118, 210, 0.1)",
//                   },
//                 }}
//                 onClick={() =>
//                   onAppointmentSelect(getAppointmentById(appointment.id))
//                 }
//               >
//                 <Typography variant="body1">
//                   <strong>Date:</strong> {appointment.start.split("T")[0]}{" "}
//                   <strong>Time:</strong> {appointment.start.split("T")[1]}{" "}
//                   <strong>Status:</strong> {appointment.title.split(" - ")[0]}
//                 </Typography>
//               </ListItem>
//             ))}
//           </List>
//         </Box>
//       )}
//     </Box>
//   );
// };
// 
// export default AppointmentCalendar;


import React, { useEffect, useState } from "react";
import { Box, Button, List, ListItem, Typography, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import * as appointmentApi from "../../utils/appointmentApi";

const AppointmentCalendar = () => {
  const [appointments, setAppointments] = useState([]);
  const [view, setView] = useState("calendar");
  const [error, setError] = useState(null);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [editData, setEditData] = useState({}); // Data for editing
  const [isEditing, setIsEditing] = useState(false); // Edit dialog visibility

  // Fetch appointments on load
  useEffect(() => {
    const loadAppointments = async () => {
      try {
        const data = await appointmentApi.fetchAppointments();
        const events = data.map((appointment) => ({
          id: appointment.id,
          title: `${appointment.status} - ${appointment.location}`,
          start: `${appointment.date}T${appointment.time}`,
        }));
        setAppointments(events);
      } catch (err) {
        console.error("Failed to fetch appointments:", err);
        setError("Unable to load appointments.");
      }
    };

    loadAppointments();
  }, []);

  const handleEventClick = (info) => {
    const appointment = appointments.find((appt) => appt.id === parseInt(info.event.id));
    setSelectedAppointment(appointment);
    setEditData(appointment); // Pre-fill the edit data
    setIsEditing(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async () => {
    try {
      await appointmentApi.updateAppointment(editData.id, editData);
      alert("Appointment updated successfully!");

      // Refresh calendar data
      setAppointments((prev) =>
        prev.map((appt) =>
          appt.id === editData.id
            ? { ...appt, title: `${editData.status} - ${editData.location}`, start: `${editData.date}T${editData.time}` }
            : appt
        )
      );
      setIsEditing(false);
    } catch (err) {
      console.error("Failed to update appointment:", err);
      alert("Failed to update appointment. Please try again.");
    }
  };

  return (
    <Box sx={{ padding: "2rem" }}>
      <Typography variant="h4" sx={{ marginBottom: "1rem", textAlign: "center" }}>
        Appointment Calendar
      </Typography>

      {/* View Toggle Buttons */}
      <Box sx={{ display: "flex", justifyContent: "center", marginBottom: "1rem" }}>
        <Button
          variant={view === "calendar" ? "contained" : "outlined"}
          onClick={() => setView("calendar")}
        >
          Calendar View
        </Button>
        <Button
          variant={view === "list" ? "contained" : "outlined"}
          onClick={() => setView("list")}
          sx={{ marginLeft: 2 }}
        >
          List View
        </Button>
      </Box>

      {/* Calendar View */}
      {view === "calendar" ? (
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={appointments}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          eventClick={handleEventClick}
          height="75vh"
        />
      ) : (
        <List>
          {appointments.map((appointment) => (
            <ListItem key={appointment.id} sx={{ borderBottom: "1px solid #ddd", cursor: "pointer" }}>
              <Typography>
                {appointment.title} on {appointment.start.split("T")[0]} at{" "}
                {appointment.start.split("T")[1]}
              </Typography>
            </ListItem>
          ))}
        </List>
      )}

      {/* Edit Appointment Dialog */}
      <Dialog open={isEditing} onClose={() => setIsEditing(false)}>
        <DialogTitle>Edit Appointment</DialogTitle>
        <DialogContent>
          <TextField
            label="Date"
            name="date"
            type="date"
            value={editData.date || ""}
            onChange={handleEditChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Time"
            name="time"
            type="time"
            value={editData.time || ""}
            onChange={handleEditChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Location"
            name="location"
            value={editData.location || ""}
            onChange={handleEditChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Status"
            name="status"
            value={editData.status || ""}
            onChange={handleEditChange}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsEditing(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleEditSubmit} color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AppointmentCalendar;
