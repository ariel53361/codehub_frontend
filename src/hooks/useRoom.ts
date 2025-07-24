import ms from "ms";
import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/apiClient";
import { Room } from "../entities/Room";
import { AxiosError } from "axios";
import { ApiError } from "../services/apiTypes";

const apiClient = new APIClient<Room>("/rooms");

const useRoom = (id: string) =>
  useQuery<Room, AxiosError<ApiError>>({
    queryKey: ["room", id],
    queryFn: () => apiClient.get(id),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

export default useRoom;
