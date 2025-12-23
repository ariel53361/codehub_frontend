import axiosInstance from "./axiosInstance";
import { Credentials } from "../hooks/useLogin";

class AuthAPIClient {
  login = (credentials: Credentials) => {
    return axiosInstance
      .post("auth/jwt/create/", credentials)
      .then((res) => res.data);
  };

  refresh = () => {
    return axiosInstance.post("auth/jwt/refresh/").then((res) => res.data);
  };
}

export default AuthAPIClient;
