import axios from "axios";
import { API } from "../constants";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};
export const getTransaction = async (pageNumber,pageSize) => {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const response = await axios.get(
    API.MANAGE_TRANSACTION + `/api/transaction/get/${user.accountID}/${pageNumber}/${pageSize}`
  );
  console.log(response);
  return response.data;
};
export const getDetailTransaction = async (transactionID) => {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const response = await axios.get(
    API.MANAGE_TRANSACTION + `/api/transaction/get/${transactionID}/${user.accountID}`
  );
  console.log("Trả về",response);
  return response.data;
};
export const addTransactionwithoutInvoice = async (data) => {
  const response = await axios.post(
    API.MANAGE_TRANSACTION + "/api/transaction/create/withoutinvoice", data
  );
  console.log(response);
  return response.data;
};
export const addInvoiceTransaction = async (data) => {
  const response = await axios.post(
    API.MANAGE_TRANSACTION + "/api/transaction/create", data
  );
  console.log(response);
  return response.data;
};