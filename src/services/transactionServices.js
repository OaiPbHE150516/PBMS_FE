import axios from "axios";
import { API } from "../constants";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const getTransaction = async () => {
  const response = await axios.get(
    API.MANAGE_TRANSACTION + "/api/transaction/get/account/a1"
  );
  console.log(response);
  return response.data;
};
