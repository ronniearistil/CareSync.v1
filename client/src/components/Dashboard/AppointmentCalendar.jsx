// import React, { useEffect, useState } from "react";
// import { Box, Button, List, ListItem, Typography, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGridPlugin from "@fullcalendar/timegrid";
// import interactionPlugin from "@fullcalendar/interaction";
// import * as appointmentApi from "../../utils/appointmentApi";
// 
// const AppointmentCalendar = () => {
//   const [appointments, setAppointments] = useState([]);
//   const [view, setView] = useState("calendar");
//   const [error, setError] = useState(null);
//   const [selectedAppointment, setSelectedAppointment] = useState(null);
//   const [editData, setEditData] = useState({}); // Data for editing
//   const [isEditing, setIsEditing] = useState(false); // Edit dialog visibility
// 
//   // Fetch appointments on load
//   useEffect(() => {
//     const loadAppointments = async () => {
//       try {
//         const data = await appointmentApi.fetchAppointments();
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
//   const handleEventClick = (info) => {
//     const appointment = appointments.find((appt) => appt.id === parseInt(info.event.id));
//     setSelectedAppointment(appointment);
//     setEditData(appointment); // Pre-fill the edit data
//     setIsEditing(true);
//   };
// 
//   const handleEditChange = (e) => {
//     const { name, value } = e.target;
//     setEditData((prev) => ({ ...prev, [name]: value }));
//   };
// 
//   const handleEditSubmit = async () => {
//     try {
//       await appointmentApi.updateAppointment(editData.id, editData);
//       alert("Appointment updated successfully!");
// 
//       // Refresh calendar data
//       setAppointments((prev) =>
//         prev.map((appt) =>
//           appt.id === editData.id
//             ? { ...appt, title: `${editData.status} - ${editData.location}`, start: `${editData.date}T${editData.time}` }
//             : appt
//         )
//       );
//       setIsEditing(false);
//     } catch (err) {
//       console.error("Failed to update appointment:", err);
//       alert("Failed to update appointment. Please try again.");
//     }
//   };
// 
//   return (
//     <Box sx={{ padding: "2rem" }}>
//       <Typography variant="h4" sx={{ marginBottom: "1rem", textAlign: "center" }}>
//         Appointment Calendar
//       </Typography>
// 
//       {/* View Toggle Buttons */}
//       <Box sx={{ display: "flex", justifyContent: "center", marginBottom: "1rem" }}>
//         <Button
//           variant={view === "calendar" ? "contained" : "outlined"}
//           onClick={() => setView("calendar")}
//         >
//           Calendar View
//         </Button>
//         <Button
//           variant={view === "list" ? "contained" : "outlined"}
//           onClick={() => setView("list")}
//           sx={{ marginLeft: 2 }}
//         >
//           List View
//         </Button>
//       </Box>
// 
//       {/* Calendar View */}
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
//           eventClick={handleEventClick}
//           height="75vh"
//         />
//       ) : (
//         <List>
//           {appointments.map((appointment) => (
//             <ListItem key={appointment.id} sx={{ borderBottom: "1px solid #ddd", cursor: "pointer" }}>
//               <Typography>
//                 {appointment.title} on {appointment.start.split("T")[0]} at{" "}
//                 {appointment.start.split("T")[1]}
//               </Typography>
//             </ListItem>
//           ))}
//         </List>
//       )}
// 
//       {/* Edit Appointment Dialog */}
//       <Dialog open={isEditing} onClose={() => setIsEditing(false)}>
//         <DialogTitle>Edit Appointment</DialogTitle>
//         <DialogContent>
//           <TextField
//             label="Date"
//             name="date"
//             type="date"
//             value={editData.date || ""}
//             onChange={handleEditChange}
//             fullWidth
//             margin="normal"
//           />
//           <TextField
//             label="Time"
//             name="time"
//             type="time"
//             value={editData.time || ""}
//             onChange={handleEditChange}
//             fullWidth
//             margin="normal"
//           />
//           <TextField
//             label="Location"
//             name="location"
//             value={editData.location || ""}
//             onChange={handleEditChange}
//             fullWidth
//             margin="normal"
//           />
//           <TextField
//             label="Status"
//             name="status"
//             value={editData.status || ""}
//             onChange={handleEditChange}
//             fullWidth
//             margin="normal"
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setIsEditing(false)} color="secondary">
//             Cancel
//           </Button>
//           <Button onClick={handleEditSubmit} color="primary">
//             Save Changes
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };
// 
// export default AppointmentCalendar;


// MPV Test YUP, FORMIK, TOAST

import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  List,
  ListItem,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress,
} from "@mui/material";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import * as appointmentApi from "../../utils/appointmentApi";
import { toast } from "react-hot-toast";

const defaultEditData = {
  date: "",
  time: "",
  location: "",
  status: "",
};

const AppointmentCalendar = () => {
  const [appointments, setAppointments] = useState([]);
  const [view, setView] = useState("calendar");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [editData, setEditData] = useState(defaultEditData);
  const [isEditing, setIsEditing] = useState(false);

  // Fetch appointments on load
  useEffect(() => {
    const loadAppointments = async () => {
      setLoading(true);
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
        toast.error("Failed to load appointments.");
      } finally {
        setLoading(false);
      }
    };

    loadAppointments();
  }, []);

  const onEventClick = (info) => {
    const appointment = appointments.find(
      (appt) => appt.id === parseInt(info.event.id)
    );
  
    const [formattedDate, formattedTime] = info.event.start
      .toISOString()
      .split("T");
  
    setSelectedAppointment(appointment);
    setEditData({
      id: appointment.id,
      date: formattedDate,
      time: formattedTime.slice(0, 5),
      location: appointment.location,
      status: appointment.status,
    });
    setIsEditing(true);
  };  

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const closeDialog = () => {
    setIsEditing(false);
  };

  const submitEdit = async () => {
    try {
      await appointmentApi.updateAppointment(editData.id, editData);
      toast.success("Appointment updated successfully!");

      // Refresh local state
      setAppointments((prev) =>
        prev.map((appt) =>
          appt.id === editData.id
            ? {
                ...appt,
                title: `${editData.status} - ${editData.location}`,
                start: `${editData.date}T${editData.time}`,
              }
            : appt
        )
      );

      closeDialog();
    } catch (err) {
      console.error("Failed to update appointment:", err);
      toast.error("Failed to update appointment. Please try again.");
    }
  };

  return (
    <Box sx={{ padding: { xs: "1rem", sm: "2rem" } }}>
      <Typography variant="h4" sx={{ marginBottom: "1rem", textAlign: "center" }}>
        Appointment Calendar
      </Typography>

      {loading && <CircularProgress sx={{ marginBottom: "1rem" }} />}
      {error && (
        <Typography sx={{ color: "error.main", marginBottom: "1rem" }}>
          {error}
        </Typography>
      )}

      <Box sx={{ display: "flex", justifyContent: "center", marginBottom: "1rem" }}>
        <Button
          variant={view === "calendar" ? "contained" : "outlined"}
          onClick={() => setView("calendar")}
          aria-label="Switch to Calendar View"
        >
          Calendar View
        </Button>
        <Button
          variant={view === "list" ? "contained" : "outlined"}
          onClick={() => setView("list")}
          sx={{ marginLeft: 2 }}
          aria-label="Switch to List View"
        >
          List View
        </Button>
      </Box>

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
          eventClick={onEventClick}
          height="75vh"
        />
      ) : (
        <List>
          {appointments.map((appointment) => (
            <ListItem
              key={appointment.id}
              sx={{
                borderBottom: "1px solid #ddd",
                cursor: "pointer",
                "&:hover": { backgroundColor: "action.hover" },
                padding: "1rem",
              }}
            >
              <Typography>
                {appointment.title} on {appointment.start.split("T")[0]} at{" "}
                {appointment.start.split("T")[1]}
              </Typography>
            </ListItem>
          ))}
        </List>
      )}

      <Dialog open={isEditing} onClose={closeDialog}>
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
          <Button onClick={closeDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={submitEdit} color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AppointmentCalendar;
