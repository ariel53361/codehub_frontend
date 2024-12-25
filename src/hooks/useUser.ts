import { useQuery } from "@tanstack/react-query";
import ms from "ms";
import APIClient from "../services/apiClient";
import { User } from "../entities/User";
import { AxiosError } from "axios";
import { ApiError } from "../services/apiTypes";

const apiClient = new APIClient<User>("/users");
const useUser = (userId: string) =>
  useQuery<User, AxiosError<ApiError>>({
    queryKey: ["users", userId],
    queryFn: () => apiClient.get(userId),
    staleTime: ms("5m"),
  });
export default useUser;
