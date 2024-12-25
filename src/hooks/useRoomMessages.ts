import ms from "ms";
import APIClient from "../services/apiClient";
import { ApiError, FetchResponse } from "../services/apiTypes";
import { useQuery } from "@tanstack/react-query";
import { Message } from "../entities/Message";
import { AxiosError } from "axios";

interface RoomMessagesQuery {
  roomId: number;
  page: number;
}

const useRoomMessages = (query: RoomMessagesQuery) => {
  const apiClient = new APIClient<Message>(`/rooms/${query.roomId}/messages/`);
  return useQuery<FetchResponse<Message>, AxiosError<ApiError>>({
    queryKey: ["room", query],
    queryFn: () =>
      apiClient.getAll({ params: { page: query.page.toString() } }),
    staleTime: ms("1s"),
    keepPreviousData: true,
  });
};

export default useRoomMessages;
