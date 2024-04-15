import axios from "axios";
import { API } from "../constants";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const getBudgets = async (user) => {
  if (!user) return [];
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
  const response = await axios.put(
    API.MANAGE_BUDGET + "/api/budget/update",
    data
  );
  return response.data;
};

export const updateCategoryOfBudget = async (data) => {
  const response = await axios.put(
    API.MANAGE_BUDGET + "/api/budget/update/category",
    data
  );
  return response.data;
};

export const removeBudgets = async (budgetID, accountID) => {
  const response = await axios.delete(
    API.MANAGE_BUDGET + "/api/budget/delete/budget",
    { data: { budgetID, accountID } }
  );
  return response.data;
};
