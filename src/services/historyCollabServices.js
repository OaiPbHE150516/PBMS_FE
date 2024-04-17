import axios from "axios";
import { API } from "../constants";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const getHistoryOfCollab = async (collabID, user) => {
  const response = await axios.get(
    API.MANAGE_COLLABORATOR + `/api/collabfund/get/history/divide-money/${collabID}/${user.accountID}`
  );
  console.log(response);
  return response.data;
};
