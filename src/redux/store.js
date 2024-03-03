import { configureStore, combineReducers } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import authenSlice from "./authenSlice";
import valueSlice from "./valueSlice";
import budgetSlice from "./budgetSlice";
import categorySlice from "./categorySlice";
import walletSlice, { totalwalletSlice } from "./walletSlice";
import collaboratorSlice from "./collaboratorSlice";
import transactionSlice from "./transactionSlice";
const rootReducers = combineReducers({
  authen: authenSlice.reducer,
  value: valueSlice.reducer,
  budget:budgetSlice.reducer,
  category: categorySlice.reducer,
  wallet: walletSlice.reducer,
  totalwallet: totalwalletSlice.reducer,
  transaction: transactionSlice.reducer,
  collaborator: collaboratorSlice.reducer,
});

const store = configureStore({
  reducer: rootReducers,
  middleware: [thunk],
});


/**
 * @typedef {ReturnType<typeof store.getState>} RootState
 */
export { store };
