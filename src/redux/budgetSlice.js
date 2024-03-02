import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import budgetServices from "../services/budgetServices";

export const getBudgets = createAsyncThunk("get-budgets", async () => {
  const response = await budgetServices.getValues();
  return response;
});


const budgetSlice = createSlice({
  name: "value",
  initialState: {
    values: null,
  },
  reducers: {
    setValues: (state, action) => {
      state.values = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBudgets.fulfilled, (state, action) => {
        state.values = action.payload;
      })
      .addCase(getBudgets.rejected, (state, action) => {
        console.log("rejected get budgets");
      })
  },
});

export default budgetSlice;
