import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { coverImage as CoverImageServices } from "../services/coverImageServices";

export const coverImage = createAsyncThunk(
  "cover-image",
  async ({ fileImg }) => {
    const response = await CoverImageServices(fileImg);
    return response;
  }
);

const coverImageSlice = createSlice({
  name: "coverImage",
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
      .addCase(coverImage.fulfilled, (state, action) => {
        state.values = action.payload;
      })
      .addCase(coverImage.rejected, (state, action) => {
        console.log("rejected get cover image");
      });
  },
});

export default coverImageSlice;
