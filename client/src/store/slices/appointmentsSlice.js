import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAppointments } from '@/utils/api';

export const loadAppointments = createAsyncThunk(
    'appointments/load',
    async (_, thunkAPI) => {
        try {
            const data = await fetchAppointments();
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

const appointmentsSlice = createSlice({
    name: 'appointments',
    initialState: {
        data: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadAppointments.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loadAppointments.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(loadAppointments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default appointmentsSlice.reducer;


