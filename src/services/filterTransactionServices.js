import axios from "axios";
import { API } from "../constants";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const getTransactionLastMonth = async (month, year, user) => {
  if (!user) return ;
  const response = await axios.get(
    API.MANAGE_TRANSACTION +
      `/api/transaction/get/filter/type/${month}/${year}/${user.accountID}`
  );
  console.log(response);
  return response.data;
};

export const getTransactionThisMonth = async (month, year, user) => {
    if (!user) return ;
    const response = await axios.get(
      API.MANAGE_TRANSACTION +
        `/api/transaction/get/filter/type/${month}/${year}/${user.accountID}`
    );
    console.log(response);
    return response.data;
  };
