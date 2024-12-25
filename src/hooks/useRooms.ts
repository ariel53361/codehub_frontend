import ms from "ms";
import APIClient from "../services/apiClient";
import { ApiError, FetchResponse } from "../services/apiTypes";
import { useQuery } from "@tanstack/react-query";
import { Room } from "../entities/Room";
import { RoomQuery } from "../store/roomQueryStore";
import { AxiosError } from "axios";

const apiClient = new APIClient<Room>("/rooms");

const useRooms = (roomQuery: RoomQuery) => {
  return useQuery<FetchResponse<Room>, AxiosError<ApiError>>({
    queryKey: ["rooms", roomQuery],
    queryFn: () =>
      apiClient.getAll({
        params: {
          topic: roomQuery?.topic?.id,
          subject: roomQuery.searchText,
          ordering: roomQuery.sortOrder,
          page: roomQuery.page,
        },
      }),

    staleTime: ms("5m"),
    keepPreviousData: true,
  });
};

export default useRooms;
