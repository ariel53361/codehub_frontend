import { useCallback, useMemo, useRef, useState } from "react";
import { ReadyState } from "react-use-websocket";
import { useQueryClient } from "@tanstack/react-query";
import { Message } from "../entities/Message";
import useAuthStore from "../store/authStore";
import { CHAT_MESSAGE, TOKEN_EXPIRED } from "../constants/webSocket";
import { WS_BASE_URL } from "../constants/api";
import AuthAPIClient from "../services/authApiClient";
import useWebSocketConnection from "./useWebSocketConnection";
import {
  addMessageToInfiniteCache,
  removeMessageFromInfiniteCache,
} from "../utils/cacheUtils";

const useSendMessage = (roomId: number) => {
  const queryClient = useQueryClient();

  const { accessToken, setAccessToken, clearAuthData } = useAuthStore();

  const pendingMessageRef = useRef<Message | null>(null);

  const [error, setError] = useState<string | null>(null);

  const refreshJwt = useCallback(() => {
    const authApiClient = new AuthAPIClient();
    return authApiClient
      .refresh()
      .then(({ access }) => {
        setAccessToken(access);
      })
      .catch(() => {
        clearAuthData();
      });
    // למה צריך את הרשימת תלויות הזאת? אולי למחוק אותה...
  }, [setAccessToken, clearAuthData]);

  const handleExpiredToken = () => {
    refreshJwt().catch(() => {
      removeMessageFromInfiniteCache(
        queryClient,
        roomId,
        pendingMessageRef.current?.id
      );
    });
  };

  const socketUrl = useMemo(
    () => buildWebSocketURL(roomId, accessToken),
    [roomId, accessToken]
  );

  const { sendJsonMessage, readyState } = useWebSocketConnection({
    socketUrl,
    shouldReconnect: () => true,
    onOpen: () => {
      setError(null);
      const message = pendingMessageRef.current;
      console.log(message);
      if (message) {
        sendJsonMessage({
          type: CHAT_MESSAGE,
          message: message,
        });
        pendingMessageRef.current = null;
      }
    },
    onError: () => {
      setError(
        "Unable to connect to the chat server. Check network connection."
      );
    },
    onClose: ({ code }: CloseEvent) => {
      switch (code) {
        case TOKEN_EXPIRED:
          handleExpiredToken();
          break;
        default:
          removeMessageFromInfiniteCache(
            queryClient,
            roomId,
            pendingMessageRef.current?.id
          );
          console.log("error code aaaaaaaaaaaa", code);
          setError("Unknown error.");
          break;
      }
    },
  });

  const sendMessage = (newMessage: Message) => {
    if (readyState === ReadyState.OPEN) {
      addMessageToInfiniteCache(queryClient, roomId, newMessage);
      sendJsonMessage({
        type: CHAT_MESSAGE,
        message: { ...newMessage },
      });
    } else pendingMessageRef.current = newMessage;
  };

  return { sendMessage, error };
};

const buildWebSocketURL = (roomId: number, accessToken: string | null) => {
  return `${WS_BASE_URL}rooms/${roomId}/?token=${accessToken}`;
};
export default useSendMessage;
