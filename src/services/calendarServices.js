import axios from "axios";
import { API } from "../constants";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const getCalendars = async (month, year) => {
//   const user = JSON.parse(sessionStorage.getItem("user"));
  const response = await axios.get(
    // API.MANAGE_CALENDAR + `/api/transaction/get/calendar/${user.accountID}/${month}/${year}`
    API.MANAGE_CALENDAR + `/api/transaction/get/calendar/117911566377016615313/${month}/${year}`
  );
  console.log(response);
  return response.data;
};
