import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {getCategories as categoryServices} from "../services/categoryServices";

export const getCategories = createAsyncThunk("get-categories", async () => {
  const response = await categoryServices();
  return response;
});


const categorySlice = createSlice({
  name: "category",
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
      .addCase(getCategories.fulfilled, (state, action) => {
        state.values = action.payload;
      })
      .addCase(getCategories.rejected, (state, action) => {
        console.log("rejected get budgets");
      })
  },
});

export default categorySlice;
