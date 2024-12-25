import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Room } from "../entities/Room";
import useRoomQueryStore from "../store/roomQueryStore";
import { ApiError, FetchResponse } from "../services/apiTypes";
import { RoomPayload } from "../entities/Room";
import APIClient from "../services/apiClient";
import { AxiosError } from "axios";

interface AddRoomContext {
  previousRooms: Room[];
}

const apiClient = new APIClient<RoomPayload>("/rooms");

const useCreateRoom = (postSuccessFuncs?: () => void) => {
  const roomQuery = useRoomQueryStore((s) => s.roomQuery);
  const queryClient = useQueryClient();

  return useMutation<
    FetchResponse<Room>,
    AxiosError<ApiError>,
    RoomPayload,
    AddRoomContext
  >({
    mutationFn: (newRoom: RoomPayload) => apiClient.post(newRoom),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rooms", roomQuery] });
      queryClient.invalidateQueries({ queryKey: ["topics"] });
      if (postSuccessFuncs) postSuccessFuncs();
    },
  });
};

export default useCreateRoom;
