import { useMutation } from "@tanstack/react-query";
import APIClient from "../services/api-client";
import User from "../entities/User";
import { AxiosError } from "axios";
import useAuthStore from "../store/authStore";

const apiClient = new APIClient<User>("/users");

const useUpdateUser = (userId: string, postSuccessFuncs?: () => void) => {
  const setUser = useAuthStore((s) => s.setUser);
  return useMutation<User, Error, User>({
    mutationFn: (updatedUser: User) =>
      apiClient.patch(userId,updatedUser).then((res) => res),
    onSuccess: (savedUser, updatedUser) => {
      if (postSuccessFuncs) postSuccessFuncs();
      setUser(savedUser)
    },
    onError: (error, newUser, context) => {
      console.log(error)
    },
  });
};

export default useUpdateUser;
