import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import currencyServices from "../services/currencyServices";

export const getCurrency = createAsyncThunk("get-currency", async () => {
  const response = await currencyServices.getCurrency();
  return response;
});

const currencySlice = createSlice({
  name: "currency",
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
      .addCase(getCurrency.fulfilled, (state, action) => {
        state.values = action.payload;
      })
      .addCase(getCurrency.rejected, (state, action) => {
        console.log("rejected");
      })
  },
});

export default currencySlice;
