import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    dronePath: [],
    currentPositionIndex: 0,
    isPaused: true,
}

const droneSlice = createSlice({
    name: 'drone',
    initialState,
    reducers: {
        setDronePath: (state, action) => {
            state.dronePath = action.payload;
            state.currentPositionIndex = 0;
        },
        updatePosition: (state) => {
            if (state.currentPositionIndex < state.dronePath.length - 1) {
                state.currentPositionIndex += 1;
            }
        },
        resetSimulation: (state) => {
            state.currentPositionIndex = 0;
            state.isPaused = true;
        },
        togglePause: (state) => {
            state.isPaused = !state.isPaused;
        },
    }
});

export const { setDronePath, updatePosition, resetSimulation, togglePause } = droneSlice.actions;
export default droneSlice.reducer;
