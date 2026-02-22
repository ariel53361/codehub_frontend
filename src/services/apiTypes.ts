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

export interface SetPasswordPayload {
  current_password: string;
  new_password: string;
  re_new_password: string;
}
