import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCollaborators as getCollaboratorsServices } from "../services/collaboratorServices";
import { addCollaborators as addCollaboratorsServices } from "../services/collaboratorServices";

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
  async ({fieldValue }, { dispatch }) => {
    const body = {
      accountID: fieldValue.accountID,
      name: fieldValue.name,
      description: fieldValue.description,
      imageURL: fieldValue.imageURL,
      accountIDs: fieldValue.account.map((item) => item.accountID),
    };
    // const response = await addCollaboratorsServices(body);
    // await dispatch(getCollaborator(user));
    // return response;
    console.log("body", body)
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
