import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { requestProductsById } from "../services/api";

export const apiGetProductDetails = createAsyncThunk(
  "productDetails/get",
  async (productId, thunkAPI) => {
    try {
      const data = await requestProductsById(productId);
      return data; // Це значення буде записане в action.payload
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message); // Це значення буде записане в action.payload
    }
  }
);

const INITIAL_STATE = {
  productData: null,
  isLoading: false,
  isError: false,
  counter: 0,
};

const productDetailsSlice = createSlice({
  // Ім'я слайсу
  name: "productDetails",
  // Початковий стан редюсера слайсу
  initialState: INITIAL_STATE,
  // Об'єкт редюсерів
  reducers: {
    incrementCounter(state) {
      state.counter = state.counter + 1;
    },
    decrementCounter(state) {
      state.counter = state.counter - 1;
    },
  },
  // Об'єкт редюсерів для асинхронних генераторів екшенів
  extraReducers: (builder) =>
    builder
      .addCase(apiGetProductDetails.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(apiGetProductDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productData = action.payload; //
      })
      .addCase(apiGetProductDetails.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      }),
});

// Генератори Action Creator
export const { incrementCounter, decrementCounter } =
  productDetailsSlice.actions;

export const selectProductData = (state) => state.productDetails.productData;
export const selectProductDetailsIsLoading = (state) => state.productDetails.isLoading;
export const selectProductDetailsIsError = (state) => state.productDetails.isError;

// Редюсер слайсу
export const productDetailsReducer = productDetailsSlice.reducer;
