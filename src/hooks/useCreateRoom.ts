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
    // onMutate: (newRoom: Room) => {
    //   console.log( queryClient.getQueryData<Room[]>(["rooms", roomQuery]))
    //   const previousRooms =
    //     queryClient.getQueryData<FetchResponse<Room>>(["rooms", roomQuery]) || [];
    //   queryClient.setQueryData<FetchResponse<Room>>(["rooms", roomQuery], (res) => res?.results[
    //     newRoom,
    //     ...(rooms || []),
    //   ]);
    //   return { previousRooms };
    // },
    onSuccess: (savedRoom, newRoom) => {
      // queryClient.setQueryData<Room[]>(["rooms", roomQuery], (rooms) =>
      //   rooms?.map((room) => (room === newRoom ? savedRoom : room))
      // );
      queryClient.invalidateQueries({ queryKey: ["rooms", roomQuery] });
      queryClient.invalidateQueries({ queryKey: ["topics"] }); // to re-render the topic room_num field
      if (postSuccessFuncs) postSuccessFuncs();
    },
    onError: (error, newRoom, context) => {
      // if (!context) return;
      // queryClient.setQueryData<Room[]>(
      //   ["rooms", roomQuery],
      //   context.previousRooms
      // );
      // console.log(newRoom);
    },
  });
};

export default useCreateRoom;
