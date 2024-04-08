import axios from "axios";
import { API } from "../constants";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const get7LastTransaction = async (user) => {
  if (!user) return [];
  const response = await axios.get(
    API.MANAGE_TRANSACTION +
      `/api/transaction/get/daybyday/last7/${user.accountID}`
  );
  console.log(response);
  return response.data;
};

export const getMostTransaction = async (user, number) => {
  if (!user) return [];
  const response = await axios.get(
    API.MANAGE_TRANSACTION +
      `/api/transaction/get/recently/${user.accountID}/${number}`
  );
  console.log(response);
  return response.data;
};
