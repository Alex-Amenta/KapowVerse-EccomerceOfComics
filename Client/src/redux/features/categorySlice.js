import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import base_url from "../../utils/development";

const URL = `${base_url}/category`;

const initialState = {
	loading: false,
	allCategory: [],
	error: "",
};

export const fetchCategories = createAsyncThunk(
	"categories/fetchCategories",
	async (_, { rejectWithValue }) => {
		try {
			const { data } = await axios.get(URL);
			return data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

export const createCategory = createAsyncThunk(
	"categories/createCategory",
	async (categoryData, { rejectWithValue }) => {
		try {
			const { data } = await axios.post(URL, categoryData);
			return data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

export const deleteCategory = createAsyncThunk(
	"categories/deleteCategory",
	async (categoryId, { rejectWithValue }) => {
		try {
			await axios.delete(`${URL}/${categoryId}`);
			return categoryId;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

const categorySlice = createSlice({
	name: "category",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchCategories.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(fetchCategories.fulfilled, (state, action) => {
			state.loading = false;
			state.allCategory = action.payload;
			state.error = "";
		});
		builder.addCase(fetchCategories.rejected, (state, action) => {
			state.loading = false;
			state.error =
				(action.payload && action.payload.error) || action.error.message;
		});

		builder.addCase(createCategory.fulfilled, (state, action) => {
			state.allCategory = [...state.allCategory, action.payload];
		});
		builder.addCase(createCategory.rejected, (state, action) => {
			state.error =
				(action.payload && action.payload.error) || action.error.message;
		});

		builder.addCase(deleteCategory.fulfilled, (state, action) => {
			state.allCategory = state.allCategory.filter(
				(category) => category.id !== action.payload
			);
		});
		builder.addCase(deleteCategory.rejected, (state, action) => {
			state.error =
				(action.payload && action.payload.error) || action.error.message;
		});
	},
});

export default categorySlice.reducer;
