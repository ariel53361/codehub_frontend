import { useMutation, useQueryClient } from "@tanstack/react-query";
import APIClient from "../services/apiClient";
import { Message } from "../entities/Message";
import { MessagePayload } from "../entities/Message";
import { AxiosError } from "axios";
import { ApiError } from "../services/apiTypes";

const useSendMessage = (roomId: string) => {
  const apiClient = new APIClient(`/rooms/${roomId}/messages`);
  const queryClient = useQueryClient();

  return useMutation<Message[], AxiosError<ApiError>, MessagePayload>({
    mutationFn: (newMessage: MessagePayload) => {
      return apiClient.post(newMessage)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["room"],
      });
    },
  });
};

export default useSendMessage;
