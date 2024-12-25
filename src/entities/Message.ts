import { User } from "./User";
import { Room } from "./Room";

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
