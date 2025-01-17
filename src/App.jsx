import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updatePosition } from './redux/droneSlice'
import MapView from './components/MapView'
import SimulationControls from './components/SimulationControls';
function App() {
  const dispatch = useDispatch();
  const { isPaused } = useSelector((state) => state.drone);
  useEffect(() => {
    let interval = null;
    if (!isPaused) {
      interval = setInterval(() => {
        dispatch(updatePosition());
      }, 1000);
    } else if (interval) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isPaused, dispatch]);

  return (
    <>
      <div className="h-screen flex flex-col md:flex-row bg-gray-50">
        {/* Left Section: Simulation Controls */}
        <div className="w-full md:w-1/4 h-full bg-gray-200 p-4 overflow-auto">
          <SimulationControls />
        </div>

        {/* Right Section: Map View */}
        <div className="flex-grow h-full bg-gray-100 p-4">
          <MapView />
        </div>
      </div>

    </>
  )
}

export default App
