import APIClient, {
  axiosInstance,
  FetchResponse,
} from "../services/api-client";
import { useQuery } from "@tanstack/react-query";
import Message from "../entities/Message";


const useMessages = () =>
  useQuery<Message[]>({
    queryKey: ["messages"],
    queryFn: () =>
      axiosInstance
        .get(`codehub/messages`)
        .then((response) => response.data)
        .catch((err) => err),
  });

export default useMessages;
