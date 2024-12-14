import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import * as appointmentApi from "../../utils/appointmentApi";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]); // Store fetched appointments
  const [selectedAppointment, setSelectedAppointment] = useState(null); // For details view
  const [error, setError] = useState(null); // Error handling
  const [view, setView] = useState("list"); // Current view: 'list' or 'details'

  // Fetch appointments on component load
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const data = await appointmentApi.fetchAppointments();
        setAppointments(data);
      } catch (err) {
        console.error("Failed to fetch appointments:", err);
        setError("Unable to load appointments. Please try again later.");
      }
    };
    fetchAppointments();
  }, []);

  // Handle selection of an appointment for details view
  const handleAppointmentClick = (appointment) => {
    setSelectedAppointment(appointment);
    setView("details");
  };

  // Handle back navigation from details to list view
  const handleBackToList = () => {
    setSelectedAppointment(null);
    setView("list");
  };

  // Render error state
  if (error) {
    return (
      <Box>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  // Main component rendering
  return (
    <Box>
      {/* List View */}
      {view === "list" && (
        <Box>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Appointments
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Time</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {appointments.map((appointment) => (
                <TableRow
                  key={appointment.id}
                  onClick={() => handleAppointmentClick(appointment)}
                  sx={{ cursor: "pointer", "&:hover": { backgroundColor: "#f5f5f5" } }}
                >
                  <TableCell>{appointment.date}</TableCell>
                  <TableCell>{appointment.time}</TableCell>
                  <TableCell>{appointment.location}</TableCell>
                  <TableCell>{appointment.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      )}

      {/* Details View */}
      {view === "details" && selectedAppointment && (
        <Box>
          <Button variant="outlined" onClick={handleBackToList} sx={{ mb: 2 }}>
            Back to List
          </Button>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Appointment Details
          </Typography>
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


