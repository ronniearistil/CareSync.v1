import React from 'react';
import { Container, Typography, Box, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const About = () => {
  return (
    <Container maxWidth="md" sx={{ padding: '2rem', textAlign: 'center', backgroundColor: '#F9F9F9', borderRadius: '8px' }}>
      {/* Main Heading */}
      <Typography
        variant="h2"
        sx={{
          fontWeight: 'bold',
          marginBottom: '1.5rem',
          color: 'primary.main',
          textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)',
        }}
      >
        About CareSync
      </Typography>

      {/* Introduction */}
      <Typography
        variant="body1"
        sx={{
          marginBottom: '2rem',
          lineHeight: 1.8,
          color: 'text.secondary',
        }}
      >
        CareSync simplifies tracking vaccines, screenings, and milestones for seamless care coordination. 
        It empowers healthcare providers with personalized recommendations and engages patients to actively 
        participate in their health journey.
      </Typography>

      {/* For Providers Section */}
      <Box sx={{ marginBottom: '2rem', backgroundColor: '#FFFFFF', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 'bold',
            marginBottom: '1rem',
            color: 'primary.main',
          }}
        >
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
                <CheckCircleIcon sx={{ color: 'success.main' }} />
              </ListItemIcon>
              <ListItemText primary={item} sx={{ color: 'text.primary' }} />
            </ListItem>
          ))}
        </List>
      </Box>

      {/* For Patients Section */}
      <Box sx={{ backgroundColor: '#FFFFFF', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 'bold',
            marginBottom: '1rem',
            color: 'primary.main',
          }}
        >
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
                <CheckCircleIcon sx={{ color: 'success.main' }} />
              </ListItemIcon>
              <ListItemText primary={item} sx={{ color: 'text.primary' }} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
};

export default About;
