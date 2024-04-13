import axios from "axios";
import { API } from "../constants";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const coverImage = async (fileImg) => {
  var formData = new FormData();
  formData.append("file", fileImg);
  console.log("Services", fileImg);
  const response = await axios.post(
    API.COVER_IMAGE + `/api/file/upload/collabfund/imagecover`,
    formData
  );
  console.log(response);
  return response.data;
};
