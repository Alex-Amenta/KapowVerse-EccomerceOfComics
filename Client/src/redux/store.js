import { configureStore } from "@reduxjs/toolkit";
import comicsReducer from "./features/comicSlice";
import userReducer from "./features/userSlice";
import reviewReducer from "./features/reviewSlice";
import cartReducer from "./features/cartSlice";
import darkModeReducer from "./features/darkModeSlice";
import categoryReducer from "./features/categorySlice";
import { loadState, saveState } from "./middleware";
import favoriteReducer from "./features/favoriteSlice"

const persistedState = loadState();

export const store = configureStore({
  reducer: {
    comic: comicsReducer,
    user: userReducer,
    review: reviewReducer,
    cart: cartReducer,
    darkMode: darkModeReducer,
    favorite: favoriteReducer,
    category: categoryReducer,
  },
  preloadedState: persistedState,
});

store.subscribe(() => {
  saveState(store.getState());
});
