import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, List, ListItem } from "@mui/material";
import { fetchAppointments } from "../../utils/api";

const AppointmentCalendar = () => {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadAppointments = async () => {
      try {
        const data = await fetchAppointments();
        setAppointments(data);
      } catch (err) {
        console.error("Failed to fetch appointments:", err);
        setError("Unable to load appointments");
      }
    };
    loadAppointments();
  }, []);

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h2" gutterBottom>
          Appointments
        </Typography>
        <List>
          {appointments.map((appointment, index) => (
            <ListItem key={index}>{appointment.date}</ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default AppointmentCalendar;




