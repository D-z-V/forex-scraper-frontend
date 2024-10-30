// src/App.jsx
import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from './theme';
import ForexLineChart from './ForexLineChart';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div id="root" className="min-h-screen bg-gray-900">
        <ForexLineChart />
      </div>
    </ThemeProvider>
  );
}

export default App;