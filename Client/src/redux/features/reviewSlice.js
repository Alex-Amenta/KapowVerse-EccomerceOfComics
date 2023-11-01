import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import base_url from "../../utils/development";

const URL = `${base_url}/review`;

const initialState = {
    loading: false,
    reviews: [],
    reviewsCopy: [],
    error: null
}

export const fetchReviewByComic = createAsyncThunk(
    'review/fetchReviewByComic', async (comicId, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(`${URL}/${comicId}`);
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
);

export const createReview = createAsyncThunk(
    'review/createReview', async ({ rating, comment, userId, comicId }, { rejectWithValue, dispatch }) => {
        try {
            const { data } = await axios.post(URL, { rating, comment, userId, comicId });
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
);

export const updateReview = createAsyncThunk(
    'review/updateReview', async ({ reviewId, editReview }, { rejectWithValue }) => {
        try {
            const { data } = await axios.put(`${URL}/${reviewId}`, editReview);
            return data;
        } catch (error) {
            rejectWithValue(error.response.data);
        }
    }
);

export const deleteReview = createAsyncThunk(
    'review/deleteReview', async (reviewId, { rejectWithValue }) => {
        try {
            const { data } = await axios.delete(`${URL}/${reviewId}`);
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

const reviewSlice = createSlice({
    name: 'review',
    initialState,
    reducers: {
        reviewSortRating: (state, action) => {
            const sortOrder = action.payload;

            if (sortOrder === 'asc') {
                state.reviews.sort((a, b) => a.rating - b.rating);
            } else if (sortOrder === 'desc') {
                state.reviews.sort((a, b) => b.rating - a.rating);
            } else if (sortOrder === '') {
                state.reviews = state.reviewsCopy;
            }
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchReviewByComic.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchReviewByComic.fulfilled, (state, action) => {
                state.loading = false;
                state.reviews = action.payload;
                state.reviewsCopy = action.payload;
            })
            .addCase(fetchReviewByComic.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(createReview.pending, (state) => {
                state.loading = true;
            })
            .addCase(createReview.fulfilled, (state, action) => {
                state.loading = false;
                state.reviews.push(action.payload);
            })
            .addCase(createReview.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(updateReview.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateReview.fulfilled, (state, action) => {
                const updatedReview = action.payload;

                const index = state.reviews.findIndex((review) => review.id === updatedReview.id);

                // Si se encuentra el índice (la revisión existe en el estado), actualiza la revisión en ese índice.
                if (index !== -1) {
                    state.reviews[index] = updatedReview;
                }
            })
            .addCase(updateReview.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(deleteReview.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteReview.fulfilled, (state, action) => {
                const deletedReviewId = action.payload;
                state.reviews = state.reviews.filter((review) => review.id === deletedReviewId);
            })
            .addCase(deleteReview.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { reviewSortRating } = reviewSlice.actions;
export default reviewSlice.reducer;