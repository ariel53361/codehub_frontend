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

// const [isLoading, setIsLoading] = useState(false);
// const [error, setError] = useState<string | null>(null);
// const { setAccessToken, setRefreshToken, fetchUser } = useAuthStore();

// const login = (username: string, password: string): Promise<boolean> => {
//   setIsLoading(true);

//   return axiosInstance.post("auth/jwt/create", { username, password })
//     .then(response => {
//       const { access, refresh } = response.data;

//       localStorage.setItem("accessToken", access);
//       localStorage.setItem("refreshToken", refresh);

//       setAccessToken(access);
//       setRefreshToken(refresh);

//       return fetchUser().then(() => {
//         setIsLoading(false);
//         return true;
//       });
//     })
//     .catch(error => {
//       setError("Login failed. Username or password are incorrect.");
//       setIsLoading(false);
//       return false;
//     });
// };

// return { login, isLoading, error };
// };

export default useLogin;
