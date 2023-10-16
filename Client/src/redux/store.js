import { configureStore } from '@reduxjs/toolkit'
import comicsReducer from './features/comicSlice';
import userReducer from './features/userSlice';

export const store = configureStore({
    reducer: {
        comic: comicsReducer,
        user: userReducer,
    }
});