import axios from "axios";
import { API } from "../constants";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const coverImage = async (fileImg) => {
  const response = await axios.post(
    API.COVER_IMAGE + `/api/file/upload/collabfund/imagecover`,
    fileImg
  );
  console.log(response);
  return response.data;
};
