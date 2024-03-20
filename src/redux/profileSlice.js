import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProfile as ProfileServices } from "../services/profileServices";
import { updateProfile as UpdateProfileServices } from "../services/profileServices";

export const getProfile = createAsyncThunk("get-profile", async () => {
  const response = await ProfileServices();
  return response;
});

const profileSlice = createSlice({
  name: "get-profile",
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
      .addCase(getProfile.fulfilled, (state, action) => {
        state.values = action.payload;
      })
      .addCase(getProfile.rejected, (state, action) => {
        console.log("rejected get profile");
      });
  },
});

export default profileSlice;
