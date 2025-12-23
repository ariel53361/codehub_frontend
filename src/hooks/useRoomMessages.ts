import { useInfiniteQuery } from "@tanstack/react-query";
import APIClient from "../services/apiClient";
import { Message } from "../entities/Message";
import { AxiosError } from "axios";
import { ApiError, FetchResponse } from "../services/apiTypes";

const useRoomMessages = (roomId: number) => {
  const apiClient = new APIClient<Message>(`/rooms/${roomId}/messages/`);

  return useInfiniteQuery<FetchResponse<Message>, AxiosError<ApiError>>({
    queryKey: ["room", roomId],
    queryFn: ({ pageParam = 1 }) =>
      apiClient.getAll({ params: { page: pageParam } }),
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.next) {
        const nextPage = new URL(lastPage.next).searchParams.get("page");
        return nextPage ? parseInt(nextPage) : undefined;
      }
      return undefined;
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
};

export default useRoomMessages;
