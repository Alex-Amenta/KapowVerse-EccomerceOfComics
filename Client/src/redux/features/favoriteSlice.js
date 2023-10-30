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
			const { data } = await axios.delete(URL, {data:{ userId: userId, comicId: comicId }});
			return data;
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
			const { filteredFavorites } = state;
			const sortOrder = action.payload;

			const listToSort = filteredFavorites.length
				? "filteredFavorites"
				: "favorites";

			if (sortOrder === "asc") {
				state[listToSort].sort((a, b) =>
					a.comic.title.localeCompare(b.comic.title)
				);
			} else if (sortOrder === "desc") {
				state[listToSort].sort((a, b) =>
					b.comic.title.localeCompare(a.comic.title)
				);
			} else if (sortOrder === "precioMin") {
				state[listToSort].sort((a, b) => a.comic.price - b.comic.price);
			} else if (sortOrder === "precioMax") {
				state[listToSort].sort((a, b) => b.comic.price - a.comic.price);
			}
		},
		resetFilters: (state, action) => {
			state.filteredFavorites = state.favorites;
		},
		favoriteCategory: (state, action) => {
			const { favorites } = state;
			const filteredFavorites = favorites.filter(
				(fav) => fav.comic.category === action.payload
			);
			state.filteredFavorites = filteredFavorites;
		},
		favoritePublisher: (state, action) => {
			const { favorites } = state;
			const filteredFavorites = favorites.filter(
				(fav) => fav.comic.publisher === action.payload
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
