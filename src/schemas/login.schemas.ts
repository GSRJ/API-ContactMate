import { z } from "zod";

const createLoginSchema = z.object({
  email: z.string().email().min(5).max(45),
  password: z.string().max(30),
});

export { createLoginSchema };
