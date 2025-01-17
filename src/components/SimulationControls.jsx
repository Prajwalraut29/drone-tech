import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDronePath, togglePause, resetSimulation } from '../redux/droneSlice';
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Custom marker icon
const droneIcon = new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/2658/2658325.png',
    iconSize: [30, 30],
    iconAnchor: [15, 30],
});

const SimulationControls = () => {
    const dispatch = useDispatch();
    const { isPaused, dronePath } = useSelector((state) => state.drone);
    const [paths, setPaths] = useState([{ latitude: '', longitude: '', timestamp: '' }]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [simulationInterval, setSimulationInterval] = useState(null);

    const defaultPath = [
        { latitude: 18.5204, longitude: 73.8567, timestamp: 1609459200 }, // Pune
        { latitude: 18.5210, longitude: 73.8570, timestamp: 1609459260 },
    ];

    useEffect(() => {
        if (simulationInterval) clearInterval(simulationInterval);

        if (!isPaused && dronePath.length > 0 && currentIndex < dronePath.length) {
            const interval = setInterval(() => {
                setCurrentIndex((prevIndex) => {
                    if (prevIndex < dronePath.length - 1) {
                        return prevIndex + 1;
                    } else {
                        clearInterval(interval);
                        return prevIndex;
                    }
                });
            }, 1000);
            setSimulationInterval(interval);
        }

        return () => clearInterval(simulationInterval);
    }, [isPaused, dronePath, currentIndex]);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return alert('Please select a file to upload.');

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                const isValid = data.every((point) =>
                    ['latitude', 'longitude', 'timestamp'].every((key) => typeof point[key] === 'number')
                );
                if (isValid) {
                    dispatch(setDronePath(data));
                    setPaths(data);
                } else {
                    alert('Invalid file format.');
                }
            } catch {
                alert('Error reading file.');
            }
        };
        reader.readAsText(file);
    };

    const handleSimulationControl = () => dispatch(togglePause());
    const handleReset = () => {
        dispatch(resetSimulation());
        setCurrentIndex(0);
        clearInterval(simulationInterval);
        setSimulationInterval(null);
        setPaths([{ latitude: '', longitude: '', timestamp: '' }]);
        dispatch(setDronePath(defaultPath));
    };

    const handleAddPath = (index) => {
        const { latitude, longitude, timestamp } = paths[index];
        const parsedLatitude = parseFloat(latitude);
        const parsedLongitude = parseFloat(longitude);
        const parsedTimestamp = parseInt(timestamp, 10);

        if (isNaN(parsedLatitude) || isNaN(parsedLongitude) || isNaN(parsedTimestamp)) {
            return alert('Enter valid Latitude, Longitude, and Timestamp.');
        }

        const newPoint = { latitude: parsedLatitude, longitude: parsedLongitude, timestamp: parsedTimestamp };
        dispatch(setDronePath([...dronePath, newPoint]));
    };

    const handlePathChange = (index, field, value) => {
        const updatedPaths = [...paths];
        updatedPaths[index][field] = value;
        setPaths(updatedPaths);
    };

    const handleAddNewPathInput = () => {
        setPaths([...paths, { latitude: '', longitude: '', timestamp: '' }]);
    };

    const handleRemovePath = (index) => {
        const updatedPaths = paths.filter((_, i) => i !== index);
        setPaths(updatedPaths);
    };

    const handleSeekChange = (e) => {
        setCurrentIndex(Number(e.target.value));
    };

    return (
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg w-full">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">Drone Simulation</h3>
            <div className="space-y-4">
                {/* File Upload */}
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">Upload Path File</label>
                    <input
                        type="file"
                        accept=".json"
                        onChange={handleFileUpload}
                        className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300"
                    />
                </div>

                {/* Dynamic Path Input */}
                {paths.map((path, index) => (
                    <div key={index} className="flex items-center space-x-4">
                        <input
                            type="text"
                            placeholder="Latitude"
                            value={path.latitude}
                            onChange={(e) => handlePathChange(index, 'latitude', e.target.value)}
                            className="w-1/3 text-sm text-gray-700 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300"
                        />
                        <input
                            type="text"
                            placeholder="Longitude"
                            value={path.longitude}
                            onChange={(e) => handlePathChange(index, 'longitude', e.target.value)}
                            className="w-1/3 text-sm text-gray-700 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300"
                        />
                        <input
                            type="text"
                            placeholder="Timestamp"
                            value={path.timestamp}
                            onChange={(e) => handlePathChange(index, 'timestamp', e.target.value)}
                            className="w-1/3 text-sm text-gray-700 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300"
                        />
                        <button
                            onClick={() => handleAddPath(index)}
                            className="bg-blue-500 text-white py-1 px-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
                        >
                            Add
                        </button>
                        <button
                            onClick={() => handleRemovePath(index)}
                            className="bg-red-500 text-white py-1 px-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300"
                        >
                            Remove
                        </button>
                    </div>
                ))}

                {/* Add New Path Input */}
                <button
                    onClick={handleAddNewPathInput}
                    className="mt-4 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-300"
                >
                    Add New Path Input
                </button>

                {/* Controls */}
                <div className="space-y-2">
                    <button
                        onClick={handleSimulationControl}
                        className={`w-full py-2 px-4 rounded-lg focus:outline-none focus:ring ${isPaused
                            ? 'bg-green-500 hover:bg-green-600 text-white focus:ring-green-300'
                            : 'bg-yellow-500 hover:bg-yellow-600 text-white focus:ring-yellow-300'
                            }`}
                    >
                        {isPaused ? 'Resume Simulation' : 'Pause Simulation'}
                    </button>
                    <button
                        onClick={handleReset}
                        className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300"
                    >
                        Reset
                    </button>
                </div>

                {/* Simulation Progress Bar */}
                <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                        Simulation Progress
                    </label>
                    {dronePath.length > 1 ? (
                        <>
                            <input
                                type="range"
                                min="0"
                                max={dronePath.length - 1}
                                value={currentIndex}
                                onChange={handleSeekChange}
                                className="w-full h-2 bg-gray-400 rounded-full"
                            />
                            <p className="mt-2 text-sm text-center">
                                Position: {currentIndex} / {dronePath.length - 1}
                            </p>
                        </>
                    ) : (
                        <p className="mt-2 text-sm text-center text-gray-500">
                            No path data available.
                        </p>
                    )}
                </div>

            </div>
        </div>
    );
};

export default SimulationControls;
