import axios from "axios";
import { API } from "../constants";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const getInforDivide = async (collabFundID) => {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const response = await axios.get(
    API.MANAGE_COLLABORATOR +
      `/api/collabfund/get/divide-money-info/${collabFundID}/${user.accountID}`
  );
  console.log(response);
  return response.data;
};

export const addDivideMoney = async (body) => {
  debugger
  try {
    const response = await axios.post(
      API.MANAGE_COLLABORATOR + `/api/collabfund/divide-money`,
      body
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error adding divide money:", error);
    throw error; 
  }
};
