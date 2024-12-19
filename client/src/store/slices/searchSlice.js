import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { searchGlobal } from "../../utils/searchApi"; // Import your search API

// Async thunk for global search
export const fetchSearchResults = createAsyncThunk(
    'search/fetchResults',
    async (query, { rejectWithValue }) => {
        try {
            const response = await searchGlobal(query); // API call
            return response.results || [];
        } catch (error) {
            return rejectWithValue("Failed to fetch search results.");
        }
    }
);

const searchSlice = createSlice({
    name: 'search',
    initialState: {
        query: "",
        results: [],
        loading: false,
        error: null,
    },
    reducers: {
        setQuery: (state, action) => {
            state.query = action.payload;
        },
        clearSearch: (state) => {
            state.query = "";
            state.results = [];
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSearchResults.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSearchResults.fulfilled, (state, action) => {
                state.loading = false;
                state.results = action.payload;
            })
            .addCase(fetchSearchResults.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { setQuery, clearSearch } = searchSlice.actions;
export default searchSlice.reducer;
