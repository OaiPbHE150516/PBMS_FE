import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getBudgets as budgetServices } from "../services/budgetServices";
import { addBudgets as addBudgetServices } from "../services/budgetServices";
import { updateBudgets as updateBudgetServices } from "../services/budgetServices";
import { removeBudgets as removeBudgetServices } from "../services/budgetServices";
import { updateCategoryOfBudget as updateCategoryBudgetServices } from "../services/budgetServices";
export const getBudgets = createAsyncThunk(
  "get-budgets",
  async (_, { getState }) => {
    const user = getState().authen.user;
    const response = await budgetServices(user);
    return response;
  }
);

const getBudgetId = (period) => {
  switch (period) {
    case "week":
      return 1;
    case "month":
      return 2;
    case "other":
      return 0;
    default:
      throw new Error("Invalid period");
  }
};

export const addBudgets = createAsyncThunk(
  "add-budgets",
  async ({ fieldValue }, { dispatch }) => {
    const body = {
      accountID: fieldValue.accountID,
      budgetName: fieldValue.budgetName,
      targetAmount: fieldValue.targetAmount,
      beginDate: new Date(fieldValue.fromPeriod).toISOString(),
      endDate: new Date(fieldValue.toPeriod).toISOString(),
      budgetTypeID: getBudgetId(fieldValue.period),
      repeatInterVal: fieldValue.repeat ? fieldValue.numberIterations : 0,
      note: fieldValue.note,
      createTime: new Date().toISOString(),
      categoryIDs: fieldValue.category.map((item) => item.value),
    };
    const response = await addBudgetServices(body);
    await dispatch(getBudgets());
    return response;
  }
);

export const updateBudgets = createAsyncThunk(
  "update-budgets",
  async ({ fieldValue }, { dispatch }) => {
    const bodyCate = {
      accountID: fieldValue.accountID,
      budgetID: fieldValue.budgetID,
      categoryIDs: fieldValue.categories.map((item) => item.value),
    };
    await updateCategoryBudgetServices(bodyCate);
    
    const body = {
      accountID: fieldValue.accountID,
      budgetID: fieldValue.budgetID,
      budgetName: fieldValue.budgetName,
      targetAmount: fieldValue.targetAmount,
      note: fieldValue.note,
    };
    console.log("body", body)
    await updateBudgetServices(body);
    await dispatch(getBudgets());
  }
);

// export const updateCategoryBudget = createAsyncThunk(
//   "update-category-budgets",
//   async ({fieldValue}, { dispatch }) => {
//     const body = {
//       accountID: fieldValue.accountID,
//       budgetID: fieldValue.budgetID,
//       categoryIDs: fieldValue.cagegories.mapp(item => item.categoryID),
//     };
//     const response = await updateCategoryBudgetServices(body);
//     await dispatch(getBudgets());
//     return response;
//   }
// );

export const removeBudgets = createAsyncThunk(
  "remove-budgets",
  async ({ budgetID, accountID }, { dispatch }) => {
    const response = await removeBudgetServices(budgetID, accountID);
    await dispatch(getBudgets());
    return response;
  }
);

const budgetSlice = createSlice({
  name: "budget",
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
      .addCase(getBudgets.fulfilled, (state, action) => {
        state.values = action.payload;
      })
      .addCase(getBudgets.rejected, (state, action) => {
        console.log("rejected get budgets");
      });
  },
});

export default budgetSlice;
