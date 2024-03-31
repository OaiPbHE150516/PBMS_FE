import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getInforDivide as getInforDivideServices } from "../services/divideMoneyServices";
import { addDivideMoney as addDivideMoneyServices } from "../services/divideMoneyServices";
import { toast } from "react-toastify";

export const getInforDivide = createAsyncThunk(
  "get-infor-divide",
  async (collabFundID) => {
    try {
      const response = await getInforDivideServices(collabFundID);
      return response;
    } catch (error) {
      toast.error("Failed to fetch information."); 
      throw error;
    }
  }
);

export const addDivideMoney = createAsyncThunk(
  "add-divide-money",
  async ({ accountID, fieldValue }, {dispatch}) => {
    try {
      const body = {
        accountID: accountID,
        collabFundID: fieldValue.collabFundID,
      };
      const response = await addDivideMoneyServices(body);
      toast.success("Money divided successfully."); 
      await dispatch(getInforDivide())
      return response;
    } catch (error) {
      toast.error("Failed to divide money."); 
      throw error;
    }
  }
);

const divideMoneySlice = createSlice({
  name: "collaborator",
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
      .addCase(getInforDivide.fulfilled, (state, action) => {
        state.values = action.payload;
      })
      .addCase(getInforDivide.rejected, (state, action) => {
        console.log("rejected get divide money");
      });
  },
});

export default divideMoneySlice;
