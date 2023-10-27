import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import base_url from "../../utils/development";

const URL = `${base_url}/favorites`;

const initialState = {
    loading: false,
    favorites: [],
    filteredFavorites: [],
    error: '',
};

export const fetchFavoritesByUser = createAsyncThunk(
    'favorites/fetchFavoritesByUser', async (userId, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(`${URL}/${userId}`);
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
);

export const createFavorites = createAsyncThunk(
    'favorites/createFavorites', async ({ userId, comicId }, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(URL, { userId, comicId });
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
);

export const deleteFavorite = createAsyncThunk(
    'favorites/deleteFavorite', async (favoriteId, { rejectWithValue }) => {
        try {
            const { data } = await axios.delete(`${URL}/${favoriteId}`);
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

const favoriteSlice = createSlice({
    name: 'favorite',
    initialState,
    reducers: {
        favoriteSort: (state, action) => {
            const { filteredFavorites } = state;
            const sortOrder = action.payload;

            const listToSort = filteredFavorites.length ? 'filteredFavorites' : 'favorites';

            if (sortOrder === 'asc') {
                state[listToSort].sort((a, b) => a.Comic.name.localeCompare(b.Comic.name));
            } else if (sortOrder === 'desc') {
                state[listToSort].sort((a, b) => b.Comic.name.localeCompare(a.Comic.name));
            } else if (sortOrder === 'precioMin') {
                state[listToSort].sort((a, b) => a.Comic.price - b.Comic.price);
            } else if (sortOrder === 'precioMax') {
                state[listToSort].sort((a, b) => b.Comic.price - a.Comic.price);
            }
        },
        resetFilters: (state, action) => {
            state.filteredFavorites = state.favorites;
        },
        favoriteType: (state, action) => {
            const { favorites } = state;
            const filteredFavorites = favorites.filter(fav => fav.Comic.category === action.payload);
            state.filteredFavorites = filteredFavorites;
        },
        favoritePublisher: (state, action) => {
            const { favorites } = state;
            const filteredFavorites = favorites.filter(fav => fav.Comic.publisher === action.payload);
            state.filteredFavorites = filteredFavorites;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchFavoritesByUser.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchFavoritesByUser.fulfilled, (state, action) => {
            state.loading = false;
            state.favorites = action.payload;
            state.error = '';
        });
        builder.addCase(fetchFavoritesByUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
        });

        builder.addCase(createFavorites.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(createFavorites.fulfilled, (state, action) => {
            state.loading = false;
            state.favorites.push(action.payload);
            state.error = '';
        });
        builder.addCase(createFavorites.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
        });

        builder.addCase(deleteFavorite.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(deleteFavorite.fulfilled, (state, action) => {
            state.loading = false;
            const favoriteToDeleteId = action.meta.arg;
            state.favorites = state.favorites.filter(favorite => favorite.id !== favoriteToDeleteId);
            state.error = '';
        });
        builder.addCase(deleteFavorite.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
        });
    }
});

export const { favoriteSort, resetFilters, favoriteType, favoritePublisher } = favoriteSlice.actions;

export default favoriteSlice.reducer