import { createSlice, createSelector } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  emails: [],
  showMailBox: false,
  filter: "",
};

const emailsSlice = createSlice({
  name: "emails",
  initialState: INITIAL_STATE,
  reducers: {
    deleteEmail(state, action) {
      state.emails = state.emails.filter(
        (email) => email.id !== action.payload
      );
    },
    toggleMailBox(state) {
      state.showMailBox = !state.showMailBox;
    },
    addEmail(state, action) {
      state.emails.push(action.payload);
    },
    setFilter(state, action) {
      state.filter = action.payload;
    },
  },
});

export const selectEmails = (state) => state.emails.emails;
export const selectShowMailBox = (state) => state.emails.showMailBox;
export const selectEmailFilter = (state) => state.emails.filter;
export const selectFilteredEmails = createSelector(
  [selectEmails, selectEmailFilter],
  (emails, filter) => {
    return emails.filter(
      (email) =>
        email.email.toLowerCase().includes(filter.trim().toLowerCase()) ||
        email.userName.toLowerCase().includes(filter.trim().toLowerCase())
    );
  }
);

export const { deleteEmail, toggleMailBox, addEmail, setFilter } =
  emailsSlice.actions;

export const emailsReducer = emailsSlice.reducer;
