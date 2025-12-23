import axiosInstance from "./axiosInstance";
import { User } from "../entities/User";

class UserAPIClient {
  createUser = (newUser: FormData) => {
    return axiosInstance.post("auth/users/", newUser).then((res) => res.data);
  };

  getCurrentUser = () => {
    return axiosInstance.get<User>("auth/users/me/").then((res) => res.data);
  };

  updateCurrentUser = (data: FormData) => {
    return axiosInstance
      .patch<User>("auth/users/me/", data)
      .then((res) => res.data);
  };
}

export default UserAPIClient;
