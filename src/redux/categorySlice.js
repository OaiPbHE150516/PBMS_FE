import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import categoryServices from "../services/categoryServices";
import { createCategory as createCategoryServices } from "../services/categoryServices";
import { updateCategory as updateCategoryServices } from "../services/categoryServices";
import { deleteCategory as deleteCategoryServices } from "../services/categoryServices";

export const getCategories = createAsyncThunk("get-categories", async () => {
  const response = await categoryServices.getCategories();
  return response;
});
export const getCategoryByType = createAsyncThunk("get-typecategories", async () => {
  const response = await categoryServices.getCategoryByType();
  return response;
});

export const createCategory = createAsyncThunk(
  "create-category",
  async ({ accountID, fieldValue }, { dispatch }) => {
    const body = {
      accountID: accountID,
      categoryID: fieldValue.categoryID,
      nameVN: fieldValue.nameVN,
      nameEN: fieldValue.nameVN,
      parentCategoryID: fieldValue.categoryID,
    };
    console.log(body);
    const response = await createCategoryServices(body);
    dispatch(getCategoryByType());
    return response;
  }
);
export const updateCategory = createAsyncThunk(
  "update-category",
  async ({ accountID,categoryID, fieldValue }, { dispatch }) => {
    const updatedParentCategoryID = fieldValue.parentCategoryID ? fieldValue.parentCategoryID : categoryID;
    const body = {
      accountID: accountID,
      categoryID: categoryID,
      nameVN: fieldValue.nameVN,
      nameEN: fieldValue.nameVN,
      parentCategoryID: updatedParentCategoryID,
    };
    console.log(body);
    const response = await updateCategoryServices(body);
    dispatch(getCategoryByType());
    return response;
  }
);
export const deleteCategory = createAsyncThunk(
  "delete-category",
  async ({ accountID,categoryID}, { dispatch }) => {
    const response = await deleteCategoryServices(categoryID, accountID);
    dispatch(getCategoryByType());
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
    builder
      .addCase(getCategories.fulfilled, (state, action) => {
        state.values = action.payload;
      })
      .addCase(getCategories.rejected, (state, action) => {
        console.log("rejected get categories");
      })
      .addCase(getCategoryByType.fulfilled, (state, action) => {
        state.values = action.payload;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        console.log("done create category");
        toast.success("Create category success");
      });
  },
});

export default categorySlice;
