import { configureStore } from '@reduxjs/toolkit'
import comicsReducer from './features/comicSlice';
import userReducer from './features/userSlice';
import reviewReducer from './features/reviewSlice';
import cartReducer from './features/cartSlice';

export const store = configureStore({
    reducer: {
        comic: comicsReducer,
        user: userReducer,
        review: reviewReducer,
        cart: cartReducer
    }
});