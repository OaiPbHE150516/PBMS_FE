import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import categoryServices from "../services/categoryServices";

export const getCategories = createAsyncThunk("get-categories", async () => {
  const response = await categoryServices.getCategories();
  return response;
});

// middleware to create a category
export const createCategory = createAsyncThunk(
  "create-category",
  async (category) => {
    const response = await categoryServices.createCategory(category);
    return response;
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState: {
    values: [],
  },
  reducers: {
    setValues: (state, action) => {
      state.values = action.payload;
    },
  },
  extraReducers: (builder) => {
    // response from middleware
    builder
      .addCase(getCategories.fulfilled, (state, action) => {
        state.values = action.payload;
      })
      .addCase(getCategories.rejected, (state, action) => {
        console.log("rejected get categories");
      })
      // add case for create category
      .addCase(createCategory.fulfilled, (state, action) => {
        console.log("done create category");
        toast.success("Create category success");
      });
  },
});

export default categorySlice;
