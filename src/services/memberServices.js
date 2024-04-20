import axios from "axios";
import { API } from "../constants";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const getMembersOfCollab = async (collabID, user) => {
  const response = await axios.get(
    API.MANAGE_COLLABORATOR +
      `/api/collabfund/get/member/typebytype/${collabID}/${user.accountID}`
  );
  console.log(response);
  return response.data;
};

export const acceptToCollab = async (collabFundID, accountMemberID) => {
  const response = await axios.put(
    API.MANAGE_COLLABORATOR + `/api/collabfund/accept`,
    { collabFundID, accountMemberID }
  );
  console.log(response);
  return response.data;
};

export const declineToCollab = async (collabID, accID) => {
  const response = await axios.put(
    API.MANAGE_COLLABORATOR + `/api/collabfund/decline`,
    { data: { collabID, accID } }
  );
  console.log(response);
  return response.data;
};

export const invitationToCollab = async (data) => {
  const response = await axios.delete(
    API.MANAGE_COLLABORATOR + `/api/collabfund/delete/invitation`,
    data
  );
  console.log(response);
  return response.data;
};

export const searchMembersByKey = async (key) => {
  const response = await axios.get(
    API.MANAGE_COLLABORATOR + `/api/profile/search/${key}`
  );
  console.log(response);
  return response.data;
};

export const addMemberToCollab = async (body) => {
  const response = await axios.post(
    API.MANAGE_COLLABORATOR + `/api/collabfund/invite`,
    body
  );
  console.log(response);
  return response.data;
};
