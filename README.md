# Forex Scraper Frontend

A React-based frontend application for visualizing foreign exchange rate history data. Built with Material-UI (MUI) and featuring interactive charts for tracking currency exchange rates.

## Live Deployment Link
[Live Forex Scraper Frontend](https://forex-scraper-frontend.onrender.com/)

## Features

- Interactive line charts for forex rate visualization
- Dark theme optimized for financial data display
- Real-time currency pair selection
- Multiple time period options (1M, 3M, 6M)
- Responsive design for all screen sizes
- Automatic data refresh
- High/Low and Open/Close rate comparisons

## Prerequisites

- Node.js 16+ 
- npm or yarn
- Access to the Forex Scraper API backend

## Installation

1. Clone the repository:
```bash
git clone https://github.com/D-z-V/forex-scraper-frontend.git
cd forex-scraper-frontend
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory:
```env
VITE_FOREX_API_URL=http://localhost:8000
```

## Project Structure

```
forex-history-frontend/
├── src/
│   ├── App.jsx
│   ├── ForexLineChart.jsx
│   ├── theme.js
│   ├── main.jsx
│   └── assets/
├── public/
├── index.html
├── package.json
├── vite.config.js
└── README.md
```


## Running the Application

1. Start the development server:
```bash
npm run dev
# or
yarn dev
```

2. Access the application at:
```
http://localhost:5173
```

## Components

### ForexLineChart

The main component that handles forex data visualization.

Features:
- Currency pair selection dropdowns
- Time period selector
- Two interactive line charts:
  - High/Low rates chart with area fills
  - Open/Close rates chart
- Automatic data fetching on selection changes
- Responsive layout
- Dark theme optimization

Usage:
```jsx
import ForexLineChart from './ForexLineChart';

function App() {
  return (
    <div>
      <ForexLineChart />
    </div>
  );
}
```

## Theme Customization

The application uses a custom dark theme optimized for financial data visualization. Modify `theme.js` to customize the appearance:

```javascript
// src/theme.js
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#4caf50',
      // ... other color values
    },
    // ... other palette options
  },
  // ... other theme options
});
```

## API Integration

The frontend communicates with the Forex History API through these endpoints:

1. Get Supported Currencies:
```javascript
GET ${VITE_FOREX_API_URL}/api/supported-currencies
```

2. Get Forex Data:
```javascript
POST ${VITE_FOREX_API_URL}/api/forex-data
Parameters: {
  from_currency: string,
  to_currency: string,
  period: string
}
```

## Production Deployment

1. Build the application:
```bash
npm run build
# or
yarn build
```

2. Configure environment variables for production:
```env
VITE_FOREX_API_URL=https://your-api-domain.com
```

3. Deploy the `dist` folder to your hosting service.
