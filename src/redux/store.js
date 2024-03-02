import { configureStore, combineReducers } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import authenSlice from "./authenSlice";
import valueSlice from "./valueSlice";
import budgetSlice from "./budgetSlice";

const rootReducers = combineReducers({
  authen: authenSlice.reducer,
  value: valueSlice.reducer,
  budget:budgetSlice.reducer,
});

const store = configureStore({
  reducer: rootReducers,
  middleware: [thunk],
});

export { store };
