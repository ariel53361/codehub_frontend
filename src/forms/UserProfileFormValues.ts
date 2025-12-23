export interface UpdateUserProfileFormValues {
  username: string;
  password?: string;
  email: string;
  first_name?: string;
  last_name?: string;
  avatar?: File | null;
  bio?: string;
}

export interface CreateUserProfileFormValues {
  username: string;
  password: string;
  email: string;
  first_name?: string;
  last_name?: string;
  avatar?: File | null;
  bio?: string;
}
