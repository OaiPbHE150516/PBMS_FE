import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {getTransaction as transactionServices} from "../services/transactionServices";

export const getTransaction = createAsyncThunk("get-transaction", async () => {
  const response = await transactionServices();
  return response;
});


const transactionSlice = createSlice({
  name: "transaction",
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
      .addCase(getTransaction.fulfilled, (state, action) => {
        state.values = action.payload;
      })
      .addCase(getTransaction.rejected, (state, action) => {
        console.log("rejected");
      })
  },
});

export default transactionSlice;

