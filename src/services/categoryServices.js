import axios from "axios";
import { API } from "../constants";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};
export const createCategory = async (data) => {
  const response = await axios.post(
    API.MANAGE_CATEGORY + "/api/category/create",
    data
  );
  console.log(response);
  return response.data;
};
export const updateCategory = async (data) => {
  const response = await axios.put(
    API.MANAGE_CATEGORY + "/api/category/update",
    data
  );
  console.log(response);
  return response.data;
};
export const deleteCategory = async (categoryID, accountID) => {
  const response = await axios.delete(
    API.MANAGE_CATEGORY + `/api/category/delete/${categoryID}/${accountID}`
  );
  console.log(response);
  return response.data;
};

const categoryServices = {
  getCategories: async () => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    const response = await axios.get(
      API.MANAGE_CATEGORY + "/api/category/get/" + user.accountID
    );
    console.log(response);
    return response.data;
  },
  getCategoryByType: async () => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    const response = await axios.get(
      API.MANAGE_CATEGORY + "/api/category/get/typebytype/" + user.accountID
    );
    console.log(response);
    return response.data;
  },
};
export default categoryServices;
