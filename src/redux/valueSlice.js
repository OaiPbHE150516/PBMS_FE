import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import valueServices from "../services/valueServices";
import { toast } from "react-toastify";

export const getValues = createAsyncThunk("get-values", async () => {
  const response = await valueServices.getValues();
  return response;
});

export const addValue = createAsyncThunk("add-values", async (value) => {
  const response = await valueServices.addValues(value);
  return response;
});

const valueSlice = createSlice({
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
      .addCase(getValues.fulfilled, (state, action) => {
        state.values = action.payload;
      })
      .addCase(getValues.rejected, (state, action) => {
        console.log("rejected get values");
      })

      .addCase(addValue.fulfilled, (state, action) => {
        console.log("add successful");
      });
  },
});

export default valueSlice;
