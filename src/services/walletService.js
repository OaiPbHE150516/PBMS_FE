import axios from "axios";
import { API } from "../constants";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const getWallets = async () => {
  const response = await axios.get(
    API.MANAGE_WALLET + "/api/wallet/get/account/117911566377016615313"
  );
  console.log(response);
  return response.data;
};
export const getTotalWallets = async () => {
  const response = await axios.get(
    API.MANAGE_WALLET + "/api/wallet/get/total-amount/117911566377016615313"
  );
  console.log(response);
  return response.data;
};