import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getActionsOfCollab as ActionsOfCollabServices } from "../services/actionServices";
import { addActionsOfCollabNoTrans as NewActionsOfCollabNoTransServices } from "../services/actionServices";

export const getActionsOfCollab = createAsyncThunk("get-actionsOfCollab", async (collabID, accountID) => {
  const response = await ActionsOfCollabServices(collabID, accountID);
  return response;
});

export const addActionNoTrans = createAsyncThunk(
  "add-action-no-trans",
  async ({accountID, fieldValue}, { dispatch }) => {
    const body = {
      collabFundID: fieldValue.collabID,
      accountID: accountID,
      note: fieldValue.note,
      filename: "",
      };
    const response = await NewActionsOfCollabNoTransServices(body);
    await dispatch(getActionsOfCollab(body.collabFundID))
    return response;
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
        console.log("rejected get members");
      });
  },
});


export default actionSlice;
