import { useQuery } from "@tanstack/react-query";
import APIClient, { FetchResponse } from "../services/api-client";
import ms from "ms";
import Topic from "../entities/Topic";

const apiClient = new APIClient<Topic>("/topics");

const useTopics = () =>
  useQuery<FetchResponse<Topic>>({
    queryKey: ["topics"],
    queryFn: apiClient.getAll,
    staleTime: ms("1d"),
  });
export default useTopics;
