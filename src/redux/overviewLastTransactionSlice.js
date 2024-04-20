import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { get7LastTransaction as LastTransactionServices } from "../services/overviewLastTransactionServices";
import { toast } from "react-toastify";
export const get7LastTransaction = createAsyncThunk(
  "get-last-transaction",
  async (_, { getState }) => {
    try {
      const user = getState().authen.user;
      const response = await LastTransactionServices(user);
      return response;
    } catch (error) {
      toast.error(error.response.data);
    }
  }
);

const overviewLastTransactionSlice = createSlice({
  name: "last-transaction",
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
      .addCase(get7LastTransaction.fulfilled, (state, action) => {
        state.values = action.payload;
      })
      .addCase(get7LastTransaction.rejected, (state, action) => {
        console.log("rejected");
      });
  },
});

export default overviewLastTransactionSlice;
