import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { requestProductsByQuery } from "../services/api";

export const apiGetProductsByQuery = createAsyncThunk(
  "products/search",
  async (query, thunkAPI) => {
    try {
      const data = await requestProductsByQuery(query);

      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

const INITIAL_STATE = {
  products: null, // [{id: 1, ...}, {id: 2, ...}]
  isLoading: false,
  isError: false,
};

const productsSlice = createSlice({
  name: "products",
  initialState: INITIAL_STATE,
  extraReducers: (builder) =>
    builder
      .addCase(apiGetProductsByQuery.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(apiGetProductsByQuery.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload.products;
        // state.products.push(action.payload);
        // state.products = state.products.filter(product => product.id !== action.payload.id)
      })
      .addCase(apiGetProductsByQuery.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      }),
});

export const selectProducts = (state) => state.productsData.products;
export const selectProductsIsLoading = (state) => state.productsData.isLoading;
export const selectProductsIsError = (state) => state.productsData.isError;

export const productsReducer = productsSlice.reducer;
