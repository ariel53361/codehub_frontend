import { AxiosError } from "axios";

export interface FetchResponse<T> {
  count: number;
  next: string | null;
  results: T[];
}

export interface ApiError {
  [key: string]: string[];
}

export interface MutationError extends AxiosError<ApiError> {
  messages?: string[];
}
