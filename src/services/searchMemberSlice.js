import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { searchMembersByKey as SearchMemberServices } from "../services/memberServices";
import { toast } from "react-toastify";

export const searchMembersByKey = createAsyncThunk(
  "search-member",
  async (key) => {
    const response = await SearchMemberServices(key);
    return response;
  }
);

const searchMemberSlice = createSlice({
  name: "searchMember",
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
      .addCase(searchMembersByKey.fulfilled, (state, action) => {
        state.values = action.payload;
      })
      .addCase(searchMembersByKey.rejected, (state, action) => {
        console.log("rejected search member");
      });
  },
});

export default searchMemberSlice;
