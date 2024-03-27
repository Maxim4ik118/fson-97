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

const productDetailsConfig = {
  key: "productDetails",
  storage,
  whitelist: ["counter"],
//   blacklist: ['contacts', "isError", "isLoading", "productData"],
};

export const store = configureStore({
  reducer: {
    productDetails: persistReducer(productDetailsConfig, productDetailsReducer),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
