import axios from "axios";
import { API } from "../constants";

const config = {
    headers: {
      'Content-Type': 'application/json', // Set the content type to text/plain
      // Add other headers if needed
    },
  };

const signin = async(token) => {
    const response = await axios.post(API.AUTHEN.SIGN_IN, token, config);
    console.log(response);
    return response.data;
};

export default {
    signin,
};