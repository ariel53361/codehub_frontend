export interface FetchResponse<T> {
  count: number;
  next: string | null;
  results: T[];
}

export interface ApiError {
  [key: string]: string[];
}

export interface ActivationPayload {
  uid: string;
  token: string;
}
