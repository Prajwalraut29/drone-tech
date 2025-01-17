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

3. For Google Maps, create a `.env` file in the root directory and add your Google Maps API key:
```
REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
```

4. Start the development server:
```bash
npm start
```

## Required Dependencies

```json
{
  "dependencies": {
    "@react-google-maps/api": "^2.20.5",
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
     - Click "Upload File" to select a CSV or JSON file
     - File format should follow the template provided below

3. **Simulation Controls**
   - Click "Simulate" to start the drone path animation
   - Use Play/Pause button to control simulation
   - Drag the seek bar to jump to specific points in time
   - Reset button returns drone to starting position

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
    
    "latitude": 37.7749,
    "longitude": -122.4194,
    "timestamp": "2024-01-17T10:00:00"
  },
  {
    "timestamp": "2024-01-17T10:01:00",
    "latitude": 37.7750,
    "longitude": -122.4195
  }
]
```


## License

This project is licensed under the MIT License - see the LICENSE.md file for details.
