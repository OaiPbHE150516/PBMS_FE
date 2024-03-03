import { configureStore, combineReducers } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import authenSlice from "./authenSlice";
import valueSlice from "./valueSlice";
import walletSlice from "./walletSlice";

const rootReducers = combineReducers({
  authen: authenSlice.reducer,
  value: valueSlice.reducer,
  wallet: walletSlice.reducer,
});

const store = configureStore({
  reducer: rootReducers,
  middleware: [thunk],
});

export { store };
