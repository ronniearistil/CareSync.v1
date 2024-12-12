import React from 'react';
import Analytics from '../components/Dashboard/Analytics';
import AppointmentCalendar from '../components/Dashboard/AppointmentCalendar';

const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <Analytics />
      <AppointmentCalendar />
    </div>
  );
};

export default Dashboard;


