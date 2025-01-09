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
      default: "#F5F5F5", // Soft Off-white
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
  spacing: 8, // Consistent padding/margin
  shape: {
    borderRadius: 8, // Consistent border-radius
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
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#1976D2",
          padding: "0.5rem",
          '@media (max-width:600px)': {
            padding: "0.25rem",
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        h6: {
          fontSize: "1.25rem",
          fontWeight: 700,
          '@media (max-width:600px)': {
            fontSize: "1rem",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          padding: "10px 20px",
          fontSize: "1rem",
          '@media (max-width:600px)': {
            fontSize: "0.9rem",
            padding: "8px 15px",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          padding: "20px",
          margin: "10px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
          '@media (max-width:600px)': {
            padding: "15px",
            margin: "5px",
          },
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          padding: "16px",
          '@media (max-width:600px)': {
            padding: "8px",
          },
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
        },
      },
    },
  },
});

export default healthcareTheme;







