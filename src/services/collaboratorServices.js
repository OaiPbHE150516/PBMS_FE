import axios from "axios";
import { API } from "../constants";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const getCollaborators = async (user) => {
  const response = await axios.get(
    API.MANAGE_COLLABORATOR + `/api/collabfund/get/all/${user.accountID}`
  );
  console.log(response);
  return response.data;
};

export const addCollaborators = async (data) => {
  const response = await axios.post(
    API.MANAGE_COLLABORATOR + `/api/collabfund/create`,
    data
  );
  console.log(response);
  return response.data;
};
