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
    user: null,
  },
  reducers: {
    signOut: (state, action) => {
      state.user = null;
      sessionStorage.removeItem("user");

      localStorage.removeItem("currentPage");
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signin.fulfilled, (state, action) => {
        console.log("done");
        const user  = action.payload;
        if (user == null) {
          const { message } = action.payload;
          toast.warning(message);
        } else {
          state.user = user;
          sessionStorage.setItem("user", JSON.stringify(user));
          toast.success("Đăng nhập thành công");
        }
      })
      // .addCase(signin.rejected, (state, action) => {
      //   console.log("rejected");
      //   toast.warning("Tài khoản hoặc mật khẩu không chính xác");
      // })
      .addCase(signin.pending, (state, action) => {
        console.log("pending");
      });
  },
});

export default authenSlice;
