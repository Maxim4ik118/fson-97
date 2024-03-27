import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  productData: null,
  isLoading: false,
  isError: false,
  counter: 0,
  contacts: [], // to homework example
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
    setProductData(state, action) {
      state.productData = action.payload;
    },
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
    setIsError(state, action) {
      state.isError = action.payload;
    },
    addContact(state, action) {
      state.contacts.push(action.payload); // 1
    },
    deleteContact(state, action) {
      state.contacts = state.contacts.filter(
        (contact) => contact.id !== action.payload
      );
    },
  },
});

// Генератори Action Creator
export const {
  incrementCounter,
  decrementCounter,
  setProductData,
  setIsLoading,
  setIsError,
  addContact,
  deleteContact,
} = productDetailsSlice.actions;

// Редюсер слайсу
export const productDetailsReducer = productDetailsSlice.reducer;

// INITIAL_STATE.isError = false; -> mutable change ❌

// const NEW_STATE = { -> immutable change ✅
//     ...INITIAL_STATE,
//     isError: false
// }

// export const productDetailsReducer = (state = INITIAL_STATE, action) => {
//   switch (action.type) {
//     case "details/setProductData": {
//       return { ...state, productData: action.payload };
//     }
//     case "details/setIsLoading": {
//       return { ...state, isLoading: action.payload };
//     }
//     case "details/setIsError": {
//       return { ...state, isError: action.payload };
//     }
//     case "contacts/addContact": {
//       return { ...state, contacts: [...state.contacts, action.payload] };
//     }
//     case "contacts/deleteContact": {
//       return {
//         ...state,
//         contacts: state.contacts.filter(
//           (contact) => contact.id !== action.payload
//         ),
//       };
//     }

//     default:
//       return state;
//   }
// };

// export const setIsLoadingAC = (payload) => {
//   return {
//     type: "details/setIsLoading",
//     payload,
//   };
// };

// export const setPoductDataAC = (payload) => {
//   return {
//     type: "details/setProductData",
//     payload,
//   };
// };

// export const setErrorAC = (payload) => {
//   return {
//     type: "details/setIsError",
//     payload,
//   };
// };
