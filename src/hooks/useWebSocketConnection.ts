import useWebSocket, { ReadyState } from "react-use-websocket";
import { WebSocketMessage } from "../entities/Message";
import { useEffect, useRef } from "react";
import { PING, WS_ERROR } from "../constants/webSocket";

interface Props {
  socketUrl: string;
  shouldReconnect?: () => boolean;
  onMessage?: (event: MessageEvent) => void;
  onOpen?: () => void;
  onClose?: (code: CloseEvent) => void;
  onError?: () => void;
}

const useWebSocketConnection = ({
  socketUrl,
  shouldReconnect,
  onMessage,
  onOpen,
  onClose,
  onError,
}: Props) => {
  const lastActivityRef = useRef(Date.now());

  const { sendJsonMessage, lastJsonMessage, readyState } =
    useWebSocket<WebSocketMessage>(socketUrl, {
      shouldReconnect,
      onOpen,
      onClose,
      onError,
      onMessage: (event: MessageEvent) => {
        lastJsonMessage && (lastActivityRef.current = Date.now());

        try {
          const message: WebSocketMessage = JSON.parse(event.data);
          console.log(message.type);
          if (message?.type === WS_ERROR) {
            console.log(message);
          }

          onMessage?.(event);
        } catch (error) {
          console.error(
            "Failed to parse WebSocket message:",
            event.data,
            error,
          );
        }
      },
    });

  useEffect(() => {
    const interval = setInterval(() => {
      const timeSinceLastActivity = Date.now() - lastActivityRef.current;
      if (readyState === ReadyState.OPEN && timeSinceLastActivity > 15000) {
        sendJsonMessage({ type: PING });
        console.log("send ping");
        lastActivityRef.current = Date.now();
      }
    }, 20000);

    return () => clearInterval(interval);
  }, [readyState, sendJsonMessage]);

  return { sendJsonMessage, readyState };
};

export default useWebSocketConnection;
