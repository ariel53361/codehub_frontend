import { useQuery } from "@tanstack/react-query";
import APIClient, { FetchResponse } from "../services/api-client";
import ms from "ms";
import User from "../entities/User";

const apiClient = new APIClient<User>("/users");

const useUsers = () =>
  useQuery<FetchResponse<User>>({
    queryKey: ["users"],
    queryFn: apiClient.getAll,
  });
export default useUsers;
