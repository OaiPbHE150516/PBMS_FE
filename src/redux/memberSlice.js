import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getMembersOfCollab as MembersOfCollabServices } from "../services/memberServices";
import { addMemberToCollab as AddMembersOfCollabServices } from "../services/memberServices";
import { acceptToCollab as AcceptToCollabServices } from "../services/memberServices";
import { declineToCollab as DeclineToCollabServices } from "../services/memberServices";
import { invitationToCollab as InvitationToCollabServices } from "../services/memberServices";
import { toast } from "react-toastify";
import { getCollaborator } from "./collaboratorSlice";

export const getMembersOfCollab = createAsyncThunk(
  "get-membersOfCollab",
  async ({ collabID }, { getState }) => {
    try {
      const user = getState().authen.user;
      const response = await MembersOfCollabServices(collabID, user);
      return response;
    } catch (error) {
      toast.error(error.response.data);
    }
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
      const collabID = fieldValue.collabFundID;
      toast.success("Bạn đã mời thành công");
      await dispatch(getMembersOfCollab({ collabID }));
      return response;
    } catch (error) {
      toast.error(error.response.data);
    }
  }
);

export const acceptToCollab = createAsyncThunk(
  "accpet-to-collab",
  async ({ collabID, accID, user }, { dispatch }) => {
    try {
      const response = await AcceptToCollabServices(collabID, accID);
      toast.success("Bạn đã tham gia quỹ thành công");
      await dispatch(getMembersOfCollab({ collabID }));
      await dispatch(getCollaborator(user))
      return response;
    } catch (error) {
      toast.error(error.response.data);
    }
  }
);

export const declineToCollab = createAsyncThunk(
  "accpet-to-collab",
  async ({ collabID, accID, user }, { dispatch }) => {
    try {
      const body = {
        collabFundID: collabID,
        accountMemberID: accID
      }
      // console.log("Body",collabID, accID)
      const response = await DeclineToCollabServices(body);
      toast.success("Bạn từ chối lời mời thành công");
      await dispatch(getMembersOfCollab({ collabID }));
      await dispatch(getCollaborator(user))
      return response;
    } catch (error) {
      toast.error(error.response.data);
    }
  }
);

export const invitationToCollab = createAsyncThunk(
  "accpet-to-collab",
  async ({ collabID, accID, user }, { dispatch }) => {
    try {
      const response = await InvitationToCollabServices(collabID, accID);
      toast.success("Bạn từ chối lời mời thành công");
      await dispatch(getMembersOfCollab({ collabID }));
      await dispatch(getCollaborator(user))
      return response;
    } catch (error) {
      toast.error(error.response.data);
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
