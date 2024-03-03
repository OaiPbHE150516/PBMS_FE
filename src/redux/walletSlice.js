import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {getWallet as getWalletServices} from "../services/walletServices";
import {getTotalWallet as getTotalWalletServices} from "../services/walletServices";

export const getValues = createAsyncThunk("get-wallet", async () => {
  const response = await getWalletServices();
  return response;
});
export const getTotalValues = createAsyncThunk("get-totalwallet", async () => {
  const response = await getTotalWalletServices;
  return response;
});

// export const addValue = createAsyncThunk("add-values", async (value) => {
//   const response = await valueServices.addValues(value);
//   return response;
// });
export const TotalWalletSlice = createSlice({
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
      .addCase(getTotalValues.fulfilled, (state, action) => {
        state.values = action.payload;
      })
      .addCase(getTotalValues.rejected, (state, action) => {
        console.log("rejected get values");
      })

    //   .addCase(addValue.fulfilled, (state, action) => {
    //     console.log("add successful");
    //   });
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
      .addCase(getValues.fulfilled, (state, action) => {
        state.values = action.payload;
      })
      .addCase(getValues.rejected, (state, action) => {
        console.log("rejected get values");
      })

    //   .addCase(addValue.fulfilled, (state, action) => {
    //     console.log("add successful");
    //   });
  },
});

export default walletSlice;
