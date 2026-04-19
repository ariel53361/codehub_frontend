import {
  CreateUserProfileFormValues,
  SetPasswordFormValues,
  UserProfileBaseFormValues,
} from "./UserProfileFormValues";

type InputType = "text" | "email" | "password" | "file";

interface FormField<TValues> {
  id: keyof TValues;
  label: string;
  type: InputType;
  accept?: string;
}

export const baseUserFormFields: FormField<UserProfileBaseFormValues>[] = [
  { id: "username", label: "Username", type: "text" },
  { id: "email", label: "Email", type: "email" },
  { id: "first_name", label: "First Name", type: "text" },
  { id: "last_name", label: "Last Name", type: "text" },
];

const avatarField: FormField<UserProfileBaseFormValues> = {
  id: "avatar",
  label: "Avatar",
  type: "file",
  accept: "image/*",
};

export const updateUserFormFields: FormField<UserProfileBaseFormValues>[] = [
  ...baseUserFormFields,
  avatarField,
];

const passwordField: FormField<CreateUserProfileFormValues> = {
  id: "password",
  label: "Password",
  type: "password",
};

export const registerFormFields: FormField<CreateUserProfileFormValues>[] = [
  ...baseUserFormFields,
  passwordField,
];

export const setPasswordFormField: FormField<SetPasswordFormValues>[] = [
  { id: "current_password", label: "Password", type: "password" },
  { id: "new_password", label: "New Password", type: "password" },
  { id: "re_new_password", label: "Confirm New Password", type: "password" },
];
