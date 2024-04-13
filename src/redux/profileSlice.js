import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProfile as ProfileServices } from "../services/profileServices";
import { updateProfile as UpdateProfileServices } from "../services/profileServices";
import { getAccountByKey as getAccountByKeyServices } from "../services/profileServices";

export const getProfileInfor = createAsyncThunk("get-profile", async (_, {getState}) => {
  const user = getState().authen.user;
  const response = await ProfileServices(user);
  return response;
});
// export const updateProfileInfo = createAsyncThunk(
//   "update-budgets",
//   async (userData, { dispatch }) => {
//     const response = await UpdateProfileServices(userData);
//     await dispatch(getProfileInfor());
//     return response;
//   }
// );

export const getAccountByKey = createAsyncThunk(
  "get-account-by-key",
  async (key) => {
    const response = await getAccountByKeyServices(key);
    return response;
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
