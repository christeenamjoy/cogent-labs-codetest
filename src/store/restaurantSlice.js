import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { placeSearch } from "../utils/api";

export const fetchRestaurants = createAsyncThunk(
  "restaurants/fetchRestaurants",
  async (searchTerm = "") => {
    const response = await placeSearch(searchTerm);
    return response.results;
  }
);


const initialState = {
  restaurants: [],
  selectedRestaurant: null,
  loading: false,
  error: null,
};

const restaurantsSlice = createSlice({
  name: "restaurants",
  initialState,
  reducers: {
    selectRestaurant: (state, action) => {
      state.selectedRestaurant = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRestaurants.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRestaurants.fulfilled, (state, action) => {
        state.restaurants = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchRestaurants.rejected, (state, action) => {
        state.restaurants = [];
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { selectRestaurant } = restaurantsSlice.actions;

export default restaurantsSlice.reducer