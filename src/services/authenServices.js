import axios from "axios";
import { API } from "../constants";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

const signin = async (token) => {
  const response = await axios.post(API.AUTHEN.SIGN_IN, token, config);
  console.log(response);
  return response.data;
};

export default {
  signin,
};
