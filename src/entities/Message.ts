import User from "./User";
import Room from "./Room";

export default interface Message {
  id: number;
  user: User;
  room: Room;
  content: string;
  created: string;
}
