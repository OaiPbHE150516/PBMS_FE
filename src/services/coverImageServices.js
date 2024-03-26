import axios from "axios";
import { API } from "../constants";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const coverImage = async () => {
  const response = await axios.get(
    API.COVER_IMAGE + `/api/file/upload/collabfund/imagecover`
  );
  console.log(response);
  return response.data;
};
