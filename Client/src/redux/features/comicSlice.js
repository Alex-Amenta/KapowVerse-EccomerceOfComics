import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import base_url from "../../utils/development";

const URL = `${base_url}/comic`;

const initialState = {
	loading: false,
	allComics: [],
	comicsCopy: [],
	relatedComics: [],
	error: "",
	search: [],
};

export const fetchComics = createAsyncThunk(
	"comics/fetchComics",
	async (_, { rejectWithValue }) => {
		try {
			const { data } = await axios.get(URL);
			return data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

export const searchComics = createAsyncThunk(
	"comics/searchComics",
	async (nameComic, { rejectWithValue }) => {
		try {
			const { data } = await axios.get(`${URL}?title=${nameComic}`);
			return data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

export const createComic = createAsyncThunk(
	"comics/createComic",
	async (comicData, { rejectWithValue }) => {
		try {
			const { data } = await axios.post(URL, comicData);
			return data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

export const fetchComicDetail = createAsyncThunk(
	"comics/fetchComicDetail",
	async (comicId, { rejectWithValue }) => {
		try {
			const { data } = await axios.get(`${URL}/${comicId}`);
			console.log("fetchComicDetail", data)
			return data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

export const fetchComicsRelated = createAsyncThunk(
	"comics/fetchComicsRelated",
	async (comicId, { rejectWithValue }) => {
		try {
			const { data } = await axios.get(`${URL}/${comicId}/related`);
			return data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

export const toggleComicStatus = createAsyncThunk(
	"comics/toggleComicStatus",
	async (comicId, { rejectWithValue }) => {
		try {
			await axios.put(`${URL}/toggle/${comicId}`);
			return comicId;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

export const updateComic = createAsyncThunk(
	"comics/updateComic",
	async ({ id, data }, { rejectWithValue }) => {
		try {
			const res = await axios.put(`${URL}/${id}`, data);
			console.log(res.data.updatedComic);
			return res.data.updatedComic;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

const comicSlice = createSlice({
	name: "comic",
	initialState,
	reducers: {
		resetFilters: (state) => {
			if (state.search.length > 0) state.allComics = state.search;
			else state.allComics = state.comicsCopy;
		},

		filterAndSort: (state, action) => {
			let comics;
			if (state.search.length > 0) comics = [...state.search];
			else comics = [...state.comicsCopy];
			
			if (action.payload.category !== "") {
				comics = comics.filter((comic) =>
					comic.categories.some(
						(category) => category.name === action.payload.category
					)
				);
			}
			if (action.payload.publisher !== "") {
				comics = comics.filter(
					(comic) => comic.publisher === action.payload.publisher
				);
			}

			if (action.payload.sortBy === "asc") {
				comics.sort((a, b) => a.title.localeCompare(b.title));
			} else if (action.payload.sortBy === "desc") {
				comics.sort((a, b) => b.title.localeCompare(a.title));
			} else if (action.payload.sortBy === "precioMin") {
				comics.sort((a, b) => a.price - b.price);
			} else if (action.payload.sortBy === "precioMax") {
				comics.sort((a, b) => b.price - a.price);
			}
			state.allComics = comics;
		},
		resetSearch: (state) => {
			state.allComics = state.comicsCopy;
			state.search = [];
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchComics.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(fetchComics.fulfilled, (state, action) => {
			state.loading = false;
			state.allComics = action.payload;
			state.comicsCopy = action.payload;
			state.error = "";
		});
		builder.addCase(fetchComics.rejected, (state, action) => {
			state.loading = false;
			state.error =
				(action.payload && action.payload.error) || action.error.message;
		});

		builder.addCase(createComic.fulfilled, (state, action) => {
			state.comicsCopy = [action.payload, ...state.allComics];
		});
		builder.addCase(createComic.rejected, (state, action) => {
			state.error =
				(action.payload && action.payload.error) || action.error.message;
		});

		builder.addCase(searchComics.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(searchComics.fulfilled, (state, action) => {
			state.loading = false;
			state.allComics = action.payload;
			state.search = action.payload;
			state.error = "";
			//can i execute filterAndSort here?

		});
		builder.addCase(searchComics.rejected, (state, action) => {
			state.loading = false;
			state.error =
				(action.payload && action.payload.error) || action.error.message;
		});

		builder.addCase(fetchComicDetail.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(fetchComicDetail.fulfilled, (state, action) => {
			state.loading = false;
			state.error = "";
		});
		builder.addCase(fetchComicDetail.rejected, (state, action) => {
			state.loading = false;
			state.error =
				(action.payload && action.payload.error) || action.error.message;
		});

		builder.addCase(fetchComicsRelated.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(fetchComicsRelated.fulfilled, (state, action) => {
			state.loading = false;
			state.relatedComics = action.payload;
			state.error = "";
		});
		builder.addCase(fetchComicsRelated.rejected, (state, action) => {
			state.loading = false;
			state.error =
				(action.payload && action.payload.error) || action.error.message;
		});

		builder.addCase(updateComic.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(updateComic.fulfilled, (state, action) => {
			state.loading = false;
			const updatedComic = action.payload;
			state.allComics = state.allComics.map((comic) =>
				comic.id === updatedComic.id ? updatedComic : comic
			);
			state.error = "";
		});

		builder.addCase(updateComic.rejected, (state, action) => {
			state.loading = false;
			state.error =
				(action.payload && action.payload.error) || action.error.message;
		});

		builder.addCase(toggleComicStatus.pending, (state) => {
			state.loading = true;
			state.error = "";
		});

		builder.addCase(toggleComicStatus.fulfilled, (state, action) => {
			state.loading = false;
			const comicId = action.payload;
			const comic = state.allComics.find((comic) => comic.id === comicId);

			if (comic) {
				comic.active = !comic.active;
			}
		});

		builder.addCase(toggleComicStatus.rejected, (state, action) => {
			state.loading = false;
			state.error =
				(action.payload && action.payload.error) || action.error.message;
		});
	},
});

export const { resetFilters, filterAndSort, resetSearch, resetDetails } =
	comicSlice.actions;

export default comicSlice.reducer;
