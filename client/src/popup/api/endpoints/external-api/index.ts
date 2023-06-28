import { callGet } from "@api/integrations/calls";
import { JSON_PLACEHOLDER_URL } from "@constants/index";

export const getUsersDataFromExternalAPIEndpoint = async () => {
  return await callGet(JSON_PLACEHOLDER_URL, "");
};
