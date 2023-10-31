import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import base_url from "../../utils/development";

const URL = `${base_url}/favorites`;

const initialState = {
	loading: false,
	favorites: [],
	filteredFavorites: [],
	error: "",
};

export const fetchFavoritesByUser = createAsyncThunk(
	"favorites/fetchFavoritesByUser",
	async (userId, { rejectWithValue }) => {
		try {
			const { data } = await axios.get(`${URL}/${userId}`);
			return data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

export const createFavorites = createAsyncThunk(
	"favorites/createFavorites",
	async ({ userId, comicId }, { rejectWithValue }) => {
		try {
			const { data } = await axios.post(URL, { userId: userId, comicId: comicId });
			return data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

export const deleteFavorite = createAsyncThunk(
	"favorites/deleteFavorite",
	async ({ userId, comicId }, { rejectWithValue }) => {
		try {
			await axios.delete(URL, {data:{ userId: userId, comicId: comicId }});
			return {id:comicId};
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

const favoriteSlice = createSlice({
	name: "favorite",
	initialState,
	reducers: {
		favoriteSort: (state, action) => {
			if (!action.payload) {
				state.filteredFavorites = state.favorites;
				return;
			}
			let favs = [...state.favorites];
			if (action.payload.category !== '') {
				favs = favs.filter((comic) => comic.category === action.payload.category);
			}
			if (action.payload.publisher !== '') {
				favs = favs.filter((comic) => comic.publisher === action.payload.publisher);
			}

			if (action.payload.sortBy === 'asc') {
				favs.sort((a, b) => a.title.localeCompare(b.title));
			} else if (action.payload.sortBy === 'desc') {
				favs.sort((a, b) => b.title.localeCompare(a.title));
			} else if (action.payload.sortBy === 'precioMin') {
				favs.sort((a, b) => a.price - b.price);
			} else if (action.payload.sortBy === 'precioMax') {
				favs.sort((a, b) => b.price - a.price);
			}
			state.filteredFavorites = favs;
		},
		resetFilters: (state, action) => {
			state.filteredFavorites = state.favorites;
		},
		favoriteCategory: (state, action) => {
			const { favorites } = state;
			const filteredFavorites = favorites.filter(
				(fav) => fav.category === action.payload
			);
			state.filteredFavorites = filteredFavorites;
		},
		favoritePublisher: (state, action) => {
			const { favorites } = state;
			const filteredFavorites = favorites.filter(
				(fav) => fav.publisher === action.payload
			);
			state.filteredFavorites = filteredFavorites;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchFavoritesByUser.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(fetchFavoritesByUser.fulfilled, (state, action) => {
			state.loading = false;
			state.favorites = action.payload;
			state.error = "";
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
			// state.favorites = [...state.favorites, action.payload];
			state.error = "";
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
			state.filteredFavorites = state.filteredFavorites.filter(
				(fav) => fav.id !== action.payload.id
			);
			state.error = "";
		});
		builder.addCase(deleteFavorite.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.error;
		});
	},
});

export const {
	favoriteSort,
	resetFilters,
	favoriteCategory,
	favoritePublisher,
} = favoriteSlice.actions;

export default favoriteSlice.reducer;
