import { UpdateUserProfileFormValues } from "./UserProfileFormValues";

interface FormField {
  id: keyof UpdateUserProfileFormValues;
  label: string;
  type: string;
  accept?: string;
}

export const baseFormFields: FormField[] = [
  { id: "username", label: "Username", type: "text" },
  { id: "email", label: "Email", type: "email" },
  { id: "password", label: "Password ", type: "password" },
  { id: "first_name", label: "First Name", type: "text" },
  { id: "last_name", label: "Last Name", type: "text" },
  { id: "avatar", label: "Avatar", type: "file", accept: "image/*" },
];

export const UpdateUserFormFields: FormField[] = [
  ...baseFormFields.map((field) =>
    field.id === "password"
      ? { ...field, label: "Password (leave empty to keep current)" }
      : field
  ),
];

export const UserDetailsFormFields: FormField[] = [
  ...baseFormFields.filter(
    (field) => field.id !== "password" && field.id != "avatar"
  ),
];
