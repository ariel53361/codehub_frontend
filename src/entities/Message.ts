import { User } from "./User";
import { Room } from "./Room";
import { CHAT_MESSAGE, PING, PONG, WS_ERROR } from "../constants/webSocket";
import { Profile } from "./Profile";

export interface Message {
  id: number;
  profile: Profile;
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
    profile: Profile;
    room: Room;
  };
  error?: {
    message: string;
  };
}
