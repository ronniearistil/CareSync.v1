import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976D2', // Blue
    },
    secondary: {
      main: '#388E3C', // Green
    },
    warning: {
      main: '#FF9800', // Orange
    },
    background: {
      default: '#F5F5F5', // Light Gray
      paper: '#FFFFFF', // White
    },
    text: {
      primary: '#212121', // Dark Gray
      secondary: '#757575', // Lighter Gray for subtitles
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h1: {
      fontSize: '2rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '1.5rem',
      fontWeight: 600,
    },
    body1: {
      fontSize: '1rem',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          textTransform: 'none', // Avoid uppercase text
        },
      },
    },
  },
});

export default theme;
