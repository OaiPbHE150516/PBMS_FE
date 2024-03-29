import axios from "axios";
import { API } from "../constants";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const get7LastTransaction = async () => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    const response = await axios.get(
      API.MANAGE_TRANSACTION + `/api/transaction/get/daybyday/last7/${user.accountID}`
    );
    console.log(response);
    return response.data;
  };
