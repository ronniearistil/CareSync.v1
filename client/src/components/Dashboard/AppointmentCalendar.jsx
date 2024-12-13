import React, { useEffect, useState } from "react";
import { Box, Button, List, ListItem, Typography } from "@mui/material";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { fetchAppointments } from "../../utils/api";

const AppointmentCalendar = ({ onAppointmentSelect = () => {} }) => {
  const [appointments, setAppointments] = useState([]);
  const [view, setView] = useState("calendar");
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadAppointments = async () => {
      try {
        const data = await fetchAppointments();
        const events = data.map((appointment) => ({
          id: appointment.id,
          title: `${appointment.status} - ${appointment.location}`,
          start: `${appointment.date}T${appointment.time}`,
        }));
        setAppointments(events);
      } catch (err) {
        console.error("Failed to fetch appointments:", err);
        setError("Unable to load appointments");
      }
    };

    loadAppointments();
  }, []);

  const getAppointmentById = (id) =>
    appointments.find((appt) => appt.id === parseInt(id));

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (appointments.length === 0) {
    return <Typography>No appointments available.</Typography>;
  }

  return (
    <Box>
      <Typography variant="h2" gutterBottom>
        Appointments
      </Typography>
      <Box sx={{ marginBottom: 2 }}>
        <Button
          variant={view === "calendar" ? "contained" : "outlined"}
          onClick={() => setView("calendar")}
          sx={{ marginRight: 1 }}
        >
          Calendar View
        </Button>
        <Button
          variant={view === "list" ? "contained" : "outlined"}
          onClick={() => setView("list")}
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
          eventClick={(info) =>
            onAppointmentSelect(getAppointmentById(info.event.id))
          }
          height="75vh"
        />
      ) : (
        <List>
          {appointments.map((appointment) => (
            <ListItem
              key={appointment.id}
              sx={{ cursor: "pointer" }}
              onClick={() => onAppointmentSelect(getAppointmentById(appointment.id))}
            >
              <Typography variant="body1">
                <strong>Date:</strong> {appointment.start.split("T")[0]}{" "}
                <strong>Time:</strong> {appointment.start.split("T")[1]}{" "}
                <strong>Status:</strong> {appointment.title.split(" - ")[0]}
              </Typography>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};


export default AppointmentCalendar;
