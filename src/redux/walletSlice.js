import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {getWallets as walletServices} from "../services/walletService";
import {getTotalWallets as totalwalletServices} from "../services/walletService";
import { addWallet as addWalletServices } from "../services/walletService";
export const getWallets = createAsyncThunk("get-wallets", async () => {
  const response = await walletServices();
  return response;
});
export const getTotalWallets = createAsyncThunk("get-totalwallets", async (accountID) => {
  const response = await totalwalletServices(accountID);
  return response;
});
export const addWallet = createAsyncThunk(
  "add-wallet",
  async ({accountID, fieldValue}, { dispatch }) => {
    const body = {
        accountID: accountID,
        name: fieldValue.name,
        balance: fieldValue.balance,
        currencyID: fieldValue.currencyID,
      };
      console.log(body);
    const response = await addWalletServices(body);
    await dispatch(getWallets())
    await dispatch(getTotalWallets())
    return response;
  }
);
export const totalwalletSlice = createSlice({
  name: "totalwallet",
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
      .addCase(getTotalWallets.fulfilled, (state, action) => {
        state.values = action.payload;
      })
      .addCase(getTotalWallets.rejected, (state, action) => {
        console.log("rejected");
      })
  },
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
        console.log("rejected");
      })
  },
});

export default walletSlice;
