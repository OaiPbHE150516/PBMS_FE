import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getActionsOfCollab as ActionsOfCollabServices } from "../services/actionServices";
import { addActionsOfCollabNoTrans as NewActionsOfCollabNoTransServices } from "../services/actionServices";
import { addActionsOfCollabWithTrans as NewActionsOfCollabWithTransServices } from "../services/actionServices";
import { coverImage } from "../services/coverImageServices";
import { toast } from "react-toastify";
import { getCollaborator } from "./collaboratorSlice";

export const getActionsOfCollab = createAsyncThunk(
  "get-actionsOfCollab",
  async ({ collabID, accountID }) => {
    try {
      const response = await ActionsOfCollabServices(collabID);
      return response;
    } catch (error) {
      toast.error(error.response.data);
    }
  }
);

export const addActionNoTrans = createAsyncThunk(
  "add-action-no-trans",
  async ({ fieldValue }, { dispatch }) => {
    try {
      const body = {
        collabFundID: fieldValue.collabID,
        accountID: fieldValue.accountID,
        note: fieldValue.note !== "" ? fieldValue.note : "",
        filename:
          fieldValue.imageFile !== ""
            ? await coverImage(fieldValue.imageFile)
            : "",
      };
      const response = await NewActionsOfCollabNoTransServices(body);
      await dispatch(getActionsOfCollab({ collabID: fieldValue.collabID }));
      return response;
    } catch (error) {
      toast.error(error.response.data);
    }
  }
);

export const addActionWithTrans = createAsyncThunk(
  "add-action-with-trans",
  async ({ user, fieldValue }, { dispatch }) => {
    try {
      const body = {
        CollabFundID: fieldValue.collabID,
        AccountID: fieldValue.accountID,
        Note: fieldValue.note,
        TransactionID: fieldValue.transactionID,
      };
      const formData = new FormData();
      Object.entries(body).forEach(([key, value]) => {
        formData.append(key, value);
      });
      const response = await NewActionsOfCollabWithTransServices(formData);
      await dispatch(
        getActionsOfCollab({
          collabID: fieldValue.collabID,
          accountID: fieldValue.accountID,
        })
      );
      await dispatch(getCollaborator(user));
      return response;
    } catch (error) {
      toast.error(error.response.data);
    }
  }
);

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
        console.log("rejected get actions");
      });
  },
});

export default actionSlice;
