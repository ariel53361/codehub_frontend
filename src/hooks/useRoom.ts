import { useQuery } from "@tanstack/react-query";
import ms from "ms";
import APIClient from "../services/api-client";
import Room from "../entities/Room";

const apiClient = new APIClient<Room>("/rooms");
const useRoom = (id: string) =>
  useQuery({
    queryKey: ["rooms", id],
    queryFn: () => apiClient.get(id),
  });

export default useRoom;
