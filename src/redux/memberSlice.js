import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getMembersOfCollab as MembersOfCollabServices } from "../services/memberServices";
import { addMemberToCollab as AddMembersOfCollabServices } from "../services/memberServices";
import { toast } from "react-toastify";

export const getMembersOfCollab = createAsyncThunk(
  "get-membersOfCollab",
  async ({ collabID }, { getState }) => {
    const user = getState().authen.user;
    const response = await MembersOfCollabServices(collabID, user);
    return response;
  }
);

export const addMembersToCollab = createAsyncThunk(
  "add-members-to-collab",
  async ({ fieldValue }, { dispatch }) => {
    try {
      const body = {
        collabFundID: fieldValue.collabFundID,
        accountFundholderID: fieldValue.accountFundholderID,
        accountMemberID: fieldValue.accountMemberID,
      };
      const response = await AddMembersOfCollabServices(body);
      toast.success("Add Member successfully.");
      await dispatch(getMembersOfCollab(fieldValue.collabFundID));
      return response;
    } catch (error) {
      toast.error("Failed to add member.");
      throw error;
    }
  }
);

const memberSlice = createSlice({
  name: "membersOfCollab",
  initialState: {
    active: [],
    pending: [],
    inactive: [],
  },
  reducers: {
    setValues: (state, action) => {
      state.active = action.payload.active;
      state.pending = action.payload.pending;
      state.inactive = action.payload.inactive;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMembersOfCollab.fulfilled, (state, action) => {
        if (action.payload === undefined) return;
        state.active = action.payload.active;
        state.pending = action.payload.pending;
        state.inactive = action.payload.inactive;
      })
      .addCase(getMembersOfCollab.rejected, (state, action) => {
        console.log("rejected get members");
      });
  },
});

export default memberSlice;
