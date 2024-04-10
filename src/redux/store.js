import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import { productDetailsReducer } from "./productDetailReducer";
import { productsReducer } from "./productsReducer";
import { emailsReducer } from "./emailsReducer";
import { authReducer } from "./authReducer";
import { phonebookReducer } from "./phonebookReducer";

const productDetailsConfig = {
  key: "productDetails",
  storage,
  whitelist: ["counter"],
};

const emailsConfig = {
  key: "emails",
  storage,
  whitelist: ["emails"],
};

const authConfig = {
  key: "auth",
  storage,
  whitelist: ["token"],
};

export const store = configureStore({
  reducer: {
    productDetails: persistReducer(productDetailsConfig, productDetailsReducer),
    emails: persistReducer(emailsConfig, emailsReducer),
    productsData: productsReducer,
    auth: persistReducer(authConfig, authReducer),
    phonebook: phonebookReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
