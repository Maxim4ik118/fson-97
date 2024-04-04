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

export const store = configureStore({
  reducer: {
    productDetails: persistReducer(productDetailsConfig, productDetailsReducer),
    emails: persistReducer(emailsConfig, emailsReducer),
    productsData: productsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
