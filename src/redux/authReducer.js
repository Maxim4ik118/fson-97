import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  requestGetCurrentUser,
  requestLogOut,
  requestSignIn,
  requestSignUp,
  setToken,
} from "../services/contactsApi";

export const apiRegisterUser = createAsyncThunk(
  "auth/register",
  async (formData, thunkAPI) => {
    try {
      const data = await requestSignUp(formData);

      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const apiLoginUser = createAsyncThunk(
  "auth/login",
  async (formData, thunkAPI) => {
    try {
      const data = await requestSignIn(formData);

      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const apiRefreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;

    setToken(token);
    try {
      const data = await requestGetCurrentUser();
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  },
  {
    condition: (_, thunkAPI) => {
      const state = thunkAPI.getState();
      const token = state.auth.token;

      if(!token) return false;
      return true;
    }
  }
);

export const apiLogoutUser = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      await requestLogOut();

      return;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

const INITIAL_STATE = {
  userData: null,
  token: null, // LOCALSTORAGE PERSIST ✅
  isSignedIn: false,
  isRefreshing: false,
  isLoading: false,
  isError: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: INITIAL_STATE,
  extraReducers: (builder) =>
    builder
      .addCase(apiRegisterUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData = action.payload.user;
        state.token = action.payload.token;
        state.isSignedIn = true;
      })
      .addCase(apiLoginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData = action.payload.user;
        state.token = action.payload.token;
        state.isSignedIn = true;
      })
      .addCase(apiLogoutUser.fulfilled, () => {
        return INITIAL_STATE;
      })

      //   REFRESH
      .addCase(apiRefreshUser.pending, (state) => {
        state.isRefreshing = true;
        state.isError = false;
      })
      .addCase(apiRefreshUser.fulfilled, (state, action) => {
        state.isRefreshing = false;
        state.userData = action.payload;
        state.isSignedIn = true;
      })
      .addCase(apiRefreshUser.rejected, (state) => {
        state.isRefreshing = false;
        state.isError = true;
      })

      .addMatcher(
        isAnyOf(
          apiRegisterUser.pending,
          apiLoginUser.pending,
          apiLogoutUser.pending
        ),
        (state) => {
          state.isLoading = true;
          state.isError = false;
        }
      )
      .addMatcher(
        isAnyOf(
          apiRegisterUser.rejected,
          apiLoginUser.rejected,
          apiLogoutUser.rejected
        ),
        (state) => {
          state.isLoading = false;
          state.isError = true;
        }
      ),
});

export const selectUserData = (state) => state.auth.userData;
export const selectUserToken = (state) => state.auth.token;
export const selectUserIsSignedIn = (state) => state.auth.isSignedIn;
export const selectUserIsRefreshing = (state) => state.auth.isRefreshing;
export const selectUserIsLoading = (state) => state.auth.isLoading;
export const selectUserIsError = (state) => state.auth.isError;

export const authReducer = authSlice.reducer;
