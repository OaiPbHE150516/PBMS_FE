import axios from "axios";
import { API } from "../constants";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const getWallets = async () => {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const response = await axios.get(
    API.MANAGE_WALLET + `/api/wallet/get/account/${user.accountID}`
  );
  console.log(response);
  return response.data;
};
export const getTotalWallets = async () => {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const response = await axios.get(
    API.MANAGE_WALLET + `/api/wallet/get/total-amount/${user.accountID}`
  );
  console.log(response);
  return response.data;
};
export const addWallet = async (data) => {
  const response = await axios.post(
    API.MANAGE_WALLET + "/api/wallet/create",
    data
  );
  console.log(response);
  return response.data;
};