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
      toast.error(error.response.data);
    }
  }
);

export const addDivideMoney = createAsyncThunk(
  "add-divide-money",
  async ({ accountID, fieldValue }, { dispatch }) => {
    try {
      const body = {
        accountID: accountID,
        collabFundID: fieldValue.collabFundID,
      };
      const response = await addDivideMoneyServices(body);
      toast.success("Bạn chia tiền thành công");
      await dispatch(getInforDivide());
      return response;
    } catch (error) {
      toast.error(error.response.data);
    }
  }
);

const divideMoneySlice = createSlice({
  name: "collaborator",
  initialState: {
    listDVMI: [],
    cfdividingmoney_result: [],
    cfdm_detail_result: [],
  },
  reducers: {
    setValues: (state, action) => {
      state.listDVMI = action.payload.listDVMI;
      state.cfdividingmoney_result = action.payload.cfdividingmoney_result;
      state.cfdm_detail_result = action.payload.cfdm_detail_result;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getInforDivide.fulfilled, (state, action) => {
        state.listDVMI = action.payload.listDVMI;
        state.cfdividingmoney_result = action.payload.cfdividingmoney_result;
        state.cfdm_detail_result = action.payload.cfdm_detail_result;
      })
      .addCase(getInforDivide.rejected, (state, action) => {
        console.log("rejected get divide money");
      });
  },
});

export default divideMoneySlice;
