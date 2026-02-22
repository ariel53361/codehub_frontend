import { z } from "zod";

export const userBaseSchema = z.object({
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email format"),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  avatar: z
    .union([
      z.instanceof(FileList).transform((list) => list.item(0)),
      z.literal(null),
    ])
    .optional(),
});

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters");
export const createUserSchema = z.object({
  ...userBaseSchema.shape,
  password: passwordSchema,
});

export const updateUserSchema = z.object({
  ...userBaseSchema.shape,
  password: passwordSchema.optional(),
});

export const setPasswordSchema = z
  .object({
    current_password: passwordSchema,
    new_password: passwordSchema,
    re_new_password: passwordSchema,
  })
  .refine((data) => data.new_password === data.re_new_password, {
    path: ["re_new_password"],
    message: "Passwords do not match",
  });
