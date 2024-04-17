import axios from "axios";
import { API } from "../constants";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const getActionsOfCollab = async (collabID) => {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const response = await axios.get(
    API.MANAGE_COLLABORATOR + `/api/collabfund/get/activity/v2/${collabID}/${user.accountID}`
  );
  console.log(response);
  return response.data;
};

export const addActionsOfCollabNoTrans = async (data) => {
  const response = await axios.post(
    API.MANAGE_COLLABORATOR + `/api/collabfund/create/activity/notrans`,
    data
  );
  console.log(response);
  return response.data;
};

export const addActionsOfCollabWithTrans = async (formData) => {
  const response = await axios.post(
    API.MANAGE_COLLABORATOR + `/api/collabfund/create/activity/withtrans/form`, 
    formData
  );
  console.log(response);
  return response.data;
};

