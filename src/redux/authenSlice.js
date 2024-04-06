import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authenServices from "../services/authenServices";
import { toast } from "react-toastify";

export const signin = createAsyncThunk("signin", async (token) => {
  const response = await authenServices.signin(token);
  return response;
});

const authenSlice = createSlice({
  name: "authen",
  initialState: {
    user: sessionStorage.getItem("user")
      ? JSON.parse(sessionStorage.getItem("user"))
      : null,
  },
  reducers: {
    signOut: (state, action) => {
      state.user = null;
      sessionStorage.removeItem("user");
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signin.fulfilled, (state, action) => {
        console.log("done");
        const user = action.payload;
        if (user == null) {
          const { message } = action.payload;
          toast.warning(message);
        } else {
          state.user = user;
          sessionStorage.setItem("user", JSON.stringify(user));
          toast.success("Đăng nhập thành công");
        }
      })
      .addCase(signin.pending, (state, action) => {
        console.log("pending");
      });
  },
});

export default authenSlice;
