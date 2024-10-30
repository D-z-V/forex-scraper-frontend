// src/theme.js
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#06B6D4', // Tailwind cyan-500
    },
    secondary: {
      main: '#3B82F6', // Tailwind blue-500
    },
    background: {
      default: '#111827', // Tailwind gray-900
      paper: '#1F2937',   // Tailwind gray-800
    },
  },
  typography: {
    fontFamily: [
      'Inter',
      'system-ui',
      '-apple-system',
      'sans-serif',
    ].join(','),
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
  },
});