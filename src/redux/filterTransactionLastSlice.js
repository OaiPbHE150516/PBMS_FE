import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getTransactionLastMonth as FilteTransactionLastServices } from "../services/filterTransactionServices";
import { getTransactionThisMonth as FilteTransactionThisServices } from "../services/filterTransactionServices";
import { toast } from "react-toastify";

export const filterTransactionLastMonth = createAsyncThunk(
  "filter-transaction-last-month",
  async ({ month, year }, { getState }) => {
    try {
      const user = getState().authen.user;
      const response = await FilteTransactionLastServices(month, year, user);
      return response;
    } catch (error) {
      toast.error(error.response.data);
    }
  }
);
const filterTransactionLastSlice = createSlice({
  name: "filter-transaction-last",
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
      .addCase(filterTransactionLastMonth.fulfilled, (state, action) => {
        if (action.payload === undefined) return;
        state.totalAmountOfMonth = action.payload.totalAmountOfMonth;
        state.totalAmountOfMonthStr = action.payload.totalAmountOfMonthStr;
        state.totalNumberOfTransaction =
          action.payload.totalNumberOfTransaction;
        state.totalNumberOfCategoryType =
          action.payload.totalNumberOfCategoryType;
        state.categoryWithTransactionData =
          action.payload.categoryWithTransactionData;
      })
      .addCase(filterTransactionLastMonth.rejected, (state, action) => {
        console.log("rejected filter last month");
      });
  },
});

export default filterTransactionLastSlice;
