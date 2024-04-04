import axios from "axios";
import { API } from "../constants";

export const fileInvoiceName = async (formData) => {
  try {
    const response = await axios.post(API.SCAN_INVOICE+"/api/file/upload/transaction/invoice/filename",formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response);
    return response; 
  } catch (error) {
    throw error; 
  }
};
