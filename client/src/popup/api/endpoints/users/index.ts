import { callGet, callPost } from "@api/integrations/calls";
import { REQ } from "@constants/index";
import { IUser } from "@interfaces/index";

export const isUsersExistInDBEndpoint = async () => {
  return await callGet(REQ.USER.EXISTS, "");
};

export const getPaginatedUsersEndpoint = async (page: number) => {
  return await callGet(
    `${REQ.USER.GET_ALL_PAGINATED}?page=${page}&limit=25`,
    ""
  );
};

export const createUserEndpoint = async (data: IUser) => {
  return await callPost(REQ.USER.CREATE, data, "");
};
