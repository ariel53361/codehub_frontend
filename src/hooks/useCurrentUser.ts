import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../services/api-client";
import User from "../entities/User";
import { AxiosError } from "axios";


const useCurrentUser = (postSuccessFuncs?: () => void) => {
  return useMutation<User, AxiosError>({
    mutationFn: () =>
      axiosInstance.get("codehub/auth/users/me/",).then((res) => res.data),
    onSuccess: () => {
      if (postSuccessFuncs) postSuccessFuncs();
    },
    onError: (error, user, context) => {},
  });
};

export default useCurrentUser;
