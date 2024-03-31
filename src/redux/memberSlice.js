import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getMembersOfCollab as MembersOfCollabServices } from "../services/memberServices";
import { addMemberToCollab as AddMembersOfCollabServices } from "../services/memberServices";
import { toast } from "react-toastify";

export const getMembersOfCollab = createAsyncThunk(
  "get-membersOfCollab",
  async (collabID) => {
    const response = await MembersOfCollabServices(collabID);
    return response;
  }
);

export const addMembersToCollab = createAsyncThunk(
  "add-members-to-collab",
  async (
    { collabFundID, accountFundholderID, accountMemberID },
    { dispatch }
  ) => {
    try {
      const body = {
        collabFundID: collabFundID,
        accountFundholderID: accountFundholderID,
        accountMemberID: accountMemberID,
      };
      const response = await AddMembersOfCollabServices(body);
      await dispatch(getMembersOfCollab());
      toast.success("Add Member successfully.");
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
