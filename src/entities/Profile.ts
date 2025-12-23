import { User as User } from "./User";

export interface Profile {
  id: number;
  user: User;
  bio: string;
  avatar: string;
}

export interface ProfilePayload {
  bio?: string;
  avatar?: File | null;
}
