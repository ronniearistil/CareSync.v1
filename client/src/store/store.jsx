import { configureStore } from '@reduxjs/toolkit';
import analyticsReducer from './slices/analyticsSlice';
import appointmentsReducer from './slices/appointmentsSlice';
import searchReducer from './slices/searchSlice'; // Import searchSlice reducer

export const store = configureStore({
    reducer: {
        analytics: analyticsReducer,
        appointments: appointmentsReducer,
        search: searchReducer, // Add the search reducer
    },
});

export default store;

