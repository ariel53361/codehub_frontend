import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../services/api-client";
import { useParams } from "react-router-dom";
import Message from "../entities/Message";
import PostMessage from "../entities/PostMessage";

interface AddMessageContext {
  previousMessages: Message[];
}

const useSentMessage = () => {
  const queryClient = useQueryClient();
  const { roomId } = useParams();
  return useMutation<Message[], Error, PostMessage, AddMessageContext>({
    mutationFn: (newMessage: PostMessage) =>
      axiosInstance
        .post(`codehub/rooms/${roomId}/messages/`, newMessage)
        .then((res) => res.data),
    // onMutate: (newMessage: PostMessage) => {
    //   console.log("messages query:",
    //     queryClient.getQueryData<Message[]>(["rooms", roomId, "messages"])
    //   );
    //   const previousMessages =
    //     queryClient.getQueryData<Message[]>(["rooms", roomId, "messages"]) ||
    //     [];
    //   queryClient.setQueryData<Message[]>(
    //     ["rooms", roomId, "messages"],
    //     (messages) => [newMessage, ...(messages || [])]
    //   );
    //   return { previousMessages };
    // },
    onSuccess: (savedMessage, newMessage) => {
      // queryClient.setQueryData<Room[]>(["rooms", roomQuery], (rooms) =>
      //   rooms?.map((room) => (room === newRoom ? savedRoom : room))
      // );
      queryClient.invalidateQueries({
        queryKey: ["rooms", roomId, "messages"],
      });
    },
    onError: (error, newMessage, context) => {
      // if (!context) return;
      // queryClient.setQueryData<Message[]>(
      //   ["rooms", roomId, "messages"],
      //   context.previousMessages
      // );
    },
  });
};

export default useSentMessage;

// import { useState } from "react";
// import { axiosInstance } from "../services/api-client";
// import { useParams } from "react-router-dom";
// import Message from "../entities/Message";
// import axios from "axios";

// const useSentMessage = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const { roomId } = useParams();

//   const sentMessage = async (content?: string): Promise<Message | null> => {
//     setIsLoading(true);
//     try {
//       const response = await axiosInstance.post(
//         `codehub/rooms/${roomId}/messages/`,
//         { content }
//       );
//       setIsLoading(false);
//       return response.data as Message; // Cast the response data to Message type
//     } catch (error) {
//       setIsLoading(false);
//       if (axios.isAxiosError(error)) {
//         // Handle Axios error
//         setError(error.message); // or handle specific properties as needed
//       } else {
//         // Handle other types of errors
//         setError("An unexpected error occurred.");
//       }
//       return null;
//     }
//   };

//   return { sentMessage, error, isLoading };
// };

// export default useSentMessage;
