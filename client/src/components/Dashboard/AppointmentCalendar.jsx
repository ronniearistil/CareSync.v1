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
//         const data = await appointmentApi.fetchAppointments(); // Use fetchAppointments from appointmentApi
//         console.log("Fetched appointments:", data); // Debugging log
//         const events = data.map((appointment) => ({
//           id: appointment.id,
//           title: `${appointment.status} - ${appointment.location}`,
//           start: `${appointment.date}T${appointment.time}`,
//         }));
//         setAppointments(events);
//       } catch (err) {
//         console.error("Failed to fetch appointments:", err); // Log the error
//         setError("Unable to load appointments."); // Set error message
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
//     return <Typography color="error">{error}</Typography>; // Render error message
//   }
// 
//   if (!appointments || appointments.length === 0) {
//     return <Typography>No appointments available.</Typography>; // Handle empty appointments
//   }
// 
//   return (
//     <Box>
//       <Typography variant="h2" gutterBottom>
//         Appointments
//       </Typography>
//       <Box sx={{ marginBottom: 2 }}>
//         <Button
//           variant={view === "calendar" ? "contained" : "outlined"}
//           onClick={() => setView("calendar")}
//           sx={{ marginRight: 1 }}
//         >
//           Calendar View
//         </Button>
//         <Button
//           variant={view === "list" ? "contained" : "outlined"}
//           onClick={() => setView("list")}
//         >
//           List View
//         </Button>
//       </Box>
// 
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
//         <List>
//           {appointments.map((appointment) => (
//             <ListItem
//               key={appointment.id}
//               sx={{ cursor: "pointer" }}
//               onClick={() => onAppointmentSelect(getAppointmentById(appointment.id))}
//             >
//               <Typography variant="body1">
//                 <strong>Date:</strong> {appointment.start.split("T")[0]}{" "}
//                 <strong>Time:</strong> {appointment.start.split("T")[1]}{" "}
//                 <strong>Status:</strong> {appointment.title.split(" - ")[0]}
//               </Typography>
//             </ListItem>
//           ))}
//         </List>
//       )}
//     </Box>
//   );
// };
// 
// export default AppointmentCalendar;



import React, { useEffect, useState } from "react";
import { Box, Button, List, ListItem, Typography } from "@mui/material";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import * as appointmentApi from "../../utils/appointmentApi";

const AppointmentCalendar = ({ onAppointmentSelect = () => {} }) => {
  const [appointments, setAppointments] = useState([]);
  const [view, setView] = useState("calendar");
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadAppointments = async () => {
      try {
        const data = await appointmentApi.fetchAppointments();
        console.log("Fetched appointments:", data); // Debugging log
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

  const getAppointmentById = (id) =>
    appointments.find((appt) => appt.id === parseInt(id));

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!appointments || appointments.length === 0) {
    return (
      <Box sx={{ padding: "2rem" }}>
        <Typography variant="h6" color="text.secondary">
          No appointments available.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: "2rem" }}>
      {/* Header */}
      <Typography
        variant="h4"
        sx={{
          marginBottom: "1rem",
          fontWeight: "bold",
          textAlign: "center",
          color: "#1976D2", // App's primary color
        }}
      >
        Appointment Calendar
      </Typography>

      {/* View Toggle Buttons */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "1rem",
        }}
      >
        <Button
          variant={view === "calendar" ? "contained" : "outlined"}
          onClick={() => setView("calendar")}
          sx={{
            marginRight: 2,
            color: view === "calendar" ? "white" : "#1976D2",
            backgroundColor: view === "calendar" ? "#1976D2" : "transparent",
            border: "1px solid #1976D2",
            "&:hover": {
              backgroundColor: view === "calendar" ? "#1565C0" : "rgba(25, 118, 210, 0.1)",
            },
          }}
        >
          Calendar View
        </Button>
        <Button
          variant={view === "list" ? "contained" : "outlined"}
          onClick={() => setView("list")}
          sx={{
            color: view === "list" ? "white" : "#1976D2",
            backgroundColor: view === "list" ? "#1976D2" : "transparent",
            border: "1px solid #1976D2",
            "&:hover": {
              backgroundColor: view === "list" ? "#1565C0" : "rgba(25, 118, 210, 0.1)",
            },
          }}
        >
          List View
        </Button>
      </Box>

      {/* Calendar or List View */}
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
          eventClick={(info) =>
            onAppointmentSelect(getAppointmentById(info.event.id))
          }
          height="75vh"
        />
      ) : (
        <Box
          sx={{
            maxWidth: "800px",
            margin: "0 auto",
            padding: "1rem",
            border: "1px solid #ddd",
            borderRadius: "8px",
          }}
        >
          <List>
            {appointments.map((appointment) => (
              <ListItem
                key={appointment.id}
                sx={{
                  padding: "1rem",
                  borderBottom: "1px solid #eee",
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "rgba(25, 118, 210, 0.1)",
                  },
                }}
                onClick={() =>
                  onAppointmentSelect(getAppointmentById(appointment.id))
                }
              >
                <Typography variant="body1">
                  <strong>Date:</strong> {appointment.start.split("T")[0]}{" "}
                  <strong>Time:</strong> {appointment.start.split("T")[1]}{" "}
                  <strong>Status:</strong> {appointment.title.split(" - ")[0]}
                </Typography>
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </Box>
  );
};

export default AppointmentCalendar;
