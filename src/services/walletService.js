import axios from "axios";
import { API } from "../constants";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

const getTotalWallets = async () => {
  const response = await axios.get(
    API.MANAGE_BUDGET + "/total-amount/117911566377016615313"
  );
  console.log(response);
  return response.data;
};

export default {
  getBudgets,
};
