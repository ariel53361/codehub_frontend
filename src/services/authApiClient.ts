import axiosInstance from "./axiosInstance";
import { Credentials } from "../hooks/useLogin";
import { ActivationPayload } from "./apiTypes";

class AuthAPIClient {
  login = (credentials: Credentials) => {
    return axiosInstance
      .post("auth/jwt/create/", credentials)
      .then((res) => res.data);
  };

  refresh = () => {
    return axiosInstance.post("auth/jwt/refresh/").then((res) => res.data);
  };

  activate = (data: ActivationPayload) => {
    return axiosInstance
      .post("auth/users/activation/", data)
      .then(() => undefined);
  };
}

export default AuthAPIClient;
