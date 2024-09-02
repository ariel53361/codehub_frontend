export default interface PostUser {
  username: string;
  password: string;
  email: string;
  first_name?: string;
  last_name?: string;
  avatar?: File;
}
