import { ApiError } from "../services/apiTypes";

export function isApiError(error: any): error is ApiError {
  if (typeof error !== "object" || error === null) {
    return false;
  }

  const errorValues = Object.values(error);
  return errorValues.every((value) => {
    if (!Array.isArray(value)) {
      return false;
    }

    return value.every((message) => typeof message === "string");
  });
}
