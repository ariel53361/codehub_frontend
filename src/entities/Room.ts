import Topic  from "./Topic";
import User from "./User";

export default interface Room {
  id: number;
  topic: Topic;
  subject: string;
  host: User;
  participants: User[];
  participants_num: number;
  created: string;
}
