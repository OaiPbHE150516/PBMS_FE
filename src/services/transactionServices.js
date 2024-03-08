import axios from "axios";
import { API } from "../constants";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};
export const getTransaction = async () => {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const response = await axios.get(
    API.MANAGE_TRANSACTION + `/api/transaction/get/${user.accountID}/1/10`
  );
  console.log(response);
  return response.data;
};
