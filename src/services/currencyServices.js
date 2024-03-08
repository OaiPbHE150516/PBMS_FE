import axios from "axios";
import { API } from "../constants";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

const currencyServices = {
  getCurrency: async () => {
    const response = await axios.get(
      API.MANAGE_CURRENCY + "/api/currency/get"
    );
    console.log(response);
    return response.data;
  },
};
export default currencyServices;
