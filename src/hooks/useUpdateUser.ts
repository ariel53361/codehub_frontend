import { useMutation, useQueryClient } from "@tanstack/react-query";
import APIClient from "../services/apiClient";
import { User } from "../entities/User";
import useAuthStore from "../store/authStore";
import { ApiError } from "../services/apiTypes";
import { AxiosError } from "axios";

const apiClient = new APIClient<FormData, User>("/users");

const useUpdateUser = (userId: string, postSuccessFuncs?: () => void) => {
  const queryClient = useQueryClient();
  const setUser = useAuthStore((s) => s.setUser);
  return useMutation<User, AxiosError<ApiError>, FormData>({
    mutationFn: (updatedUser) =>
      apiClient.patch(userId, updatedUser).then((res) => res),
    onSuccess: (savedUser) => {
      if (postSuccessFuncs) postSuccessFuncs();
      setUser(savedUser);
      queryClient.invalidateQueries({
        queryKey: ["users", userId],
      });
      queryClient.invalidateQueries({
        queryKey: ["rooms"],
      });
    },
  });
};

export default useUpdateUser;
