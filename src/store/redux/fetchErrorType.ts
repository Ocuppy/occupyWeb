import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

const isFetchBaseQueryErrorType = (
  error: any,
): error is FetchBaseQueryError => {
  return (
    error &&
    typeof error === "object" &&
    "data" in error &&
    typeof error.data === "object" &&
    error.data !== null
  );
};

 

export default isFetchBaseQueryErrorType;
