export interface User {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  date_joined: string;
}

export interface UserPayload {
  username: string;
  password?: string;
  email: string;
  first_name?: string;
  last_name?: string;
}
