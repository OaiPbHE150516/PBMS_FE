import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCollaborators as getCollaboratorsServices } from "../services/collaboratorServices";
import { addCollaborators as addCollaboratorsServices } from "../services/collaboratorServices";
import { updateCollaborators as updateCollaboratorsServices } from "../services/collaboratorServices";
import { coverImage } from "../services/coverImageServices";

export const getCollaborator = createAsyncThunk(
  "get-collaborators",
  async (_, { getState }) => {
    const user = getState().authen.user;
    const response = await getCollaboratorsServices(user);
    return response;
  }
);

export const addCollaborator = createAsyncThunk(
  "add-collaborator",
  async ({ fieldValue }, { dispatch }) => {
    const imageConvert = await coverImage(fieldValue.imageFile);
    const body = {
      accountID: fieldValue.accountID,
      name: fieldValue.name,
      description: fieldValue.description,
      imageURL: imageConvert,
      accountIDs: fieldValue.account.map((item) => item.accountID),
    };
    const response = await addCollaboratorsServices(body);
    await dispatch(getCollaborator(fieldValue.user));
    return response;
  }
);

export const updateCollaborator = createAsyncThunk(
  "update-collaborator",
  async ({ fieldValue }, { dispatch }) => {
    const imageConvert = await coverImage(fieldValue.imageFile);
    const body = {
      collabFundID: fieldValue.collabFundID,
      name: fieldValue.name,
      description: fieldValue.description,
      imageURL: imageConvert,
      activeStateID: 1
    };
    const response = await updateCollaboratorsServices(body);
    await dispatch(getCollaborator(fieldValue.user));
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
