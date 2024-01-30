import { configureStore, combineReducers } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import authenSlice from "./authenSlice";

const rootReducers = combineReducers({
  authen: authenSlice.reducer,
});

const store = configureStore({
  reducer: rootReducers,
  middleware: [thunk],
});

export { store };
