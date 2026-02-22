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

export const createUserSchema = z.object({
  ...userBaseSchema.shape,
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const updateUserSchema = z.object({
  ...userBaseSchema.shape,
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .optional(),
});
