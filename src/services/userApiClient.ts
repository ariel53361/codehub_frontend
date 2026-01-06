import axiosInstance from "./axiosInstance";
import { User, UserPayload } from "../entities/User";

class UserAPIClient {
  createUser = (newUser: UserPayload) => {
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
