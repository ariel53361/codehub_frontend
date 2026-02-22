import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import AuthAPIClient from "../services/authApiClient";

interface ResendPayload {
  email: string;
}

const authApiClient = new AuthAPIClient();

const useResendActivation = () => {
  return useMutation<void, AxiosError, ResendPayload>({
    mutationFn: ({ email }) => authApiClient.resendActivationEmail(email),
  });
};

export default useResendActivation;
