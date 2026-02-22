import { Room } from "./Room";
import {
  CHAT_MESSAGE,
  PING,
  PONG,
  WS_ERROR,
  ACK,
} from "../constants/webSocket";
import { Profile } from "./Profile";

export interface Message {
  id?: number;
  client_id: string;
  profile: Profile;
  room: Room;
  content: string;
  created: string;
}

interface AckPayload {
  client_id: string;
  server_id: number;
  created?: string;
}

export interface WebSocketMessage {
  type:
    | typeof CHAT_MESSAGE
    | typeof WS_ERROR
    | typeof PONG
    | typeof PING
    | typeof ACK;
  message?: Message ;
  error?: {
    message: string;
  };
}
