# Drone Path Simulation Web Application - Frontend FlytBase Assignment

A React-based web application that simulates drone paths on an interactive map using time series data.

## Features

- Interactive world map display using Leaflet
- Real-time drone position simulation based on time series data
- Multiple input methods for coordinates:
  - Manual input of latitude/longitude pairs with timestamps
  - File upload support for time series data (JSON)
- Path visualization with progress tracking
- Playback controls:
  - Play/Pause simulation
  - Seek functionality to jump to specific timestamps
- Dynamic path drawing as the drone moves

## Prerequisites

```bash
Node.js >= 14.0.0
npm >= 6.14.0
```

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/drone-path-simulation.git
cd drone-path-simulation
```

2. Install dependencies:
```bash
npm install
```

4. Start the development server:
```bash
npm run dev
```

## Required Dependencies

```json
{
  "dependencies": {
    "@reduxjs/toolkit": "^2.5.0",
    "leaflet": "^1.9.4",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-leaflet": "^4.2.1",
    "react-redux": "^9.2.0"
  }
}
```

## Usage

1. **Map Configuration**
   - used react leaflet map
   - For Leaflet:proper attribution is maintained

2. **Data Input**
   - Manual Input:
     - Enter latitude, longitude, and timestamp in the provided form
     - Click "Add Point" to include it in the path
   - File Upload:
     - Click "Upload File" to select a JSON file
     - File format should follow the template provided below

3. **Simulation Controls**
   - Click "Simulate" to start the drone path animation
   - Use Play/Pause button to control simulation
   - Drag the seek bar to jump to specific points in time
   - Reset button remove the whole data

## State Management

The application uses Redux Toolkit for state management:
- Drone position and path data
- Simulation status and controls
- Time series data management
- Map provider preferences

## Data Format

### JSON Template
```json
[
  {
    "latitude": 21.1458,
    "longitude": 79.0882,
    "timestamp": 1672531200
  },
  {
    "latitude": 18.5204,
    "longitude": 73.8567,
    "timestamp": 1672534800
  },
  {
    "latitude": 17.3850,
    "longitude": 78.4867,
    "timestamp": 1672538400
  },
  {
    "latitude": 19.0760,
    "longitude": 72.8777,
    "timestamp": 1672542000
  },
  {
    "latitude": 12.9716,
    "longitude": 77.5946,
    "timestamp": 1672545600
  }
]
```


## License

This project is licensed under the MIT License - see the LICENSE.md file for details.
