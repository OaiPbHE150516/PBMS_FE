import axios from "axios";
import { API } from "../constants";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const getBalanceHistory = async (user) => {
  if (!user) return [];
  const response = await axios.get(
    API.BALANCE_HISTORY +
      `/api/balanceHisLogController/get/all/byday/${user.accountID}`
  );
  console.log(response);
  return response.data;
};
