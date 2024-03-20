import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCollaborators as getCollaboratorsServices } from "../services/collaboratorServices";
import { addCollaborators as addCollaboratorsServices } from "../services/collaboratorServices";

export const getCollaborator = createAsyncThunk(
  "get-collaborators",
  async (accountID) => {
    const response = await getCollaboratorsServices(accountID);
    return response;
  }
);

export const addCollaborator = createAsyncThunk(
  "add-collaborator",
  async ({ accountID, fieldValue }, { dispatch }) => {
    const body = {
      accountID: accountID,
      name: fieldValue.name,
      description: fieldValue.description,
      imageURL: fieldValue.imageURL,
      totalAmount: fieldValue.totalAmount,
    };
    const response = await addCollaboratorsServices(body);
    await dispatch(getCollaborator());
    return response;
  }
);

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
