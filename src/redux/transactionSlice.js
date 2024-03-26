import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getTransaction as transactionServices } from "../services/transactionServices";
import { addTransactionwithoutInvoice as addTransactionwithoutInvoiceServices } from "../services/transactionServices";
export const getTransaction = createAsyncThunk("get-transaction", async ({ pageNumber, pageSize }) => {
  const response = await transactionServices(pageNumber, pageSize);
  return response;
});
export const addTransactionwithoutInvoice = createAsyncThunk(
  "add-TransactionwithoutInvoice",
  async ({ accountID, fieldValue }, { dispatch }) => {
    const body = {
      accountID: accountID,
      walletID: fieldValue.walletID,
      categoryID: fieldValue.categoryID,
      totalAmount: fieldValue.totalAmount,
      transactionDate: fieldValue.transactionDate+'Z',
      note:"",
      fromPerson:"",
      toPerson:"",
      imageURL:"",
    };
    console.log(body);
    const response = await addTransactionwithoutInvoiceServices(body);
    dispatch(getTransaction({ pageNumber: 1, pageSize: 10 }));
    return response;
  }
);

const transactionSlice = createSlice({
  name: "transaction",
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
      .addCase(getTransaction.fulfilled, (state, action) => {
        state.values = action.payload;
      })
      .addCase(getTransaction.rejected, (state, action) => {
        console.log("rejected");
      })
      .addCase(addTransactionwithoutInvoice.fulfilled, (state, action) => {
        console.log("addTransactionwithoutInvoiceServices fulfilled");
        state.values = action.payload; 
      });
  },
});

export default transactionSlice;
