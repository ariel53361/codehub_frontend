import { QueryClient } from "@tanstack/react-query";
import { Message } from "../entities/Message";

export const patchMessageByClientIdInInfiniteCache = (
  queryClient: QueryClient,
  roomId: number,
  clientId: string,
  patch: Partial<Message>,
) => {
  queryClient.setQueryData(["room", roomId], (oldData: any) => {
    if (!oldData) return oldData;

    return {
      ...oldData,
      pages: oldData.pages.map((page: any) => ({
        ...page,
        results: page.results.map((m: Message) =>
          m.client_id === clientId ? { ...m, ...patch } : m,
        ),
      })),
    };
  });
};

export const upsertByClientIdInInfiniteCache = (
  queryClient: QueryClient,
  roomId: number,
  incoming: Message,
) => {
  queryClient.setQueryData(["room", roomId], (oldData: any) => {
    if (!oldData) return oldData;

    let found = false;

    const pages = oldData.pages.map((page: any) => {
      const results = page.results.map((m: Message) => {
        if (
          m.client_id &&
          incoming.client_id &&
          m.client_id === incoming.client_id
        ) {
          found = true;
          return { ...m, ...incoming };
        }
        return m;
      });

      return { ...page, results };
    });

    if (!found) {
      pages[0] = {
        ...pages[0],
        results: [incoming, ...pages[0].results],
      };
    }

    return { ...oldData, pages };
  });
};

export const addMessageToInfiniteCache = (
  queryClient: QueryClient,
  roomId: number,
  message: Message,
) => {
  queryClient.setQueryData(["room", roomId], (oldData: any) => {
    if (!oldData) return oldData;

    return {
      ...oldData,
      pages: oldData.pages.map((page: any, index: number) =>
        index === 0 ? { ...page, results: [message, ...page.results] } : page,
      ),
    };
  });
};
