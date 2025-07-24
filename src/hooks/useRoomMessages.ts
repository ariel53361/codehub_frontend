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
// import ms from "ms";
// import APIClient from "../services/apiClient";
// import { ApiError, FetchResponse } from "../services/apiTypes";
// import { useQuery } from "@tanstack/react-query";
// import { Message } from "../entities/Message";
// import { AxiosError } from "axios";

// interface RoomMessagesQuery {
//   roomId: number;
//   page: number;
// }

// const useRoomMessages = (query: RoomMessagesQuery) => {
//   const apiClient = new APIClient<Message>(`/rooms/${query.roomId}/messages/`);
//   return useQuery<FetchResponse<Message>, AxiosError<ApiError>>({
//     queryKey: ["room", query],
//     queryFn: () =>
//       apiClient.getAll({ params: { page: query.page.toString() } }),
//     staleTime: Infinity,
//     keepPreviousData: true,
//     refetchOnWindowFocus: false,
//   });
// };

// export default useRoomMessages;