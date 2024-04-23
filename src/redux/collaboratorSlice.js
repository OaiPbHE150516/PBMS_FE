import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCollaborators as getCollaboratorsServices } from "../services/collaboratorServices";
import { addCollaborators as addCollaboratorsServices } from "../services/collaboratorServices";
import { updateCollaborators as updateCollaboratorsServices } from "../services/collaboratorServices";
import { deleteCollaborators as deleteCollaboratorsServices } from "../services/collaboratorServices";
import { coverImage } from "../services/coverImageServices";
import { toast } from "react-toastify";

export const getCollaborator = createAsyncThunk(
  "get-collaborators",
  async (_, { getState }) => {
    try {
      const user = getState().authen.user;
      const response = await getCollaboratorsServices(user);
      return response;
    } catch (error) {
      toast.error(error.response.data);
    }
  }
);

export const addCollaborator = createAsyncThunk(
  "add-collaborator",
  async ({ fieldValue }, { dispatch }) => {
    try {
      if(fieldValue.account.length >= 1){
        let imageConvert =
        fieldValue.imageFile !== ""
          ? await coverImage(fieldValue.imageFile)
          : "https://picsum.photos/200/300";
      const body = {
        accountID: fieldValue.accountID,
        name: fieldValue.name,
        description: fieldValue.description,
        imageURL: imageConvert,
        accountIDs: fieldValue.account.map((item) => item.accountID),
      };

      const response = await addCollaboratorsServices(body);
      toast.success("Bạn tạo khoản tiêu chung thành công");
      await dispatch(getCollaborator(fieldValue.user));
      return response;
      }else{
        toast.error("Phải có ít nhất 2 thành viên")
      }
      
    } catch (error) {
      toast.error(error.response.data);
    }
  }
);

export const updateCollaborator = createAsyncThunk(
  "update-collaborator",
  async ({ fieldValue }, { dispatch }) => {
    try {
      const body = {
        collabFundID: fieldValue.collabFundID,
        name: fieldValue.name,
        description: fieldValue.description,
        imageURL: "",
        activeStateID: 1,
      };
      const response = await updateCollaboratorsServices(body);
      toast.success("Bạn đã chỉnh sửa thành công");
      await dispatch(getCollaborator(fieldValue.user));
      return response;
    } catch (error) {
      toast.error(error.response.data);
    }
  }
);

export const deleteCollaborator = createAsyncThunk(
  "delete-collaborator",
  async ({ accID, collabFundID, user }, { dispatch }) => {
    try {
      const response = await deleteCollaboratorsServices(accID, collabFundID);
      toast.success("Bạn đã xoá thành công");
      await dispatch(getCollaborator(user));
      return response;
    } catch (error) {
      toast.error(error.response.data);
    }
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
