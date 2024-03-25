import { combineReducers, createStore } from "redux";
import { devToolsEnhancer } from "@redux-devtools/extension";
import { productDetailsReducer } from "./productDetailReducer";

const rootReducer = combineReducers({
    productDetails: productDetailsReducer,
});

const enhancer = devToolsEnhancer();
export const store = createStore(rootReducer, enhancer);
