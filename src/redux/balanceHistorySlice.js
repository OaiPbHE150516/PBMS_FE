import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getBalanceHistory as BalanceHistoryServices, getBalanceHistoryByDate } from "../services/balanceHisotoryServices";

export const getBalanceHistory = createAsyncThunk(
  "get-balance-history",
  // async (_, { getState }) => {
    async ({firstDate, lastDate}, { getState }) => {
    const user = getState().authen.user;
    // const response = await BalanceHistoryServices(user, firstDate, lastDate);
    const response = await getBalanceHistoryByDate(user, firstDate, lastDate);
    return response;
  }
);
const balanceHistorySlice = createSlice({
  name: "balance-history",
  initialState: {
    minBalance: 0,
    maxBalance: 0,
    listAfter: [],
  },
  reducers: {
    setValues: (state, action) => {
      state.minBalance = action.payload.minBalance;
      state.maxBalance = action.payload.maxBalance;
      state.listAfter = action.payload.listAfter;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBalanceHistory.fulfilled, (state, action) => {
        if (action.payload === undefined) return;
        state.minBalance = action.payload.minBalance;
        state.maxBalance = action.payload.maxBalance;
        state.listAfter = action.payload.listAfter;
      })
      .addCase(getBalanceHistory.rejected, (state, action) => {
        console.log("rejected get balance history");
      });
  },
});

export default balanceHistorySlice;
