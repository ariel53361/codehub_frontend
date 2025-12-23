import Topic from "./Topic";
import { Profile } from "./Profile";

export interface Room {
  id: number;
  topic: Topic;
  subject: string;
  host: Profile;
  participants: Profile[];
  participants_num: number;
  created: string;
}

export interface RoomPayload {
  topic: number;
  subject: string;
  // description: string;
}
