export const capitalizeString = (text: string) => {
  return text && text.length > 2
    ? text.charAt(0).toUpperCase() + text.slice(1)
    : "";
};

export const onTimeout = async (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
