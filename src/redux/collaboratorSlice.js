import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCollaborators as getCollaboratorsServices } from "../services/collaboratorServices";

export const getCollaborator = createAsyncThunk("get-collaborators", async (accountID) => {
  const response = await getCollaboratorsServices(accountID);
  return response;
});

const collaboratorSlice = createSlice({
  name: "collaborator",
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
      .addCase(getCollaborator.fulfilled, (state, action) => {
        state.values = action.payload;
      })
      .addCase(getCollaborator.rejected, (state, action) => {
        console.log("rejected get collabs");
      });
  },
});

export default collaboratorSlice;
