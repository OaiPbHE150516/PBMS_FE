import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getTransaction as transactionServices } from "../services/transactionServices";
import { getDetailTransaction as transactionDetailServices } from "../services/transactionServices";
import { addTransactionwithoutInvoice as addTransactionwithoutInvoiceServices } from "../services/transactionServices";
import { addInvoiceTransaction as addInvoiceTransactionServices } from "../services/transactionServices";
import { getCollaborator } from "./collaboratorSlice";
import { toast } from "react-toastify";

export const getTransaction = createAsyncThunk(
  "get-transaction",
  async ({ pageNumber, pageSize }) => {
    try {
      const response = await transactionServices(pageNumber, pageSize);
      return response;
    } catch (error) {
      toast.error(error.response.data);
    }
  }
);
export const getDetailTransaction = createAsyncThunk(
  "get-detailtransaction",
  async ({ transactionID }) => {
    try {
      const response = await transactionDetailServices(transactionID);
      return response;
    } catch (error) {
      toast.error(error.response.data);
    }
  }
);
export const addTransactionwithoutInvoice = createAsyncThunk(
  "add-TransactionwithoutInvoice",
  async ({ accountID, fieldValue }, { dispatch }) => {
    try {
      const body = {
        accountID: accountID,
        walletID: fieldValue.walletID,
        categoryID: fieldValue.categoryID,
        totalAmount: fieldValue.totalAmount,
        transactionDate: fieldValue.transactionDate + "Z",
        note: fieldValue.note,
        fromPerson: "",
        toPerson: "",
        imageURL: "",
      };
      const response = await addTransactionwithoutInvoiceServices(body);
      toast.success("Bạn tạo giao dịch mới thành công");
      dispatch(getTransaction({ pageNumber: 1, pageSize: 10 }));
      return response;
    } catch (error) {
      toast.error(error.response.data);
    }
  }
);

export const addTransWithoutInvoice = createAsyncThunk(
  "add-TransWithoutInvoice",
  async ({ user, fieldValue }, { dispatch }) => {
    try {
      const currentDate = new Date();
      currentDate.setHours(currentDate.getHours() + 7);
      const formattedDate = currentDate.toISOString();

      const body = {
        accountID: fieldValue.accountID,
        walletID: fieldValue.walletID,
        categoryID: fieldValue.categoryID,
        totalAmount: fieldValue.totalAmount,
        transactionDate: formattedDate,
        note: fieldValue.note,
        fromPerson: "",
        toPerson: "",
        imageURL: "",
      };
      const response = await addTransactionwithoutInvoiceServices(body);
      toast.success("Bạn tạo giao dịch mới thành công");
      dispatch(getCollaborator(user));
      
      return response;
    } catch (error) {
      toast.error(error.response.data);
    }
  }
);

export const addInvoiceTransaction = createAsyncThunk(
  "add-InvoiceTransaction",
  async ({ accountID, fieldValue, scan }, { dispatch }) => {
    try {
      let productsData = [];
      if (scan && scan.productInInvoices) {
        productsData = scan.productInInvoices.map((product) => ({
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
        transactionDate: fieldValue.transactionDate + "Z",
        note: fieldValue.note,
        fromPerson: "1",
        toPerson: "1",
        imageURL: fieldValue.invoiceImageURL,
        invoice: {
          supplierAddress: fieldValue.supplierAddress,
          supplierName: fieldValue.supplierName,
          supplierPhone: fieldValue.supplierPhone,
          idOfInvoice: "1",
          invoiceDate: fieldValue.transactionDate + "Z",
          netAmount: fieldValue.netAmount,
          totalAmount: fieldValue.totalAmount,
          taxAmount: fieldValue.taxAmount,
          invoiceImageURL: fieldValue.invoiceImageURL,
          products: productsData,
        },
      };
      const response = await addInvoiceTransactionServices(body);
      toast.success("Bạn tạo mới giao dịch thành công")
      dispatch(getTransaction({ pageNumber: 1, pageSize: 10 }));
      return response;
    } catch (error) {
      toast.error(error.response.data);
    }
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
