import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getHistoryOfCollab as HistoryOfCollabServices } from "../services/historyCollabServices";
import { toast } from "react-toastify";

export const getHistory = createAsyncThunk(
  "get-historiesOfCollab",
  async ({ collabID }, { getState }) => {
    try {
      const user = getState().authen.user;
      const response = await HistoryOfCollabServices(collabID, user);
      return response;
    } catch (error) {
      toast.error(error.response.data);
    }
  }
);

const historyCollabSlice = createSlice({
  name: "historiesOfCollab",
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
      .addCase(getHistory.fulfilled, (state, action) => {
        state.values = action.payload;
      })
      .addCase(getHistory.rejected, (state, action) => {
        console.log("rejected get history");
      });
  },
});

export default historyCollabSlice;
