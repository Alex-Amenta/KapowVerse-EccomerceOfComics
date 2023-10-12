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
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const searchComics = createAsyncThunk(
    'comics/searchComics',
    async (nameComic, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(`${URL}?name=${nameComic}`);
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const fetchComicDetail = createAsyncThunk(
    'comics/fetchComicDetail',
    async (comicId, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(`${URL}/${comicId}`);
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const deleteComic = createAsyncThunk(
    'comics/deleteComic',
    async (comicId, { rejectWithValue }) => {
        try {
            await axios.delete(`${URL}/${comicId}`);
            return comicId;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const updateComic = createAsyncThunk(
    'comics/updateComic',
    async ({ id, data }, { rejectWithValue }) => {
        try {
            const { data: updatedComic } = await axios.put(`${URL}/${id}`, data);
            return updatedComic;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

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

        builder.addCase(searchComics.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(searchComics.fulfilled, (state, action) => {
            state.loading = false;
            state.allComics = action.payload;
            state.error = '';
        });
        builder.addCase(searchComics.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
        });

        builder.addCase(fetchComicDetail.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchComicDetail.fulfilled, (state, action) => {
            state.loading = false;
            state.comicDetails = action.payload;
            state.error = '';
        });
        builder.addCase(fetchComicDetail.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
        });

        builder.addCase(updateComic.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(updateComic.fulfilled, (state, action) => {
            state.loading = false;
            // Actualiza el producto en el estado con los datos actualizados
            const updatedComic = action.payload;
            state.comicDetails = updatedComic;
            // También puedes actualizar otros estados si es necesario
            state.allComics = state.allComics.map((comic) =>
                comic.id === updatedComic.id ? updatedComic : comic
            );
            state.error = '';
        });

        builder.addCase(updateComic.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
        });
    },
});

export const { } = comicSlice.actions

export default comicSlice.reducer;