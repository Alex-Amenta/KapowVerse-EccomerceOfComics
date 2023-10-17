import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import base_url from "../../utils/development";

const URL = `${base_url}/comic`;

const initialState = {
  loading: false,
  allComics: [],
  comicsCopy: [],
  comicDetails: [],
  error: "",
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
    'comics/searchComics',
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
  'comics/createComic',
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
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteComic = createAsyncThunk(
  "comics/deleteComic",
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
  "comics/updateComic",
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
    reducers: {
      resetFilters: (state) => {
        state.allComics = state.comicsCopy;
      },

      filterAndSort: (state, action) => {
        let comics = [...state.comicsCopy];
        if (action.payload.category !== '') {
          comics = comics.filter((comic) => comic.category === action.payload.category);
        }
        if (action.payload.publisher !== '') {
          comics = comics.filter((comic) => comic.publisher === action.payload.publisher);
        }

        if (action.payload.sortBy === 'asc') {
          comics.sort((a, b) => a.title.localeCompare(b.title));
        } else if (action.payload.sortBy === 'desc') {
          comics.sort((a, b) => b.title.localeCompare(a.title));
        } else if (action.payload.sortBy === 'precioMin') {
          comics.sort((a, b) => a.price - b.price);
        } else if (action.payload.sortBy === 'precioMax') {
          comics.sort((a, b) => b.price - a.price);
        }
        state.allComics = comics;
      },
      resetSearch: (state) => {
        state.allComics = state.comicsCopy;
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
            state.error = '';
        });
        builder.addCase(fetchComics.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
        });

        builder.addCase(createComic.fulfilled, (state, action) => {
          state.allComics = [action.payload, ...state.allComics]; // Agrega el nuevo cómic al principio de la lista
        });

    builder.addCase(searchComics.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(searchComics.fulfilled, (state, action) => {
      state.loading = false;
      state.allComics = action.payload;
      state.error = "";
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
      state.error = "";
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
      state.error = "";
    });

    builder.addCase(updateComic.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    });
  },
});

export const { resetFilters, filterAndSort, resetSearch  } = comicSlice.actions

export default comicSlice.reducer;
