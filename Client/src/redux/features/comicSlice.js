import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from 'axios';

const URL = 'http://localhost:3001/comic';

const initialState = {
    loading: false,
    allComics: [],
    comicsCopy: [],
    comicDetails: [],
    error: "",
};

export const fetchComics = createAsyncThunk('comics/fetchComics', async (_, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(URL);
        return data.comics;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})

const comicSlice = createSlice({
    name: "comic",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchComics.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchComics.fulfilled, (state, action) => {
            state.loading = false;
            state.allComics = action.payload;
            state.comicsCopy = action.payload;
            state.error = '';
        });
        builder.addCase(fetchComics.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
        });
    },
});

export const { } = comicSlice.actions

export default comicSlice.reducer;