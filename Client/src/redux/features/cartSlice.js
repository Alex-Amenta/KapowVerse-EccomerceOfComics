import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import base_url from '../../utils/development'
import axios from "axios";

const URL = `${base_url}/cart`

const initialState = {
    loading: false,
    cart: [],
    totalItemsInCart: 0,
    itemQuantity: 0,
    totalPrice: 0,
    error: ""
};

export const getCartByUserId = createAsyncThunk(
    'cart/getCartByUserId', async (userId, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(`${URL}/${userId}`);
            return {
                cart: data.cart,
                total: data.total
            };
        } catch (error) {
            return rejectWithValue(error.response.error);
        }
    }
)

export const addToCart = createAsyncThunk(
    'cart/addToCart', async ({ userId, comicId }, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(`${URL}/${userId}/add`, { comicId });
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
    reducers: {
        addItemToCart: (state, action) => {
            const newItem = action.payload;
            const existingItem = state.cart.find((item) => item.id === newItem.id);

            if (!existingItem) {
                if (newItem.stock > 0) {
                    state.cart.push({ ...newItem, quantity: 1 });
                    state.itemQuantity += 1;
                    state.totalPrice += newItem.price;
                } else {
                    alert("No hay productos en stock");
                }
            } else if (existingItem.quantity < existingItem.stock) {
                existingItem.quantity += 1;
                state.itemQuantity += 1;
                state.totalPrice += newItem.price;
            } else {
                alert("No hay productos en stock");
            }

            state.totalPrice = parseFloat(state.totalPrice.toFixed(2));
        },
        removeItem: (state, action) => {
            const itemId = action.payload;
            const itemIndex = state.cart.findIndex((item) => item.id === itemId);
            const item = state.cart.find((item) => item.id === itemId);

            if (itemIndex !== -1) {
                state.itemQuantity -= item.quantity;
                state.totalPrice -= item.price * item.quantity;
                state.cart.splice(itemIndex, 1);
            }

            state.totalPrice = parseFloat(state.totalPrice.toFixed(2));
        },
        increaseItemQuantity: (state, action) => {
            const itemId = action.payload;
            const item = state.cart.find((item) => item.id === itemId);

            if (item && item.quantity < item.stock) {
                item.quantity += 1;
                state.itemQuantity += 1;
                state.totalPrice += item.price;
            }

            state.totalPrice = parseFloat(state.totalPrice.toFixed(2));
        },
        decreaseItemQuantity: (state, action) => {
            const itemId = action.payload;
            const item = state.cart.find((item) => item.id === itemId);

            if (item && item.quantity > 1) {
                item.quantity -= 1;
                state.itemQuantity -= 1;
                state.totalPrice -= item.price;
            }

            state.totalPrice = parseFloat(state.totalPrice.toFixed(2));
        },
        clearCart: (state, action) => {
            state.cart = [];
            state.itemQuantity = 0;
            state.totalPrice = 0;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getCartByUserId.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(getCartByUserId.fulfilled, (state, action) => {
            state.loading = false;
            state.cart = action.payload.cart;
            state.totalPrice = action.payload.total;
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
            state.totalItemsInCart = action.payload.cartItems.reduce((total, item) => total + item.quantity, 0);
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
            state.totalItemsInCart = action.payload.cartItems.reduce((total, item) => total + item.quantity, 0);
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
            state.totalItemsInCart = action.payload.cartItems.reduce((total, item) => total + item.quantity, 0);
            state.error = "";
        })
        builder.addCase(removeItemFromCart.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || "Error al eliminar un artículo del carrito";
        });
    }
});

export const {
  addItemToCart,
  removeItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;