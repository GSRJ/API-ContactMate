import { hashSync } from "bcryptjs";
import { z } from "zod";

const userSchema = z.object({
  name: z.string().max(45).min(2),
  surname: z.string().max(45).min(2),
  email: z.string().email().max(45).min(3),
  password: z
    .string()
    .max(30)
    .transform((pass) => {
      return hashSync(pass, 10);
    }),
  admin: z.boolean().optional(),
});

const returnUserSchema = userSchema
  .extend({
    id: z.number(),
    createdAt: z.date(),
  })
  .omit({
    password: true,
  });

export { returnUserSchema, userSchema };
