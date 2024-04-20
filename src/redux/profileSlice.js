import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProfile as ProfileServices } from "../services/profileServices";
import { updateProfile as UpdateProfileServices } from "../services/profileServices";
import { getAccountByKey as getAccountByKeyServices } from "../services/profileServices";
import { toast } from "react-toastify";

export const getProfileInfor = createAsyncThunk(
  "get-profile",
  async (_, { getState }) => {
    try {
      const user = getState().authen.user;
      const response = await ProfileServices(user);
      return response;
    } catch (error) {
      toast.error(error.response.data);
    }
  }
);

export const getAccountByKey = createAsyncThunk(
  "get-account-by-key",
  async (key) => {
    try {
      const response = await getAccountByKeyServices(key);
      return response;
    } catch (error) {
      toast.error(error.response.data);
    }
  }
);

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
      .addCase(getProfileInfor.fulfilled, (state, action) => {
        state.values = action.payload;
      })
      .addCase(getProfileInfor.rejected, (state, action) => {
        console.log("rejected get profile");
      });
  },
});

export const { setValues } = profileSlice.actions;

export default profileSlice;
