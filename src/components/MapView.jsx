import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Define custom icon
const customIcon = L.divIcon({
    className: 'custom-marker',
    html: `
    <div style="
      width: 24px;
      height: 24px;
      background-color: #3b82f6;
      border: 2px solid white;
      border-radius: 50%;
      box-shadow: 0 2px 4px rgba(0,0,0,0.3);
      display: flex;
      align-items: center;
      justify-content: center;
    ">
      <div style="
        width: 8px;
        height: 8px;
        background-color: white;
        border-radius: 50%;
      "></div>
    </div>
  `,
    iconSize: [24, 24],
    iconAnchor: [12, 12]
});

const MapView = () => {
    const { dronePath, isPaused } = useSelector((state) => state.drone);
    const [currentPosition, setCurrentPosition] = useState([18.5204, 73.8567]); // Default to Pune
    const [pathProgress, setPathProgress] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [zoomLevel, setZoomLevel] = useState(12);
    const mapRef = useRef();
    const animationRef = useRef(null);

    useEffect(() => {
        const pathCoordinates = dronePath.length === 0
            ? [[18.5204, 73.8567]]
            : dronePath.map((point) => [point.latitude, point.longitude]);

        setPathProgress(pathCoordinates);

        const map = mapRef.current?.leafletElement;
        if (map && pathCoordinates.length > 0) {
            const bounds = L.latLngBounds(pathCoordinates);
            map.fitBounds(bounds, { padding: [50, 50] });

            const distance = map.distance(bounds.getSouthWest(), bounds.getNorthEast());
            if (distance > 1000000) setZoomLevel(3);
            else if (distance > 500000) setZoomLevel(5);
            else setZoomLevel(12);
        }

        if (!isPaused && pathCoordinates.length > 1) {
            if (animationRef.current) clearInterval(animationRef.current);

            let stepIndex = 0;
            const moveDrone = () => {
                if (currentIndex < pathCoordinates.length - 1) {
                    const [startLat, startLng] = pathCoordinates[currentIndex];
                    const [endLat, endLng] = pathCoordinates[currentIndex + 1];

                    const steps = 50;
                    const latStep = (endLat - startLat) / steps;
                    const lngStep = (endLng - startLng) / steps;

                    animationRef.current = setInterval(() => {
                        if (stepIndex < steps) {
                            const newLat = startLat + latStep * stepIndex;
                            const newLng = startLng + lngStep * stepIndex;
                            setCurrentPosition([newLat, newLng]);
                            stepIndex++;
                        } else {
                            clearInterval(animationRef.current);
                            setCurrentIndex((prevIndex) => prevIndex + 1);
                        }
                    }, 20);
                }
            };

            moveDrone();
        }

        return () => {
            clearInterval(animationRef.current);
        };
    }, [dronePath, currentIndex, isPaused]);

    return (
        <div className="h-full bg-white shadow-md rounded-lg overflow-hidden">
            <MapContainer
                center={currentPosition}
                zoom={zoomLevel}
                style={{ height: '100%', width: '100%' }}
                className="h-full w-full"
                whenCreated={(mapInstance) => (mapRef.current = mapInstance)}
            >
                <TileLayer
                    url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {pathProgress.length > 0 && (
                    <>
                        <Polyline
                            positions={pathProgress}
                            color="#3b82f6"
                            weight={4}
                            opacity={0.8}
                        />
                        <Marker
                            position={currentPosition}
                            icon={customIcon}
                        />
                    </>
                )}
            </MapContainer>
        </div>
    );
};

export default MapView;