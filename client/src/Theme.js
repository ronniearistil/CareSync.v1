import { createTheme } from "@mui/material/styles";

const healthcareTheme = createTheme({
  palette: {
    primary: {
      main: "#1976D2", // Trustworthy Blue
    },
    secondary: {
      main: "#388E3C", // Calming Green
    },
    background: {
      default: "#F7F7F7", // Soft Off-white
      paper: "#FFFFFF", // Clean White
      dynamic: "#E3F2FD", // Light Blue for dynamic use
    },
    text: {
      primary: "#2E2E2E", // Dark Gray
      secondary: "#757575", // Muted Gray
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h1: {
      fontSize: "3rem",
      fontWeight: 700,
      color: "#2E2E2E",
      '@media (max-width:600px)': {
        fontSize: "2rem",
      },
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 600,
      color: "#2E2E2E",
      '@media (max-width:600px)': {
        fontSize: "1.5rem",
      },
    },
    body1: {
      fontSize: "1.25rem",
      color: "#2E2E2E",
      '@media (max-width:600px)': {
        fontSize: "1rem",
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});

export default healthcareTheme;





