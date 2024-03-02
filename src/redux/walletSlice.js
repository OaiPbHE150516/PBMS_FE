import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {getWallets as walletServices} from "../services/walletService";

export const getWallets = createAsyncThunk("get-wallets", async () => {
  const response = await walletServices();
  return response;
});

const walletSlice = createSlice({
  name: "wallet",
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
      .addCase(getWallets.fulfilled, (state, action) => {
        state.values = action.payload;
      })
      .addCase(getWallets.rejected, (state, action) => {
        console.log("rejected get budgets");
      })
  },
});

export default walletSlice;
