import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../services/api-client";
import User from "../entities/User";
import { AxiosError } from "axios";


const useCurrentUser = (postSuccessFuncs?: () => void) => {
  return useMutation<User, AxiosError, User>({
    mutationFn: (newUser: User) =>
      axiosInstance.get("codehub/auth/users/me/",).then((res) => res.data),
    onSuccess: (savedUser, newUser) => {
      if (postSuccessFuncs) postSuccessFuncs();
    },
    onError: (error, newUser, context) => {},
  });
};

export default useCurrentUser;
