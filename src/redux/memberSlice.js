import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getMembersOfCollab as MembersOfCollabServices } from "../services/memberServices";

export const getMembersOfCollab = createAsyncThunk("get-membersOfCollab", async (collabID,accountID) => {
  const response = await MembersOfCollabServices(collabID,accountID);
  return response;
});

const memberSlice = createSlice({
  name: "membersOfCollab",
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
      .addCase(getMembersOfCollab.fulfilled, (state, action) => {
        state.values = action.payload;
      })
      .addCase(getMembersOfCollab.rejected, (state, action) => {
        console.log("rejected get members");
      });
  },
});

export default memberSlice;
