import useAuthStore from "../store/authStore";
import { axiosInstance } from "../services/api-client";
import { useMutation } from "@tanstack/react-query";

interface Tokens {
  access: string;
  refresh: string;
}
interface IdentificationDetails {
  username: string;
  password: string;
}
const useLogin = (postSuccessFuncs?: () => void) => {
  const { setAccessToken, setRefreshToken, fetchUser } = useAuthStore();

  return useMutation<Tokens, Error, IdentificationDetails>({
    mutationFn: (identificationDetails) =>
      axiosInstance
        .post("auth/jwt/create", identificationDetails)
        .then((res) => res.data),
    onSuccess: (tokens, identificationDetails) => {
      setAccessToken(tokens.access);
      setRefreshToken(tokens.refresh);
      fetchUser();
      if (postSuccessFuncs) postSuccessFuncs();
    },
    onError: (error, identificationDetails) => {
      console.log(error.message);
    },
  });
};

export default useLogin;
