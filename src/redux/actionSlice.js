import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getActionsOfCollab as ActionsOfCollabServices } from "../services/actionServices";

export const getActionsOfCollab = createAsyncThunk("get-actionsOfCollab", async (collabID) => {
  const response = await ActionsOfCollabServices(collabID);
  return response;
});

const actionSlice = createSlice({
  name: "actionsOfCollab",
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
      .addCase(getActionsOfCollab.fulfilled, (state, action) => {
        state.values = action.payload;
      })
      .addCase(getActionsOfCollab.rejected, (state, action) => {
        console.log("rejected get members");
      });
  },
});

export default actionSlice;
