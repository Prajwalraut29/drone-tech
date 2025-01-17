import { configureStore } from '@reduxjs/toolkit'
import droneSlice from './droneSlice'
const store = configureStore({
    reducer: {
        drone: droneSlice,
    }
})

export default store