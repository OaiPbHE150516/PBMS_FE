import { createAsyncThunk ,createSlice} from "@reduxjs/toolkit";
import { fileInvoiceName as fileInvoiceNameServices } from "../services/fileServices";

export const fileInvoiceName = createAsyncThunk("get-fileinvoice", async (formData) => {
  try {
    const response = await fileInvoiceNameServices(formData);
    return response.data;
  } catch (error) {
    throw error;
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