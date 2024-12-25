import { useQuery } from "@tanstack/react-query";
import ms from "ms";
import APIClient from "../services/apiClient";
import { ApiError, FetchResponse } from "../services/apiTypes";
import Topic from "../entities/Topic";
import intialTopics from "../data/topics";
import { AxiosError } from "axios";

const apiClient = new APIClient<Topic>("/topics");

const useTopics = () =>
  useQuery<FetchResponse<Topic>, AxiosError<ApiError>>({
    queryKey: ["topics"],
    queryFn: apiClient.getAll,
    staleTime: ms("12h"),
    initialData: intialTopics,
  });
export default useTopics;
