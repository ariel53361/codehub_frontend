import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/api-client";
import User from "../entities/User";

const apiClient = new APIClient<User>('/users');
const useUser = (userId: string) =>
  useQuery<User,Error>({
    queryKey: ["users", userId],
    queryFn: () => apiClient.get(userId),
  });
export default useUser;
