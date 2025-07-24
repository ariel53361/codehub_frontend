import { User } from "./User";
import { Room } from "./Room";
import { CHAT_MESSAGE, PING, PONG, WS_ERROR } from "../constants/webSocket";

export interface Message {
  id: number;
  user: User;
  room: Room;
  content: string;
  created: string;
}

export interface MessagePayload {
  content: string;
}

export interface WebSocketMessage {
  type: typeof CHAT_MESSAGE | typeof WS_ERROR | typeof PONG | typeof PING;
  message?: {
    content: string;
    created: string;
    user: User;
    room: Room;
  };
  error?: {
    message: string;
  };
}
