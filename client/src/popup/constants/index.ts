/* --- Server --- */
export const SERVER_BASE = "http://localhost:4000";
export const SERVER = SERVER_BASE + "/api/v1";

/* --- JSON Placeholder URL --- */
export const JSON_PLACEHOLDER_URL =
  "https://jsonplaceholder.typicode.com/users";

/* --- Application Routes --- */
export const URL = {
  HOME: "/",
  DASHBOARD: {
    HOME: "/dashboard",
  },
};

/* --- Requests --- */
export const REQ = {
  USER: {
    EXISTS: SERVER + "/user/exists",
    GET_ALL_PAGINATED: SERVER + "/user/paginated",
    CREATE: SERVER + "/user",
  },
};

/* --- Messages --- */
export const MESSAGE = {
  ERROR: {
    REQUIRED_FIELDS: "Please fill all the required fields",
  },
  SUCCESS: {
    REQUEST_FULFILLED: "Data submitted successfully",
  },
};

/* --- Indexed DB Config --- */
export const INDEXED_DB_NAME = "extension-indexed-db";
export const OBJECT_STORE_INDEXED_DB = "extension-store";
