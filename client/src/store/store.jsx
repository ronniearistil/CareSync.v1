import { configureStore } from '@reduxjs/toolkit';
import analyticsReducer from './slices/analyticsSlice';
import appointmentsReducer from './slices/appointmentsSlice';

export const store = configureStore({
    reducer: {
        analytics: analyticsReducer,
        appointments: appointmentsReducer,
    },
});

export default store;
