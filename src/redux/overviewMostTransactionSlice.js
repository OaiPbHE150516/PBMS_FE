import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getMostTransaction as MostTransactionServices } from "../services/overviewLastTransactionServices";
import { toast } from "react-toastify";

export const getMostTransaction = createAsyncThunk(
  "get-most-transaction",
  async (number, { getState }) => {
    try {
      const user = getState().authen.user;
      const response = await MostTransactionServices(user, number);
      return response;
    } catch (error) {
      toast.error(error.response.data);
    }
  }
);

const overviewMostTransactionSlice = createSlice({
  name: "most-transaction",
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
      .addCase(getMostTransaction.fulfilled, (state, action) => {
        state.values = action.payload;
      })
      .addCase(getMostTransaction.rejected, (state, action) => {
        console.log("rejected most Transaction");
      });
  },
});

export default overviewMostTransactionSlice;
