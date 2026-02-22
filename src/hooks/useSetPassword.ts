import { useMutation } from "@tanstack/react-query";
import AuthAPIClient from "../services/authApiClient";
import { SetPasswordFormValues } from "../forms/UserProfileFormValues";
import { AxiosError } from "axios";
import { ApiError } from "../services/apiTypes";

const authApiClient = new AuthAPIClient();

const useSetPassword = () => {
  return useMutation<void, AxiosError<ApiError>, SetPasswordFormValues>({
    mutationFn: (payload) => authApiClient.setPassword(payload),
  });
};

export default useSetPassword;
