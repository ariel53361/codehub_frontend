import { AxiosError } from "axios";
import { Profile } from "../entities/Profile";
import APIClient from "../services/apiClient";
import { ApiError } from "../services/apiTypes";
import { useQuery } from "@tanstack/react-query";
import ms from "ms";

const apiClient = new APIClient<Profile>("/profiles");
const useUser = (profileId: string) =>
  useQuery<Profile, AxiosError<ApiError>>({
    queryKey: ["profiles", profileId],
    queryFn: () => apiClient.get(profileId),
    staleTime: ms("5m"),
  });
export default useUser;