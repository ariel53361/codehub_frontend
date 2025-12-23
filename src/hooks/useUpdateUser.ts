import { useMutation } from "@tanstack/react-query";
import UserAPIclient from "../services/userApiClient";
import useAuthStore from "../store/authStore";
import { ApiError } from "../services/apiTypes";
import { AxiosError } from "axios";
import { User, UserPayload } from "../entities/User";

const userApiClient = new UserAPIclient();

const useUpdateUser = (postSuccessFuncs?: () => void) => {
  return useMutation<User, AxiosError<ApiError>, UserPayload>({
    mutationFn: (data) => {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined) {
          formData.append(key, value);
        }
      });

      return userApiClient.updateCurrentUser(formData);
    },
    // onSuccess: (savedUser) => {
    //   if (postSuccessFuncs) postSuccessFuncs();
    //   setUser({user:savedUser});
    //   queryClient.invalidateQueries({
    //     queryKey: ["profiles", profileId],
    //   });
    //   queryClient.invalidateQueries({
    //     queryKey: ["rooms"],
    //   });
    // },
  });
};

export default useUpdateUser;
