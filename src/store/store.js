import { configureStore } from "@reduxjs/toolkit";
import restaurantSlice from "./restaurantSlice";
const store = configureStore({
  reducer: {
    restaurants: restaurantSlice
  },
});

export default store;
