import { QueryClient } from "@tanstack/react-query";
import { Message } from "../entities/Message";

export const addMessageToInfiniteCache = (
  queryClient: QueryClient,
  roomId: number,
  newMessage: Message
) => {
  queryClient.setQueriesData(["room", roomId], (oldData: any) => {
    if (!oldData) return oldData;

    const firstPage = oldData.pages[0];
    const updatedFirstPage = {
      ...firstPage,
      results: [newMessage, ...firstPage.results],
      count: firstPage.count + 1,
    };

    return {
      ...oldData,
      pages: [updatedFirstPage, ...oldData.pages.slice(1)],
    };
  });
};

export const removeMessageFromInfiniteCache = (
  queryClient: QueryClient,
  roomId: number,
  messageId?: number
) => {
  queryClient.setQueriesData(["room", roomId], (oldData: any) => {
    if (!oldData || !messageId) return oldData;

    const updatedPages = oldData.pages.map((page: any) => {
      const filtered = page.results.filter((m: Message) => m.id !== messageId);
      return {
        ...page,
        results: filtered,
        count: page.count - (filtered.length < page.results.length ? 1 : 0),
      };
    });

    return {
      ...oldData,
      pages: updatedPages,
    };
  });
};
