import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAnalytics } from '@/utils/api';

export const loadAnalytics = createAsyncThunk('analytics/load', async () => {
    const data = await fetchAnalytics();
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
