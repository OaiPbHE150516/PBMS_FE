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
export const getCategoryByType = createAsyncThunk(
  "get-typecategories",
  async () => {
    try {
      const response = await categoryServices.getCategoryByType();
      return response;
    } catch (error) {
      toast.error(error.response.data);
    }
  }
);

export const createCategory = createAsyncThunk(
  "create-category",
  async ({ accountID, fieldValue }, { dispatch }) => {
    try {
      const body = {
        accountID: accountID,
        categoryID: fieldValue.categoryID,
        nameVN: fieldValue.nameVN,
        nameEN: fieldValue.nameVN,
        parentCategoryID: fieldValue.categoryID,
      };
      const response = await createCategoryServices(body);
      toast.success("Bạn tạo mới danh mục thành công");
      dispatch(getCategoryByType());
      return response;
    } catch (error) {
      toast.error(error.response.data);
    }
  }
);
export const updateCategory = createAsyncThunk(
  "update-category",
  async ({ accountID, categoryID, fieldValue }, { dispatch }) => {
    try {
      const updatedParentCategoryID = fieldValue.parentCategoryID
        ? fieldValue.parentCategoryID
        : categoryID;
      const body = {
        accountID: accountID,
        categoryID: categoryID,
        nameVN: fieldValue.nameVN,
        nameEN: fieldValue.nameVN,
        parentCategoryID: updatedParentCategoryID,
      };
      const response = await updateCategoryServices(body);
      toast.success("Bạn đã chỉnh sửa thành công");
      dispatch(getCategoryByType());
      return response;
    } catch (error) {
      toast.error(error.response.data);
    }
  }
);
export const deleteCategory = createAsyncThunk(
  "delete-category",
  async ({ accountID, categoryID }, { dispatch }) => {
    try {
      const response = await deleteCategoryServices(categoryID, accountID);
      toast.success("Bạn đã xoá thành công");
      dispatch(getCategoryByType());
      return response;
    } catch (error) {
      toast.error(error.response.data);
    }
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
