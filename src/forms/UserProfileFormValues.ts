export interface UserProfileBaseFormValues {
  username: string;
  email: string;
  first_name?: string;
  last_name?: string;
  avatar?: File | null;
  bio?: string;
}

export interface CreateUserProfileFormValues extends UserProfileBaseFormValues {
  password: string;
}

export interface SetPasswordFormValues {
  current_password: string;
  new_password: string;
  re_new_password: string;
}
