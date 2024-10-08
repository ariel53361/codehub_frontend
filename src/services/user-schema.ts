import { z } from "zod";

const schema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must have at least 3 characters" }),
  password: z
    .string()
    .min(5, { message: "Password must have at least 5 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  first_name: z.string(),
  last_name: z.string(),
  avatar: z.any().optional().nullable(),
});

export type FormData = z.infer<typeof schema>;

export default schema;
