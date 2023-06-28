import { toast } from "react-hot-toast";

export const parseError = (error: any) => {
  let message = "Please try again later!";

  if (!error.response) {
    toast.error(message);
    return;
  }

  if (
    error.response.status &&
    (error.response.status === 404 ||
      (error.response.status >= 500 && error.response.status < 600))
  ) {
    return error.response.data;
  }

  if (error && error.response && error.response.data) {
    message = error.response.data.message;
  } else if (error) {
    message = error;
  }

  if (message) {
    toast.error(message);
  }
};
