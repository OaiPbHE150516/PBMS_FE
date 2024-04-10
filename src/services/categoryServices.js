import axios from "axios";
import { API } from "../constants";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

const categoryServices = {
  getCategories: async () => {
    // const user = JSON.parse(sessionStorage.getItem("user"));
    const response = await axios.get(
      API.MANAGE_CATEGORY + "/api/category/get/default"
      //  + user.accountID
    );
    console.log(response);
    return response.data;
  },
  createCategory: async (category) => {
    const response = await axios.post(
      API.MANAGE_CATEGORY + "/api/category/create",
      category,
      config
    );
    console.log(response);
    return response.data;
  },
};
export default categoryServices;
