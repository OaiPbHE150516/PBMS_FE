import { createAsyncThunk ,createSlice} from "@reduxjs/toolkit";
import { fileInvoiceName as fileInvoiceNameServices } from "../services/fileServices";
import { toast } from "react-toastify";

export const fileInvoiceName = createAsyncThunk("get-fileinvoice", async (formData) => {
  try {
    const response = await fileInvoiceNameServices(formData);
    return response.data;
  } catch (error) {
    toast.error(error.response.data)
  }
});
const fileSlice = createSlice({
  name: "filescan",
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
      .addCase(fileInvoiceName.fulfilled, (state, action) => {
        state.values = action.payload;
      })
      .addCase(fileInvoiceName.rejected, (state, action) => {
        console.log("file rejected");
      })
  },
});

export default fileSlice;