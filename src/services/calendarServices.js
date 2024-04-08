import axios from "axios";
import { API } from "../constants";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const getCalendars = async (month, year, user) => {
  const response = await axios.get(
    API.MANAGE_CALENDAR + `/api/transaction/get/calendar/${user.accountID}/${month}/${year}`
  );
  console.log(response);
  return response.data;
};
