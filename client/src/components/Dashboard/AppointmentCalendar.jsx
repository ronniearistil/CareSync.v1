import React, { useEffect, useState } from 'react';
import { fetchAppointments } from '../../utils/api';

const AppointmentCalendar = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchAppointments();
        setAppointments(response.data);
      } catch (error) {
        console.error('Failed to fetch appointments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this runs only on component mount.

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Appointments</h2>
      <ul>
        {appointments.map(({ id, date, time, status }) => (
          <li key={id}>
            {date} at {time} ({status})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AppointmentCalendar;


