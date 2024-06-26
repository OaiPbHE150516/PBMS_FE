import { createAsyncThunk ,createSlice} from "@reduxjs/toolkit";
import { scanInvoice as scanInvoiceServices } from "../services/scanInvoiceServices";
import { toast } from "react-toastify";

export const getInvoiceScan = createAsyncThunk("get-invoicescan", async (image) => {
  try {
    const formData = new FormData();
    formData.append("file", image);
    const response = await scanInvoiceServices(formData);
    return response.data;
  } catch (error) {
    toast.error(error.response.data)
  }
});
const scanInvoiceSlice = createSlice({
  name: "scan",
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
      .addCase(getInvoiceScan.fulfilled, (state, action) => {
        state.values = action.payload;
      })
      .addCase(getInvoiceScan.rejected, (state, action) => {
        console.log("rejected");
      })
  },
});

export default scanInvoiceSlice;