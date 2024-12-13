import { createTheme } from '@mui/material/styles';

const sageTheme = createTheme({
  palette: {
    primary: {
      main: '#77815C', // Sage Green
    },
    secondary: {
      main: '#A9B97E', // Lighter Sage Green
    },
    warning: {
      main: '#FFB347', // Light Orange
    },
    background: {
      default: '#F7F7F2', // Off-white with a hint of green
      paper: '#FFFFFF', // White
    },
    text: {
      primary: '#2E2E2E', // Dark Gray/Black
      secondary: '#636363', // Medium Gray for subtitles
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
          textTransform: 'none',
          color: '#FFFFFF', // White text for buttons
        },
      },
    },
  },
});

export default sageTheme;

