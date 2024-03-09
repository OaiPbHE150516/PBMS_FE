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
    API.MANAGE_COLLABORATOR + `/api/collabfund/get/activity/${collabID}/${user.accountID}`
  );
  console.log(response);
  return response.data;
};
