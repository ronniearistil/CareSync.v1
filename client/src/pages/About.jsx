import React from 'react';
import { Container, Typography, Box, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const About = () => {
  return (
    <Container maxWidth="md" sx={{ padding: '2rem', textAlign: 'center' }}>
      {/* Main Heading */}
      <Typography variant="h2" sx={{ fontWeight: 'bold', marginBottom: '1.5rem', color: '#4CAF50' }}>
        About CareSync
      </Typography>

      {/* Introduction */}
      <Typography variant="body1" sx={{ marginBottom: '2rem', lineHeight: 1.8 }}>
        CareSync simplifies tracking vaccines, screenings, and milestones for seamless care coordination. 
        It empowers healthcare providers with personalized recommendations and engages patients to actively 
        participate in their health journey.
      </Typography>

      {/* For Providers Section */}
      <Box sx={{ marginBottom: '2rem' }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: '1rem' }}>
          For Providers
        </Typography>
        <List sx={{ textAlign: 'left', margin: '0 auto', maxWidth: '600px' }}>
          {[
            "Manage patient health records (e.g., vaccines, screenings, procedures).",
            "View tailored recommendations for patient care milestones.",
            "Schedule and monitor follow-ups or overdue tasks.",
            "Access analytics to identify patient health trends and risks.",
            "Collaborate with patients through shared health plans and real-time updates."
          ].map((item, index) => (
            <ListItem key={index} sx={{ paddingLeft: 0 }}>
              <ListItemIcon>
                <CheckCircleIcon color="success" />
              </ListItemIcon>
              <ListItemText primary={item} />
            </ListItem>
          ))}
        </List>
      </Box>

      {/* For Patients Section */}
      <Box>
        <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: '1rem' }}>
          For Patients
        </Typography>
        <List sx={{ textAlign: 'left', margin: '0 auto', maxWidth: '600px' }}>
          {[
            "View personal health records and preventive care milestones.",
            "Receive reminders for upcoming appointments and tasks.",
            "Track progress toward health goals via interactive dashboards.",
            "Collaborate with providers for personalized care plans."
          ].map((item, index) => (
            <ListItem key={index} sx={{ paddingLeft: 0 }}>
              <ListItemIcon>
                <CheckCircleIcon color="success" />
              </ListItemIcon>
              <ListItemText primary={item} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
};

export default About;
