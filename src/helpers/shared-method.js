import { tokens } from "./constants";

export const clearFormDta = (reset) => {
  return reset("", {
    keepValues: false,
  });
};

export const isDisable = (email) => {
  return email !== localStorage.getItem(tokens.EMAIL) ? true : false;
};

export const convertBooleanValue = (booleanFields, watch) => {
  return booleanFields?.reduce((acc, field) => {
    acc[field] = watch(field) === "Yes";
    return acc;
  }, {});
};

export const getCurrentDateTime = (date) => {
  const currentDateTime = new Date(date);

  const year = currentDateTime.getFullYear();
  const month = (currentDateTime.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-indexed
  const day = currentDateTime.getDate().toString().padStart(2, "0");
  const hours = currentDateTime.getHours().toString().padStart(2, "0");
  const minutes = currentDateTime.getMinutes().toString().padStart(2, "0");
  const seconds = currentDateTime.getSeconds().toString().padStart(2, "0");

  const formattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;

  return formattedDateTime;
};

export const getSearchQuery = (search) => {
  const searchParams = new URLSearchParams(search);
  return searchParams.get("search");
};
