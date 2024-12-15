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
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 600,
      color: "#2E2E2E",
    },
    body1: {
      fontSize: "1.25rem",
      color: "#2E2E2E",
    },
  },
});


export default healthcareTheme;



