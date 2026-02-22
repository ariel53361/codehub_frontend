import { useCallback, useMemo, useRef, useState } from "react";
import { ReadyState } from "react-use-websocket";
import { QueryClient, useQueryClient } from "@tanstack/react-query";

import { Message, WebSocketMessage } from "../entities/Message";
import useAuthStore from "../store/authStore";
import { ACK, CHAT_MESSAGE, TOKEN_EXPIRED } from "../constants/webSocket";
import { WS_BASE_URL } from "../constants/api";
import AuthAPIClient from "../services/authApiClient";
import useWebSocketConnection from "./useWebSocketConnection";
import {
  addMessageToInfiniteCache,
  patchMessageByClientIdInInfiniteCache,
  upsertByClientIdInInfiniteCache,
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
      .then(({ access }) => setAccessToken(access))
      .catch(() => clearAuthData());
  }, [setAccessToken, clearAuthData]);

  const socketUrl = useMemo(
    () => `${WS_BASE_URL}rooms/${roomId}/?token=${accessToken}`,
    [roomId, accessToken],
  );

  const { sendJsonMessage, readyState } = useWebSocketConnection({
    socketUrl,
    shouldReconnect: () => true,

    onOpen: () => {
      setError(null);

      if (pendingMessageRef.current) {
        sendJsonMessage({
          type: CHAT_MESSAGE,
          message: pendingMessageRef.current,
        });
      }
    },

    onMessage: (event) => {
      const data = JSON.parse(event.data);
      if (data.type === ACK) {
        const { client_id, server_id } = data.message!;

        patchMessageByClientIdInInfiniteCache(queryClient, roomId, client_id, {
          id: server_id,
        });

        if (pendingMessageRef.current?.client_id === client_id) {
          pendingMessageRef.current = null;
        }
        return;
      }

      if (data.type === CHAT_MESSAGE) {
        upsertByClientIdInInfiniteCache(queryClient, roomId, {
          ...data.message,
        });
      }
    },

    onClose: ({ code }) => {
      if (code === TOKEN_EXPIRED) {
        refreshJwt();
      } else {
        setError("WebSocket connection error");
      }
    },
  });

  //  אולי זה בעיה ששולח טיפוס Message - לבדוק את זה
  const sendMessage = (message: Message) => {
    pendingMessageRef.current = message;

    addMessageToInfiniteCache(queryClient, roomId, message);

    if (readyState === ReadyState.OPEN) {
      sendJsonMessage({
        type: CHAT_MESSAGE,
        message,
      });
    }
  };

  return { sendMessage, error };
};

export default useSendMessage;
