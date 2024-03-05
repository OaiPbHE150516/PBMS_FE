import axios from "axios";
import { API } from "../constants";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const getBudgets = async () => {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const response = await axios.get(
    API.MANAGE_BUDGET + `/api/budget/get/all/${user.accountID}`
  );
  console.log(response);
  return response.data;
};

export const addBudgets = async (data) => {
  const response = await axios.post(
    API.MANAGE_BUDGET + "/api/budget/create",
    data
  );
  console.log(response);
  return response.data;
};

export const updateBudgets = async (data) => {
  // const response = await axios.post(
  //   API.MANAGE_BUDGET + "/api/budget/creat",
  //   data
  // );
  console.log(data);
  // return response.data;
};

export const removeBudgets = async (budgetID) => {
  const response = await axios.delete(
    API.MANAGE_BUDGET + "/api/budget/delete/budget",
    budgetID
  );
  console.log(response);
  // return response.data;
};
