import React, { useState, useEffect } from 'react';
import { LineChart } from '@mui/x-charts';
import { Box, FormControl, InputLabel, Select, MenuItem, Button, Grid, useTheme, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledFormControl = styled(FormControl)(({ theme }) => ({
    minWidth: 200,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    '& .MuiOutlinedInput-root': {
      color: theme.palette.grey[100],
      '& fieldset': {
        borderColor: theme.palette.grey[700],
      },
      '&:hover fieldset': {
        borderColor: theme.palette.grey[500],
      },
    },
    '& .MuiInputLabel-root': {
      color: theme.palette.grey[300],
    },
  }));
  
const StyledButton = styled(Button)(({ theme }) => ({
backgroundColor: theme.palette.success.main,
color: theme.palette.common.white,
'&:hover': {
    backgroundColor: theme.palette.primary.dark,
},
}));

const ForexLineChart = () => {
    const theme = useTheme();
    const [data, setData] = useState([]);
    const [period, setPeriod] = useState('1M');
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('INR');
    const [currencies, setCurrencies] = useState([]);
  
    const API_URL = import.meta.env.VITE_FOREX_API_URL;
  
    // Fetch supported currencies on component mount
    useEffect(() => {
      const fetchCurrencies = async () => {
        try {
          const response = await fetch(`${API_URL}/api/supported-currencies`);
          if (response.ok) {
            const data = await response.json();
            setCurrencies(data); // Store currency list in state
          } else {
            console.error('Error fetching currencies');
          }
        } catch (error) {
          console.error('Error fetching supported currencies:', error);
        }
      };
      fetchCurrencies();
    }, []);
  
    useEffect(() => {
      if (fromCurrency && toCurrency && fromCurrency !== toCurrency) {
        fetchForexData();
      }
    }, [fromCurrency, toCurrency, period]);
  
    const fetchForexData = async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/forex-data?from_currency=${fromCurrency}&to_currency=${toCurrency}&period=${period}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          data.forEach((d) => {
            d.date = new Date(d.date);
          });
          setData(data);
        }
      } catch (error) {
        setData([]);
        console.error('Error fetching forex data:', error);
      }
    };
  
    // Get available currencies for "To Currency" dropdown excluding the selected "From Currency"
    const getAvailableToCurrencies = () => {
      return Object.entries(currencies).filter(([code]) => code !== fromCurrency);
    };
  
    // Get available currencies for "From Currency" dropdown excluding the selected "To Currency"
    const getAvailableFromCurrencies = () => {
      return Object.entries(currencies).filter(([code]) => code !== toCurrency);
    };

    
  const chartTheme = {
    background: {
      color: theme.palette.background.default,
    },
    text: {
      fill: theme.palette.grey[300],
    },
    grid: {
      stroke: theme.palette.grey[800],
      strokeWidth: 1,
    },
    axis: {
      tick: {
        stroke: theme.palette.grey[600],
      },
      label: {
        fontSize: 19,
        margin: 20,
        fontStyle: 'italic',
      },
    },
  };

  return (
    <Box sx={{
      padding: '24px',
      backgroundColor: theme.palette.background.default,
      borderRadius: theme.shape.borderRadius,
    }}>
      <Typography variant="h4" align="center" sx={{ mb: 3, color: theme.palette.grey[300] }}>
        Exchange Rates History Tracker
      </Typography>
      <Box sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 2,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Box>
          <StyledFormControl>
            <InputLabel id="from_company">From Currency</InputLabel>
            <Select
              labelId="from_company"
              label="From Currency"
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              MenuProps={{
                PaperProps: {
                  sx: {
                    bgcolor: theme.palette.background.paper,
                    color: theme.palette.grey[100],
                  },
                },
              }}
            >
              {getAvailableFromCurrencies().map(([code, name]) => (
                <MenuItem key={code} value={code}>{`${name} [${code}]`}</MenuItem>
              ))}
            </Select>
          </StyledFormControl>
        </Box>
        <Box>
          <StyledFormControl>
            <InputLabel id="to_currency">To Currency</InputLabel>
            <Select
              labelId="to_currency"
              label="To Currency"
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              MenuProps={{
                PaperProps: {
                  sx: {
                    bgcolor: theme.palette.background.paper,
                    color: theme.palette.grey[100],
                  },
                },
              }}
            >
              {getAvailableToCurrencies().map(([code, name]) => (
                <MenuItem key={code} value={code}>{`${name} [${code}]`}</MenuItem>
              ))}
            </Select>
          </StyledFormControl>
        </Box>
        <Box>
          <StyledFormControl>
            <InputLabel id="period">Period</InputLabel>
            <Select
                labelId="period"
                label="Period"
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              MenuProps={{
                PaperProps: {
                  sx: {
                    bgcolor: theme.palette.background.paper,
                    color: theme.palette.grey[100],
                  },
                },
              }}
            >
              <MenuItem value="1M">1 Month</MenuItem>
              <MenuItem value="3M">3 Months</MenuItem>
              <MenuItem value="6M">6 Months</MenuItem>
            </Select>
          </StyledFormControl>
        </Box>
        {/* <Box>
          <StyledButton
            variant="contained"
            onClick={fetchForexData}
          >
            Fetch Data
          </StyledButton>
        </Box> */}
      </Box>
      <Box sx={{
        height: 500,
        bgcolor: theme.palette.background.default,
        borderRadius: theme.shape.borderRadius,
        p: 2,
      }}>

        <LineChart
          xAxis={[{
            label: 'Date',
            labelStyle: chartTheme.axis.label,
            dataKey: 'date',
            scaleType: 'time',
            tickLabelStyle: chartTheme.text,
            stroke: chartTheme.axis.tick.stroke,
          }]}
          yAxis={[{
            labelStyle: chartTheme.axis.label,
            tickLabelStyle: chartTheme.text,
            stroke: chartTheme.axis.tick.stroke,
          }]}
          series={[{
            dataKey: 'high_rate',
            label: 'High Rate',
            color: theme.palette.primary.main,
            showMark: true,
            area: { fill: theme.palette.primary.light, opacity: 0.2 },
            baseline: 'min'
          },
          {
            dataKey: 'low_rate',
            label: 'Low Rate',
            color: theme.palette.secondary.main,
            showMark: true,
            area: { fill: theme.palette.secondary.light, opacity: 0.2 },
            baseline: 'min'
          }]}
          
          title="High and Low Exchange Rates"
          legend={{ position: 'top' }}  // Positioning the legend at the top
          sx={{
            '.MuiLineElement-root': {
              strokeWidth: 2,
            },
            '.MuiMarkElement-root': {
              strokeWidth: 2,
              r: 4,
            },
            my: { sm: 0, md: 2 },
          }}
          height={500}
          margin={{ left: 70, right: 30, top: 30, bottom: 70 }}
          grid={{ vertical: true, horizontal: true, stroke: chartTheme.grid.stroke }}
          dataset={data}
          bgcolor={chartTheme.background.color}
        />

        <br />

        <LineChart
          xAxis={[{
            label: 'Date',
            labelStyle: chartTheme.axis.label,
            dataKey: 'date',
            scaleType: 'time',
            tickLabelStyle: chartTheme.text,
            stroke: chartTheme.axis.tick.stroke,
          }]}
          yAxis={[{
            labelStyle: chartTheme.axis.label,
            tickLabelStyle: chartTheme.text,
            stroke: chartTheme.axis.tick.stroke,
          }]}
          series={[{
            dataKey: 'open_rate',
            label: 'Open Rate',
            color: theme.palette.primary.main,
            showMark: true,
          },
          {
            dataKey: 'close_rate',
            label: 'Close Rate',
            color: theme.palette.secondary.main,
            showMark: true,
          }]}
          title="Open and Close Exchange Rates"
          legend={{ position: 'top' }}  
          sx={{
            '.MuiLineElement-root': {
              strokeWidth: 2,
            },
            '.MuiMarkElement-root': {
              strokeWidth: 2,
              r: 4,
            },
            my: { sm: 0, md: 2 },
          }}
          height={500}
          margin={{ left: 70, right: 30, top: 30, bottom: 70 }}
          grid={{ vertical: true, horizontal: true, stroke: chartTheme.grid.stroke }}
          dataset={data}
          bgcolor={chartTheme.background.color}
        />

        <br />
        
      </Box>

    </Box>
  );
};

export default ForexLineChart;
