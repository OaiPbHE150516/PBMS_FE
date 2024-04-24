import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getTotalAmountCollaborator as getTotalAmountCollaboratorServices } from "../services/collaboratorServices";
import { toast } from "react-toastify";

export const getTotalAmountCollaborator = createAsyncThunk(
  "get-total-amount-collaborators",
  async (collabFundID) => {
    try {
      const response = await getTotalAmountCollaboratorServices(collabFundID);
      return response;
    } catch (error) {
      toast.error(error.response.data);
    }
  }
);

const totalAmountCollabSlice = createSlice({
  name: "totalAmountCollab",
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
      .addCase(getTotalAmountCollaborator.fulfilled, (state, action) => {
        state.values = action.payload;
      })
      .addCase(getTotalAmountCollaborator.rejected, (state, action) => {
        console.log("rejected total amount");
      });
  },
});

export default totalAmountCollabSlice;
