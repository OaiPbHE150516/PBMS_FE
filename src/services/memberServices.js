import axios from "axios";
import { API } from "../constants";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const getMembersOfCollab = async (collabID) => {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const response = await axios.get(
    API.MANAGE_BUDGET + `/api/collabfund/get/member/${collabID}/${user.accountID}`
  );
  console.log(response);
  return response.data;
};
