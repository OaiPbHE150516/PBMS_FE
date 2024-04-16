import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { mostTransactionExpense as MostTransExpenService } from "../services/transactionServices";

export const getMostTransExpen = createAsyncThunk(
  "most-trans-expen",
  async (_, { getState }) => {
    const user = getState().authen.user;
    const response = await MostTransExpenService(user);
    return response;
  }
);

const mostTransExpenseSlice = createSlice({
  name: "most-transaction-expense",
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
      .addCase(getMostTransExpen.fulfilled, (state, action) => {
        state.values = action.payload;
      })
      .addCase(getMostTransExpen.rejected, (state, action) => {
        console.log("rejected get most Trans");
      });
  },
});

export default mostTransExpenseSlice;
