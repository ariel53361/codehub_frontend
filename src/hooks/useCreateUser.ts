import { useMutation } from "@tanstack/react-query";
import { User } from "../entities/User";
import AuthAPIClient from "../services/authApiClient";
import { ApiError } from "../services/apiTypes";
import { AxiosError } from "axios";

const authApiClient = new AuthAPIClient();

const useCreateUser = (postSuccessFunc?: () => void) => {
  return useMutation<User, AxiosError<ApiError>, FormData>({
    mutationFn: (newUser) => authApiClient.createUser(newUser),
    onSuccess: () => {
      if (postSuccessFunc) postSuccessFunc();
    },
  });
};

export default useCreateUser;
