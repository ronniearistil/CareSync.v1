
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from "../../utils/api"; // Namespace import

export const loadAnalytics = createAsyncThunk('analytics/load', async () => {
    const data = await api.fetchAnalytics(); // Use the namespace to access fetchAnalytics
    return data;
});

const analyticsSlice = createSlice({
    name: 'analytics',
    initialState: { data: null, loading: false, error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadAnalytics.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loadAnalytics.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(loadAnalytics.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default analyticsSlice.reducer;
