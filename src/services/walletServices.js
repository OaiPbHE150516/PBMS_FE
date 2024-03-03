import axios from "axios";
import { API } from "../constants";

const config = {
    headers: {
      'Content-Type': 'application/json', // Set the content type to text/plain
      // Add other headers if needed
    },
  };

export const getWallet = async() => {
    const response = await axios.get(API.MANAGE_WALLET + "/api/wallet/get/account/117911566377016615313");
    console.log(response);
    return response.data;
};
export const getTotalWallet = async() => {
  const response = await axios.get(API.MANAGE_WALLET + "/api/wallet/get/total-amount/a1");
  console.log(response);
  return response.data;
};
// const addValues = async(value) => {
//     const response = await axios.post(API.MANAGE_VALUE + "/add", value, config);
//     console.log(response);
//     return response.data;
// };

