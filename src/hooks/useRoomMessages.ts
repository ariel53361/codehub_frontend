import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../services/api-client";
import Message from "../entities/Message";

const useRoomMessages = (id: string) => {
  return useQuery<Message[], Error>({
    queryKey: ["rooms", id, "messages"],
    queryFn: () =>
      axiosInstance
        .get(`codehub/rooms/${id}/messages/`)
        .then((response) => response.data)
        .catch((err) => err),
    staleTime: 1000,
  });
};

export default useRoomMessages;
