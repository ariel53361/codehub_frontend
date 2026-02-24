import { z } from "zod";
import {
  createUserSchema,
  setPasswordSchema,
  userProfileBaseSchema,
} from "../schemas/userSchema";

export type UserProfileBaseFormValues = z.infer<typeof userProfileBaseSchema>;

export type CreateUserProfileFormValues = z.infer<typeof createUserSchema>;

export type SetPasswordFormValues = z.infer<typeof setPasswordSchema>;
