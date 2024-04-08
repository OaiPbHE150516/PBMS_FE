import axios from "axios";
import { API } from "../constants";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const getProfile = async () => {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const response = await axios.get(
    API.MANAGE_PROFILE + `/api/profile/get/${user.accountID}`
  );
  console.log(response);
  return response.data;
};

export const updateProfile = async (data) => {
  const response = await axios.post(
    API.MANAGE_PROFILE + "/api/profile/update",
    data
  );
  console.log(data);
  return response.data;
};

export const getAccountByKey = async (key) => {
  const response = await axios.post(
    API.MANAGE_PROFILE + `/api/profile/search/${key}`,
  );
  console.log(response);
  return response.data;
};

