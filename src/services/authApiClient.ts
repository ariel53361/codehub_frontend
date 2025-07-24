import axiosInstance from "./axiosInstance";
import { User } from "../entities/User";
import { Credentials } from "../hooks/useLogin";

class AuthAPIClient {
  createUser = (newUser: FormData) => {
    return axiosInstance.post("auth/users/", newUser).then((res) => res.data);
  };

  login = (credentials: Credentials) => {
    return axiosInstance
      .post("auth/jwt/create/", credentials)
      .then((res) => res.data);
  };

  refresh = () => {
    return axiosInstance.post("auth/jwt/refresh/").then((res) => res.data);
  };
  
  getCurrentUser = () => {
    return axiosInstance.get<User>("auth/users/me/").then((res) => res.data);
  };
}

export default AuthAPIClient;
