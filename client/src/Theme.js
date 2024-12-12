// src/theme.js (or src/styles/theme.js)

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976D2', // Blue
    },
    secondary: {
      main: '#388E3C', // Green
    },
    error: {
      main: '#FF9800', // Orange (for alerts or errors)
    },
    background: {
      default: '#F5F5F5', // Light Gray
    },
    text: {
      primary: '#212121', // Dark Gray
    },
  },
  // You can add more theme options here if needed (typography, overrides, etc.)
});

export default theme;