import { configureStore, combineReducers } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import authenSlice from "./authenSlice";
import valueSlice from "./valueSlice";
import budgetSlice from "./budgetSlice";
import categorySlice from "./categorySlice";
import walletSlice, { totalwalletSlice } from "./walletSlice";
import collaboratorSlice from "./collaboratorSlice";
import transactionSlice from "./transactionSlice";
import currencySlice from "./currencySlice";
import memberSlice from "./memberSlice";
import actionSlice from "./actionSlice";
import calendarSlice from "./calendarSlice";
import scanInvoiceSlice from "./scanInvoiceSlice";
import overviewLastTransactionSlice from "./overviewLastTransactionSlice";
import profileSlice from "./profileSlice";
import fileSlice from "./fileSlice";
import coverImageSlice from "./coverImageSlice";
import divideMoneySlice from "./divideMoneySlice";
import overviewMostTransactionSlice from "./overviewMostTransactionSlice";
import filterTransactionThisSlice from "./filterTransactionThisSlice";
import filterTransactionLastSlice from "./filterTransactionLastSlice";
import balanceHistorySlice from "./balanceHistorySlice";
import searchMemberSlice from "../services/searchMemberSlice";
const rootReducers = combineReducers({
  authen: authenSlice.reducer,
  value: valueSlice.reducer,
  budget: budgetSlice.reducer,
  category: categorySlice.reducer,
  wallet: walletSlice.reducer,
  totalwallet: totalwalletSlice.reducer,
  transaction: transactionSlice.reducer,
  collaborator: collaboratorSlice.reducer,
  currency: currencySlice.reducer,
  member: memberSlice.reducer,
  action: actionSlice.reducer,
  calendar: calendarSlice.reducer,
  scan: scanInvoiceSlice.reducer,
  lastTransaction: overviewLastTransactionSlice.reducer,
  profile: profileSlice.reducer,
  coverImage: coverImageSlice.reducer,
  divideMoney: divideMoneySlice.reducer,
  file: fileSlice.reducer,
  mostTransaction: overviewMostTransactionSlice.reducer,
  filterTransactionLast: filterTransactionLastSlice.reducer,
  filterTransactionThis: filterTransactionThisSlice.reducer,
  balanceHistory: balanceHistorySlice.reducer,
  searchMember: searchMemberSlice.reducer,
});

const store = configureStore({
  reducer: rootReducers,
  middleware: [thunk],
});

/**
 * @typedef {ReturnType<typeof store.getState>} RootState
 */
export { store };
