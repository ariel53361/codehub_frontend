import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../services/api-client";
import User from "../entities/User";
import PostUser from "../entities/PostUser";
import { Axios, AxiosError } from "axios";

const useCreateUser = (postSuccessFuncs?: () => void) => {
  return useMutation<User, AxiosError, PostUser>({
    mutationFn: (newUser: PostUser) =>
      axiosInstance.post("auth/users/", newUser).then((res) => res.data),
    onSuccess: (savedUser, newUser) => {
      if (postSuccessFuncs) postSuccessFuncs();
    },
    onError: (error, newUser, context) => {},
  });
};

export default useCreateUser;
