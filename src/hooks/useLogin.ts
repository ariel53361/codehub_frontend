import useAuthStore from "../store/authStore";
import { useMutation } from "@tanstack/react-query";
import AuthAPIClient from "../services/authApiClient";
import { ApiError } from "../services/apiTypes";
import { AxiosError } from "axios";

export interface Credentials {
  username: string;
  password: string;
}

const authApiClient = new AuthAPIClient();

const useLogin = (postSuccessFunc?: () => void) => {
  const setAccessToken = useAuthStore((s) => s.setAccessToken);
  const fetchUser = useAuthStore((s) => s.fetchUser);

  return useMutation<void, AxiosError<ApiError>, Credentials>({
    mutationFn: (credentials) => {
      return authApiClient.login(credentials).then((accessToken: string) => {
        setAccessToken(accessToken);
        return fetchUser();
      });
    },
    onSuccess: () => {
      if (postSuccessFunc) postSuccessFunc();
    },
    onError: () => {
      setAccessToken("");
    },
  });
};

export default useLogin;
