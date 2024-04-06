import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getTransaction as transactionServices } from "../services/transactionServices";
import { addTransactionwithoutInvoice as addTransactionwithoutInvoiceServices } from "../services/transactionServices";
import { addInvoiceTransaction as addInvoiceTransactionServices } from "../services/transactionServices";

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
      transactionDate: fieldValue.transactionDate + 'Z',
      note: fieldValue.note,
      fromPerson: "",
      toPerson: "",
      imageURL: "",
    };
    console.log(body);
    const response = await addTransactionwithoutInvoiceServices(body);
    dispatch(getTransaction({ pageNumber: 1, pageSize: 10 }));
    return response;
  }
);
export const addInvoiceTransaction = createAsyncThunk(
  "add-InvoiceTransaction",
  async ({ accountID, fieldValue ,scan}, { dispatch }) => {
    let productsData = [];
    if (scan && scan.productInInvoices) {
      productsData = scan.productInInvoices.map(product => ({
        productName: product.productName,
        quanity: product.quanity,
        unitPrice: product.unitPrice,
        totalAmount: product.totalAmount,
        tag: product.tag,
      }));
    }
    const body = {
      accountID: accountID,
      walletID: fieldValue.walletID,
      categoryID: fieldValue.categoryID,
      totalAmount: fieldValue.totalAmount,
      transactionDate: fieldValue.transactionDate + 'Z',
      note: fieldValue.note,
      fromPerson: "1",
      toPerson: "1",
      imageURL: "1",
      invoice: {
        supplierAddress: fieldValue.supplierAddress,
        supplierName: fieldValue.supplierName,
        supplierPhone: fieldValue.supplierPhone,
        idOfInvoice: "1",
        invoiceDate: fieldValue.transactionDate + 'Z',
        netAmount: fieldValue.netAmount,
        totalAmount: fieldValue.totalAmount,
        taxAmount: fieldValue.taxAmount,
        invoiceImageURL: fieldValue.invoiceImageURL,
        products: productsData,
      }
    };
    console.log(body);
    const response = await addInvoiceTransactionServices(body);
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
      })
      .addCase(addInvoiceTransaction.fulfilled, (state, action) => {
        console.log("addInvoiceTransaction fulfilled");
        state.values = action.payload;
      });
  },
});

export default transactionSlice;
