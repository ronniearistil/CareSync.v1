import React, { useState, useEffect } from "react";
import { Box, Button, List, ListItem, Typography } from "@mui/material";
import AppointmentCalendar from "./AppointmentCalendar"; // Ensure path is correct
import * as appointmentApi from "../../utils/appointmentApi"; // Updated path

const Appointments = () => {
  const [view, setView] = useState("calendar");
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadAppointments = async () => {
      try {
        const data = await appointmentApi.fetchAppointments(); // Adjusted call
        console.log("Fetched appointments:", data); // Debugging log
        setAppointments(data);
      } catch (err) {
        console.error("Failed to fetch appointments:", err);
        setError("Unable to load appointments");
      }
    };

    loadAppointments();
  }, []);

  const handleAppointmentClick = (appointment) => {
    setSelectedAppointment(appointment);
    setView("details");
  };

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box>
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <Button onClick={() => setView("calendar")}>Calendar View</Button>
        <Button onClick={() => setView("list")}>List View</Button>
      </Box>

      {view === "calendar" && (
        <AppointmentCalendar
          onAppointmentSelect={handleAppointmentClick}
          appointments={appointments}
        />
      )}

      {view === "list" && (
        <List>
          {appointments.map((appointment) => (
            <ListItem
              key={appointment.id}
              onClick={() => handleAppointmentClick(appointment)}
              sx={{ cursor: "pointer" }}
            >
              {appointment.date} - {appointment.status}
            </ListItem>
          ))}
        </List>
      )}

      {view === "details" && selectedAppointment && (
        <Box>
          <Typography variant="h5">Appointment Details</Typography>
          <Typography>Date: {selectedAppointment.date}</Typography>
          <Typography>Time: {selectedAppointment.time}</Typography>
          <Typography>Location: {selectedAppointment.location}</Typography>
          <Typography>Status: {selectedAppointment.status}</Typography>
        </Box>
      )}
    </Box>
  );
};

export default Appointments;

