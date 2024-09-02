import { useMutation } from "@tanstack/react-query";
import APIClient from "../services/api-client";
import User from "../entities/User";
import { AxiosError } from "axios";

const apiClient = new APIClient<User>("/users");

const useUpdateUser = (userId: string, postSuccessFuncs?: () => void) => {
  return useMutation<User, AxiosError, User>({
    mutationFn: (updatedUser: User) =>
      apiClient.patch(userId,updatedUser).then((res) => res),
    onSuccess: (savedUser, updatedUser) => {
      if (postSuccessFuncs) postSuccessFuncs();
    },
    onError: (error, newUser, context) => {},
  });
};

export default useUpdateUser;
