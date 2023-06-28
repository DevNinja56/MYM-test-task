import { parseError } from "@api/integrations/errors";
import axios from "axios";

export const callEndpoint = async (
  url: string,
  method: string,
  data: object,
  token: string
) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    accept: "application/json",
    audience: window.location.origin,
    "Content-Type": "application/json",
    Authorization: "",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await axios({
    url: url,
    method: method,
    data: data,
    headers: headers,
  })
    .then((res) => res.data)
    .catch((error) => parseError(error));

  return res;
};

export const callDelete = async (url: string, data: object, token: string) => {
  return callEndpoint(url, "delete", data, token);
};

export const callGet = async (url: string, token: string) => {
  return callEndpoint(url, "get", {}, token);
};

export const callPost = async (url: string, data: object, token: string) => {
  return callEndpoint(url, "post", data, token);
};

export const callPut = async (url: string, data: object, token: string) => {
  return callEndpoint(url, "put", data, token);
};
