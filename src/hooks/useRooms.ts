import ms from "ms";
import APIClient, { FetchResponse } from "../services/api-client";
import { useQuery } from "@tanstack/react-query";
import Room from "../entities/Room";
import useRoomQueryStore from "../store/roomQueryStore";

const apiClient = new APIClient<Room>("/rooms");

const useRooms = () => {
  const roomQuery = useRoomQueryStore((s) => s.roomQuery);
  return useQuery<FetchResponse<Room>, Error>({
    queryKey: ["rooms", roomQuery],
    queryFn: () =>
      apiClient.getAll({
        params: {
          topic: roomQuery.topic?.id,
          subject: roomQuery.searchText,
          ordering: roomQuery.sortOrder,
        },
      }),

    staleTime: ms("5m"),
  });
};

export default useRooms;
