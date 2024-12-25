import ms from "ms";
import APIClient from "../services/apiClient";
import { ApiError, FetchResponse } from "../services/apiTypes";
import { useQuery } from "@tanstack/react-query";
import { Message } from "../entities/Message";
import { AxiosError } from "axios";

const apiClient = new APIClient<Message>("/messages");

const useMessages = () => {
  return useQuery<FetchResponse<Message>,AxiosError<ApiError>>({
    queryKey: ["messages"],
    queryFn: () => apiClient.getAll(),
    staleTime: ms("5s"),
  });
};

export default useMessages;
