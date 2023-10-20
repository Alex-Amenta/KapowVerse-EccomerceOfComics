import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import base_url from '../../utils/development'
import axios from "axios";

const URL = `${base_url}/cart`

const initialState = {
    loading: false,
    cart: [],
    error: ""
};

export const getCartByUserId = createAsyncThunk(
    'cart/getCartByUserId', async (userId, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(`${URL}/${userId}`);
            return data;
        } catch (error) {
            return rejectWithValue(error.response.error);
        }
    }
)

export const addToCart = createAsyncThunk(
    'cart/addToCart', async ({ userId, comicId }, { rejectWithValue }) => {
        console.log(comicId);
        try {
            const { data } = await axios.post(`${URL}/${userId}/add`, { comicId: comicId });
            return data;
        } catch (error) {
            return rejectWithValue(error.response);
        }
    }
)

export const reduceQuantity = createAsyncThunk(
    'cart/reduceQuantity', async (cartItemId, { rejectWithValue }) => {
        try {
            const { data } = await axios.delete(`${URL}/item/${cartItemId}`);
            return data;
        } catch (error) {
            return rejectWithValue(error.response.error);
        }
    }
)

export const removeItemFromCart = createAsyncThunk(
    'cart/removeItemFromCart', async (cartItemId, { rejectWithValue }) => {
        try {
            const { data } = await axios.delete(`${URL}/item/${cartItemId}/remove`);
            return data;
        } catch (error) {
            return rejectWithValue(error.response.error);
        }
    }
)

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getCartByUserId.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(getCartByUserId.fulfilled, (state, action) => {
            state.loading = false;
            state.cart = action.payload.cart;
            state.error = "";
        })
        builder.addCase(getCartByUserId.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || "Error al obtener el carrito del usuario";
        })
        builder.addCase(addToCart.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(addToCart.fulfilled, (state, action) => {
            state.loading = false;
            state.cart = action.payload;
            state.error = "";
        })
        builder.addCase(addToCart.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || "Error al agregar un artículo al carrito";
        })
        builder.addCase(reduceQuantity.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(reduceQuantity.fulfilled, (state, action) => {
            state.loading = false;
            state.cart = action.payload.cart;
            state.error = "";
        })
        builder.addCase(reduceQuantity.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || "Error al eliminar un artículo del carrito";
        });

        builder.addCase(removeItemFromCart.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(removeItemFromCart.fulfilled, (state, action) => {
            state.loading = false;
            state.cart = action.payload.cart;
            state.error = "";
        })
        builder.addCase(removeItemFromCart.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || "Error al eliminar un artículo del carrito";
        });
    }
});

export default cartSlice.reducer;