import { useMutation, useQueryClient } from "@tanstack/react-query";
import Room from "../entities/Room";
import useRoomQueryStore from "../store/roomQueryStore";
import { axiosInstance, FetchResponse } from "../services/api-client";
import { useNavigate } from "react-router-dom";
import PostRoom from "../entities/PostRoom";

interface AddRoomContext {
  previousRooms: Room[];
}
const useCreateRoom = (postSuccessFuncs?: () => void) => {
  const roomQuery = useRoomQueryStore((s) => s.roomQuery);
  const queryClient = useQueryClient();
  return useMutation<FetchResponse<Room>, Error, PostRoom, AddRoomContext>({
    mutationFn: (newRoom: PostRoom) =>
      axiosInstance.post("codehub/rooms/", newRoom).then((res) => res.data),
    onSuccess: (savedRoom, newRoom) => {
      queryClient.invalidateQueries({ queryKey: ["rooms", roomQuery] });
      queryClient.invalidateQueries({ queryKey: ["topics"] }); // to re-render the topic room_num field
      if (postSuccessFuncs) postSuccessFuncs();
    },
    onError: (error, newRoom, context) => {
 
    },
  });
};

export default useCreateRoom;
