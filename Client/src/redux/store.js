import { configureStore } from '@reduxjs/toolkit'
import comicsReducer from './features/comicSlice';

export const store = configureStore({
    reducer: {
        comic: comicsReducer
    }
});