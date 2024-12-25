import Topic from "./Topic";
import { User } from "./User";

export interface Room {
  id: number;
  topic: Topic;
  subject: string;
  host: User;
  participants: User[];
  participants_num: number;
  created: string;
}

export interface RoomPayload {
  topic: Topic;
  subject: string;
  // description: string;
}
