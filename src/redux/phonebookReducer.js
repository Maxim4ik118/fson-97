import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  requestAddContact,
  requestDeleteContact,
  requestGetContacts,
} from "../services/contactsApi";

export const apiGetUserContacts = createAsyncThunk(
  "phonebook/get",
  async (_, thunkAPI) => {
    try {
      const data = await requestGetContacts();
      return data; // Це значення буде записане в action.payload
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message); // Це значення буде записане в action.payload
    }
  }
);

export const apiAddUserContact = createAsyncThunk(
  "phonebook/add",
  async (formData, thunkAPI) => {
    try {
      const data = await requestAddContact(formData);
      return data; // Це значення буде записане в action.payload
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message); // Це значення буде записане в action.payload
    }
  }
);

export const apiDeleteUserContact = createAsyncThunk(
  "phonebook/delete",
  async (contactId, thunkAPI) => {
    try {
      const data = await requestDeleteContact(contactId);
      return data; // Це значення буде записане в action.payload
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message); // Це значення буде записане в action.payload
    }
  }
);

const INITIAL_STATE = {
  contacts: null,
  isLoading: false,
  isError: false,
};

const phonebookSlice = createSlice({
  // Ім'я слайсу
  name: "phonebook",
  // Початковий стан редюсера слайсу
  initialState: INITIAL_STATE,

  // Об'єкт редюсерів для асинхронних генераторів екшенів
  extraReducers: (builder) =>
    builder
      .addCase(apiGetUserContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contacts = action.payload;
      })
      .addCase(apiAddUserContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contacts = [...state.contacts, action.payload];
      })
      .addCase(apiDeleteUserContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contacts = state.contacts.filter(
          (contact) => contact.id !== action.payload.id
        );

        // const deletingContactIndex = state.contacts.findIndex(
        //   (contact) => contact.id === action.payload.id
        // );
        // state.contacts.splice(deletingContactIndex, 1);
      })

      .addMatcher(
        isAnyOf(
          apiGetUserContacts.pending,
          apiAddUserContact.pending,
          apiDeleteUserContact.pending
        ),
        (state) => {
          state.isLoading = true;
          state.isError = false;
        }
      )
      .addMatcher(
        isAnyOf(
          apiGetUserContacts.rejected,
          apiAddUserContact.rejected,
          apiDeleteUserContact.rejected
        ),
        (state) => {
          state.isLoading = false;
          state.isError = true;
        }
      ),
});

export const selectPhonebookContacts = (state) => state.phonebook.contacts;
export const selectPhonebookIsLoading = (state) => state.phonebook.isLoading;
export const selectPhonebookIsError = (state) => state.phonebook.isError;

// Редюсер слайсу
export const phonebookReducer = phonebookSlice.reducer;
