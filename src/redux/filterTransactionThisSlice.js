import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getTransactionThisMonth as FilteTransactionThisServices } from "../services/filterTransactionServices";

export const filterTransactionThisMonth = createAsyncThunk(
    "filter-transaction-this-month",
    async ({ month, year }, { getState }) => {
      const user = getState().authen.user;
      const response = await FilteTransactionThisServices(month, year, user);
      return response;
    }
  );

const filterTransactionThisSlice = createSlice({
  name: "filter-transaction-this",
  initialState: {
    totalAmountOfMonth: 0,
    totalAmountOfMonthStr: "",
    totalNumberOfTransaction: 0,
    totalNumberOfCategoryType: 0,
    categoryWithTransactionData: [],
  },
  reducers: {
    setValues: (state, action) => {
      state.totalAmountOfMonth = action.payload.totalAmountOfMonth;
      state.totalAmountOfMonthStr = action.payload.totalAmountOfMonthStr;
      state.totalNumberOfTransaction = action.payload.totalNumberOfTransaction;
      state.totalNumberOfCategoryType =
        action.payload.totalNumberOfCategoryType;
      state.categoryWithTransactionData =
        action.payload.categoryWithTransactionData;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(filterTransactionThisMonth.fulfilled, (state, action) => {
        if(action.payload === undefined) return; 
        state.totalAmountOfMonth = action.payload.totalAmountOfMonth;
        state.totalAmountOfMonthStr = action.payload.totalAmountOfMonthStr;
        state.totalNumberOfTransaction =
          action.payload.totalNumberOfTransaction;
        state.totalNumberOfCategoryType =
          action.payload.totalNumberOfCategoryType;
        state.categoryWithTransactionData =
          action.payload.categoryWithTransactionData;
      })
      .addCase(filterTransactionThisMonth.rejected, (state, action) => {
        console.log("rejected filter this month");
      });
  },
});

export default filterTransactionThisSlice;
