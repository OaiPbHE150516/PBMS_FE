import axios from "axios";
import { API } from "../constants";

const config = {
    headers: {
      'Content-Type': 'application/json', // Set the content type to text/plain
      // Add other headers if needed
    },
  };

const getValues = async() => {
    const response = await axios.get(API.MANAGE_VALUE);
    console.log(response);
    return response.data;
};

const addValues = async(value) => {
    const response = await axios.post(API.MANAGE_VALUE + "/add", value, config);
    console.log(response);
    return response.data;
};


export default {
    getValues , addValues
};