import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getBalanceHistoryByWallet as BalanceHistoryServices } from "../services/balanceHisotoryServices";
import { toast } from "react-toastify";

export const getBalanceHistory = createAsyncThunk(
  "get-balance-history",
  async ({ walletID }, { getState }) => {
    try {
      const user = getState().authen.user;
      console.log(user.accountID, walletID);
      const response = await BalanceHistoryServices(user, walletID);
      return response;
    } catch (error) {
      toast.error(error.response.data);
    }
  }
);

const balanceHistorySlice = createSlice({
  name: "balance-history",
  initialState: {
    values: [],
  },
  reducers: {
    setValues: (state, action) => {
      state.values = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBalanceHistory.fulfilled, (state, action) => {
        state.values = action.payload;
      })
      .addCase(getBalanceHistory.rejected, (state, action) => {
        console.log("rejected get balance");
      });
  },
});

export default balanceHistorySlice;
