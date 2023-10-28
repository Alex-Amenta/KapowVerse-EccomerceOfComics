import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const initialState = {
	loading: false,
	cart: [],
	totalItemsInCart: 0,
	itemQuantity: 0,
	totalPrice: 0,
	error: "",
};

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
		setItemQuantity: (state, action) => {
			let { itemId, quantity } = action.payload;
			const item = state.cart.find((item) => item.id === itemId);
			if (item && quantity > item.stock) quantity = item.stock;
			if (item && item.quantity < quantity)
				state.itemQuantity += quantity - item.quantity;
			else if (item && item.quantity > quantity)
				state.itemQuantity -= item.quantity - quantity;

			if (item && quantity > 0 && quantity <= item.stock) {
				item.quantity = quantity;
				state.totalPrice = item.price * item.quantity;
			} else if (item && quantity > item.stock) {
				item.quantity = item.stock;
				// state.itemQuantity += item.stock;
				// state.totalPrice += item.price * item.stock;
			} else if (item && quantity <= 0) {
				item.quantity = 1;
			}

			state.totalPrice = parseFloat(state.totalPrice.toFixed(2));
		},
		clearCart: (state) => {
			state.cart = [];
			state.itemQuantity = 0;
			state.totalPrice = 0;
		},
	},
});

export const {
	addItemToCart,
	removeItem,
	increaseItemQuantity,
	decreaseItemQuantity,
	setItemQuantity,
	clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
